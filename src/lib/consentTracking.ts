// Consent Tracking System for GDPR Compliance
// This system manages user consent preferences and tracks consent history

export interface ConsentRecord {
  id: string;
  userId?: string; // Optional user ID if logged in
  sessionId: string; // Browser session identifier
  timestamp: string; // ISO 8601 timestamp
  consentVersion: string; // Version of consent policy
  preferences: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  ipAddress?: string; // For legal compliance (anonymized)
  userAgent?: string; // Browser information
  consentMethod: 'banner' | 'settings' | 'default';
  withdrawnAt?: string; // If consent was withdrawn
}

export interface ConsentHistory {
  userId?: string;
  sessionId: string;
  records: ConsentRecord[];
  lastUpdated: string;
}

class ConsentTracker {
  private readonly CONSENT_VERSION = '1.0';
  private readonly STORAGE_KEY = 'consent-history';
  private readonly SESSION_KEY = 'session-id';

  // Generate unique session ID
  private generateSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get or create session ID
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server-side';
    
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  // Anonymize IP address for GDPR compliance
  private anonymizeIP(ip: string): string {
    const parts = ip.split('.');
    if (parts.length === 4) {
      // IPv4: mask last octet
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
    // IPv6: mask last 64 bits
    const v6parts = ip.split(':');
    return v6parts.slice(0, 4).join(':') + '::';
  }

  // Record consent decision
  async recordConsent(
    preferences: ConsentRecord['preferences'],
    method: ConsentRecord['consentMethod'] = 'banner',
    userId?: string
  ): Promise<void> {
    try {
      const sessionId = this.getSessionId();
      const timestamp = new Date().toISOString();
      
      const consentRecord: ConsentRecord = {
        id: 'consent_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId,
        sessionId,
        timestamp,
        consentVersion: this.CONSENT_VERSION,
        preferences,
        consentMethod: method,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      };

      // Store locally
      this.storeConsentLocally(consentRecord);

      // Store in Firebase (if available)
      await this.storeConsentInDatabase(consentRecord);

      // Update analytics consent based on preferences
      this.updateAnalyticsConsent(preferences);

      console.log('Consent recorded successfully:', consentRecord.id);
    } catch (error) {
      console.error('Error recording consent:', error);
      // Still store locally even if remote storage fails
      this.storeConsentLocally({
        id: 'consent_' + Date.now(),
        sessionId: this.getSessionId(),
        timestamp: new Date().toISOString(),
        consentVersion: this.CONSENT_VERSION,
        preferences,
        consentMethod: method,
        userId,
      });
    }
  }

  // Store consent in localStorage for immediate access
  private storeConsentLocally(record: ConsentRecord): void {
    if (typeof window === 'undefined') return;

    try {
      const existingHistory = this.getConsentHistory();
      existingHistory.records.push(record);
      existingHistory.lastUpdated = record.timestamp;

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingHistory));
      
      // Also store latest preferences for quick access
      localStorage.setItem('latest-consent', JSON.stringify({
        preferences: record.preferences,
        timestamp: record.timestamp,
        version: record.consentVersion
      }));
    } catch (error) {
      console.error('Error storing consent locally:', error);
    }
  }

  // Store consent in Firebase for compliance and analytics
  private async storeConsentInDatabase(record: ConsentRecord): Promise<void> {
    // Only store if Firebase is available
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import to avoid SSR issues
      const { collection, addDoc } = await import('firebase/firestore');
      const { default: db } = await import('./firebase');

      await addDoc(collection(db, 'consent_records'), {
        ...record,
        // Remove sensitive data for compliance
        userAgent: record.userAgent ? this.hashString(record.userAgent) : undefined,
        ipAddress: undefined, // Not storing IP in database
      });
    } catch (error) {
      // Silently fail if Firebase is not configured
      console.warn('Could not store consent in database:', error instanceof Error ? error.message : String(error));
    }
  }

  // Get consent history for user/session
  getConsentHistory(): ConsentHistory {
    if (typeof window === 'undefined') {
      return {
        sessionId: 'server-side',
        records: [],
        lastUpdated: new Date().toISOString()
      };
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading consent history:', error);
    }

    // Return default history
    return {
      sessionId: this.getSessionId(),
      records: [],
      lastUpdated: new Date().toISOString()
    };
  }

  // Get latest consent preferences
  getLatestConsent(): ConsentRecord['preferences'] | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem('latest-consent');
      if (stored) {
        const data = JSON.parse(stored);
        // Check if consent is still valid (not older than 13 months)
        const consentDate = new Date(data.timestamp);
        const thirteenMonthsAgo = new Date();
        thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);
        
        if (consentDate > thirteenMonthsAgo) {
          return data.preferences;
        }
      }
    } catch (error) {
      console.error('Error reading latest consent:', error);
    }

    return null;
  }

  // Check if consent needs renewal (GDPR requires renewal every 13 months max)
  needsConsentRenewal(): boolean {
    const latest = this.getLatestConsent();
    if (!latest) return true;

    try {
      const stored = localStorage.getItem('latest-consent');
      if (stored) {
        const data = JSON.parse(stored);
        const consentDate = new Date(data.timestamp);
        const thirteenMonthsAgo = new Date();
        thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);
        
        return consentDate <= thirteenMonthsAgo;
      }
    } catch (error) {
      console.error('Error checking consent renewal:', error);
    }

    return true;
  }

  // Withdraw consent
  async withdrawConsent(userId?: string): Promise<void> {
    try {
      const withdrawRecord: ConsentRecord = {
        id: 'withdraw_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId,
        sessionId: this.getSessionId(),
        timestamp: new Date().toISOString(),
        consentVersion: this.CONSENT_VERSION,
        preferences: {
          necessary: true, // Always true
          functional: false,
          analytics: false,
          marketing: false,
        },
        consentMethod: 'settings',
        withdrawnAt: new Date().toISOString(),
      };

      await this.recordConsent(withdrawRecord.preferences, 'settings', userId);
      
      // Clear third-party cookies and tracking
      this.clearTrackingCookies();
      
      console.log('Consent withdrawn successfully');
    } catch (error) {
      console.error('Error withdrawing consent:', error);
    }
  }

  // Update analytics consent based on user preferences
  private updateAnalyticsConsent(preferences: ConsentRecord['preferences']): void {
    if (typeof window === 'undefined') return;

    // Google Analytics consent
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': preferences.analytics ? 'granted' : 'denied',
        'ad_storage': preferences.marketing ? 'granted' : 'denied',
        'functionality_storage': preferences.functional ? 'granted' : 'denied',
      });
    }

    // Facebook Pixel consent
    if ((window as any).fbq) {
      if (preferences.marketing) {
        (window as any).fbq('consent', 'grant');
      } else {
        (window as any).fbq('consent', 'revoke');
      }
    }
  }

  // Clear tracking cookies when consent is withdrawn
  private clearTrackingCookies(): void {
    if (typeof document === 'undefined') return;

    // List of common tracking cookies to clear
    const trackingCookies = [
      '_ga', '_gid', '_gat', '_gtag', '_gat_gtag',
      '_fbp', '_fbc', 'fr',
      '__utma', '__utmb', '__utmc', '__utmz',
      '_hjid', '_hjAbsoluteSessionInProgress'
    ];

    trackingCookies.forEach(cookieName => {
      // Clear for current domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      // Clear for parent domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
    });
  }

  // Hash string for privacy (simple hash, not cryptographically secure)
  private hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  // Export consent data for user (GDPR right to data portability)
  exportConsentData(): string {
    const history = this.getConsentHistory();
    const exportData = {
      version: this.CONSENT_VERSION,
      exportDate: new Date().toISOString(),
      consentHistory: history.records.map(record => ({
        id: record.id,
        timestamp: record.timestamp,
        preferences: record.preferences,
        method: record.consentMethod,
        version: record.consentVersion,
        withdrawnAt: record.withdrawnAt
      }))
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  // Delete consent data (GDPR right to erasure)
  async deleteConsentData(userId?: string): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Clear local storage
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem('latest-consent');
      sessionStorage.removeItem(this.SESSION_KEY);

      // Clear tracking cookies
      this.clearTrackingCookies();

      // Delete from Firebase if available
      if (userId) {
        try {
          const { collection, query, where, getDocs, deleteDoc } = await import('firebase/firestore');
          const { default: db } = await import('./firebase');

          const q = query(collection(db, 'consent_records'), where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          
          const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
        } catch (error) {
          console.warn('Could not delete consent data from database:', error instanceof Error ? error.message : String(error));
        }
      }

      console.log('Consent data deleted successfully');
    } catch (error) {
      console.error('Error deleting consent data:', error);
    }
  }

  // Generate compliance report for audit purposes
  generateComplianceReport(): object {
    const history = this.getConsentHistory();
    const latest = this.getLatestConsent();
    
    return {
      reportDate: new Date().toISOString(),
      sessionId: history.sessionId,
      totalConsentRecords: history.records.length,
      latestConsent: latest,
      needsRenewal: this.needsConsentRenewal(),
      consentVersion: this.CONSENT_VERSION,
      complianceStatus: {
        hasValidConsent: !!latest,
        consentIsRecent: !this.needsConsentRenewal(),
        hasConsentHistory: history.records.length > 0,
        lastConsentDate: history.lastUpdated
      }
    };
  }
}

// Export singleton instance
export const consentTracker = new ConsentTracker();