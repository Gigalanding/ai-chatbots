import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { marketing } from "./config/marketing";

// Load Inter font for better readability and performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Default metadata (can be overridden by individual pages)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  title: {
    default: `${marketing.brandName} - ${marketing.brandTagline}`,
    template: `%s | ${marketing.brandName}`,
  },
  description: `${marketing.brandTagline} We help ${marketing.targetAudience} streamline their workflows with practical solutions.`,
  generator: 'Next.js',
  applicationName: marketing.brandName,
  referrer: 'origin-when-cross-origin',
  keywords: ['education', 'workflow', 'automation', 'productivity', 'teaching', 'edtech'],
  authors: [{ name: marketing.legal.companyName }],
  creator: marketing.legal.companyName,
  publisher: marketing.legal.companyName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json', // Add web app manifest later
  other: {
    'theme-color': marketing.colors.primary,
  },
};

/**
 * Root layout component with analytics, fonts, and global providers
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://app.cal.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://plausible.io" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content={marketing.colors.primary} />
        <meta name="msapplication-TileColor" content={marketing.colors.primary} />
        
        {/* Viewport configuration for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans bg-white text-gray-900 antialiased">
        {/* Main content */}
        {children}

        {/* Plausible Analytics - privacy-focused alternative to Google Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}

        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
                  "name": marketing.legal.companyName,
                  "url": process.env.NEXT_PUBLIC_SITE_URL,
                  "description": marketing.brandTagline,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": marketing.legal.email,
                    "contactType": "customer service"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": marketing.legal.address
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
                  "url": process.env.NEXT_PUBLIC_SITE_URL,
                  "name": marketing.brandName,
                  "description": marketing.brandTagline,
                  "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "FAQPage",
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#faq`,
                  "mainEntity": marketing.faq.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.a
                    }
                  }))
                }
              ]
            })
          }}
        />

        {/* Performance monitoring (uncomment if needed) */}
        {/* {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://vitals.vercel-analytics.com/v1/vitals.js"
            strategy="afterInteractive"
          />
        )} */}
      </body>
    </html>
  );
}
