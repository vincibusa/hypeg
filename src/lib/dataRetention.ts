// Data Retention Policies for GDPR Compliance
// This module defines and implements data retention rules

export interface RetentionPolicy {
  collection: string;
  retentionPeriod: number; // in months
  criteria: 'created_at' | 'last_accessed' | 'updated_at';
  description: string;
  legal_basis: string;
}

export interface DataCleanupResult {
  collection: string;
  documentsChecked: number;
  documentsDeleted: number;
  errors: string[];
  executedAt: string;
}

// Define retention policies for different data types
export const RETENTION_POLICIES: RetentionPolicy[] = [
  {
    collection: 'consent_records',
    retentionPeriod: 60, // 5 years for legal compliance
    criteria: 'created_at',
    description: 'GDPR consent records for legal compliance',
    legal_basis: 'Legal obligation (GDPR Art. 7.1)'
  },
  {
    collection: 'contact_submissions',
    retentionPeriod: 24, // 2 years for business communications
    criteria: 'created_at',
    description: 'Contact form submissions and customer inquiries',
    legal_basis: 'Legitimate interest (customer support)'
  },
  {
    collection: 'subscription_payments',
    retentionPeriod: 120, // 10 years for fiscal/accounting obligations
    criteria: 'created_at',
    description: 'Payment records for tax and accounting compliance',
    legal_basis: 'Legal obligation (Italian fiscal law)'
  },
  {
    collection: 'customers',
    retentionPeriod: 36, // 3 years after last interaction
    criteria: 'last_accessed',
    description: 'Customer data and business relationships',
    legal_basis: 'Contract performance and legitimate interest'
  },
  {
    collection: 'analytics_events',
    retentionPeriod: 26, // 26 months for Google Analytics alignment
    criteria: 'created_at',
    description: 'Website analytics and user behavior data',
    legal_basis: 'Legitimate interest (business analytics)'
  },
  {
    collection: 'marketing_campaigns',
    retentionPeriod: 12, // 1 year for marketing analysis
    criteria: 'created_at',
    description: 'Marketing campaign data and performance metrics',
    legal_basis: 'Legitimate interest (marketing optimization)'
  },
  {
    collection: 'user_sessions',
    retentionPeriod: 2, // 2 months for technical debugging
    criteria: 'created_at',
    description: 'User session data for technical support',
    legal_basis: 'Legitimate interest (technical support)'
  },
  {
    collection: 'error_logs',
    retentionPeriod: 6, // 6 months for technical analysis
    criteria: 'created_at',
    description: 'Application error logs and technical diagnostics',
    legal_basis: 'Legitimate interest (system maintenance)'
  }
];

class DataRetentionManager {
  private readonly CLEANUP_LOG_COLLECTION = 'data_cleanup_logs';

