'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on homepage
  if (pathname === '/') return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    // Map of routes to human-readable labels
    const routeLabels: { [key: string]: string } = {
      'temi': 'Temi e Template',
      'dashboard': 'Dashboard',
      'privacy': 'Privacy Policy',
      'terms': 'Termini di Servizio',
      'diritti-privacy': 'Diritti Privacy',
      'checkout': 'Checkout',
      'success': 'Pagamento Completato',
      'cancel': 'Pagamento Annullato',
      'admin': 'Amministrazione',
      'payments': 'Pagamenti',
      'a-tutto-meta': 'A tutto Meta',
      'a-tutto-meta-20': 'A tutto Meta 2.0',
      'linkedin': 'LinkedIn',
      'tiktok': 'TikTok',
      'pack-professionale': 'Pack Professionale',
      'sito-landing': 'Sito Landing Page',
      'sito-standard': 'Sito Standard',
      'sito-large': 'Sito Large',
      'e-shop-basic': 'E-shop Basic',
      'e-shop-ultra': 'E-shop Ultra',
      'sito-ricettive': 'Sito Strutture Ricettive',
      'grafica': 'Grafica'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.label,
      "item": `https://hypeg.it${breadcrumb.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <motion.nav
        className="bg-[var(--bg-secondary)] py-4 border-b border-[var(--border-primary)]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-6">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <motion.li
                key={breadcrumb.href}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-[var(--text-secondary)] mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {breadcrumb.current ? (
                  <span 
                    className="text-[var(--text-primary)] font-medium"
                    aria-current="page"
                  >
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.nav>
    </>
  );
}