  // Calculate cutoff date for retention policy
  private calculateCutoffDate(policy: RetentionPolicy): Date {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - policy.retentionPeriod);
    return cutoff;
  }

  // Execute cleanup for a specific collection
  async cleanupCollection(policy: RetentionPolicy): Promise<DataCleanupResult> {
    const result: DataCleanupResult = {
      collection: policy.collection,
      documentsChecked: 0,
      documentsDeleted: 0,
      errors: [],
      executedAt: new Date().toISOString()
    };

    try {
      // Dynamic import to avoid SSR issues
      const { collection, query, where, getDocs, deleteDoc, Timestamp } = await import('firebase/firestore');
      const { default: db } = await import('./firebase');

      const cutoffDate = this.calculateCutoffDate(policy);
      const cutoffTimestamp = Timestamp.fromDate(cutoffDate);

      // Query documents older than cutoff date
      const q = query(
        collection(db, policy.collection),
        where(policy.criteria, '<', cutoffTimestamp)
      );

      const querySnapshot = await getDocs(q);
      result.documentsChecked = querySnapshot.size;

      // Delete documents in batches to avoid overwhelming Firebase
      const deletePromises: Promise<void>[] = [];
      const batchSize = 50; // Firebase recommended batch size
      let processed = 0;

      querySnapshot.docs.forEach((doc) => {
        if (processed < batchSize) {
          deletePromises.push(deleteDoc(doc.ref));
          processed++;
        }
      });

      // Execute deletions
      const deleteResults = await Promise.allSettled(deletePromises);
      
      deleteResults.forEach((promiseResult, index) => {
        if (promiseResult.status === 'fulfilled') {
          result.documentsDeleted++;
        } else {
          result.errors.push(`Failed to delete document ${index}: ${promiseResult.reason}`);
        }
      });

      console.log(`Data retention cleanup completed for ${policy.collection}:`, result);
      
      // Log cleanup activity
      await this.logCleanupActivity(result, policy);

    } catch (error) {
      result.errors.push(`Collection cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
      console.error(`Error cleaning up ${policy.collection}:`, error);
    }

    return result;
  }

  // Execute all retention policies
  async executeAllPolicies(): Promise<DataCleanupResult[]> {
    console.log('Starting data retention cleanup process...');
    
    const results: DataCleanupResult[] = [];
    
    for (const policy of RETENTION_POLICIES) {
      try {
        const result = await this.cleanupCollection(policy);
        results.push(result);
        
        // Add delay between collections to avoid rate limiting
        await this.delay(1000);
      } catch (error) {
        console.error(`Failed to process policy for ${policy.collection}:`, error);
        results.push({
          collection: policy.collection,
          documentsChecked: 0,
          documentsDeleted: 0,
          errors: [`Policy execution failed: ${error instanceof Error ? error.message : String(error)}`],
          executedAt: new Date().toISOString()
        });
      }
    }

    console.log('Data retention cleanup process completed:', results);
    return results;
  }

  // Log cleanup activity for audit purposes
  private async logCleanupActivity(result: DataCleanupResult, policy: RetentionPolicy): Promise<void> {
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { default: db } = await import('./firebase');

      await addDoc(collection(db, this.CLEANUP_LOG_COLLECTION), {
        ...result,
        policy: {
          collection: policy.collection,
          retentionPeriod: policy.retentionPeriod,
          criteria: policy.criteria,
          legal_basis: policy.legal_basis
        },
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Failed to log cleanup activity:', error);
    }
  }

  // Get retention policy for specific collection
  getPolicyForCollection(collectionName: string): RetentionPolicy | undefined {
    return RETENTION_POLICIES.find(policy => policy.collection === collectionName);
  }

  // Check if data should be retained based on policy
  shouldRetainData(collectionName: string, documentDate: Date): boolean {
    const policy = this.getPolicyForCollection(collectionName);
    if (!policy) {
      // If no policy defined, retain by default (safer approach)
      return true;
    }

    const cutoffDate = this.calculateCutoffDate(policy);
    return documentDate >= cutoffDate;
  }

  // Get retention report for compliance audits
  async getRetentionReport(): Promise<object> {
    const report = {
      reportDate: new Date().toISOString(),
      policies: RETENTION_POLICIES.map(policy => ({
        collection: policy.collection,
        retentionPeriod: policy.retentionPeriod,
        cutoffDate: this.calculateCutoffDate(policy).toISOString(),
        description: policy.description,
        legalBasis: policy.legal_basis
      })),
      lastCleanupResults: await this.getLastCleanupResults()
    };

    return report;
  }

  // Get last cleanup results for audit
  private async getLastCleanupResults(): Promise<DataCleanupResult[]> {
    try {
      const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore');
      const { default: db } = await import('./firebase');

      const q = query(
        collection(db, this.CLEANUP_LOG_COLLECTION),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as DataCleanupResult);
    } catch (error) {
      console.error('Error fetching cleanup results:', error);
      return [];
    }
  }

  // Schedule automatic cleanup (to be called by cron job or scheduler)
  async scheduleCleanup(): Promise<void> {
    const now = new Date();
    const lastCleanup = this.getLastCleanupDate();
    
    // Run cleanup once per week
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    if (!lastCleanup || (now.getTime() - lastCleanup.getTime()) > oneWeek) {
      console.log('Running scheduled data retention cleanup...');
      await this.executeAllPolicies();
      this.setLastCleanupDate(now);
    } else {
      console.log('Skipping cleanup - ran recently');
    }
  }

  // Utility: delay function
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get last cleanup date from localStorage
  private getLastCleanupDate(): Date | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem('last-data-cleanup');
      return stored ? new Date(stored) : null;
    } catch {
      return null;
    }
  }

  // Set last cleanup date in localStorage
  private setLastCleanupDate(date: Date): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('last-data-cleanup', date.toISOString());
    } catch (error) {
      console.error('Failed to store cleanup date:', error);
    }
  }

  // Delete specific user data (GDPR right to erasure)
  async deleteUserData(userId: string): Promise<{success: boolean, deletedCollections: string[], errors: string[]}> {
    const result = {
      success: true,
      deletedCollections: [] as string[],
      errors: [] as string[]
    };

    // Collections that may contain user data
    const userDataCollections = [
      'customers',
      'consent_records',
      'contact_submissions',
      'user_sessions',
      'analytics_events'
    ];

    try {
      const { collection, query, where, getDocs, deleteDoc } = await import('firebase/firestore');
      const { default: db } = await import('./firebase');

      for (const collectionName of userDataCollections) {
        try {
          // Query documents for this user
          const q = query(
            collection(db, collectionName),
            where('userId', '==', userId)
          );

          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Delete user documents
            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            
            result.deletedCollections.push(`${collectionName} (${querySnapshot.size} documents)`);
            console.log(`Deleted ${querySnapshot.size} documents from ${collectionName} for user ${userId}`);
          }
        } catch (error) {
          result.errors.push(`Failed to delete from ${collectionName}: ${error instanceof Error ? error.message : String(error)}`);
          result.success = false;
        }
      }

      // Log deletion activity
      try {
        const { addDoc } = await import('firebase/firestore');
        const { default: db } = await import('./firebase');

        await addDoc(collection(db, 'user_data_deletions'), {
          userId,
          deletedCollections: result.deletedCollections,
          errors: result.errors,
          timestamp: new Date(),
          requestedBy: 'gdpr_request'
        });
      } catch (error) {
        console.error('Failed to log user data deletion:', error);
      }

    } catch (error) {
      result.errors.push(`User data deletion failed: ${error instanceof Error ? error.message : String(error)}`);
      result.success = false;
    }

    return result;
  }
}

// Export singleton instance
export const dataRetentionManager = new DataRetentionManager();