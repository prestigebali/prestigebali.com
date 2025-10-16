'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  // We use useEffect to get the current date on the client-side to avoid hydration mismatch
  const [currentDate, setCurrentDate] = React.useState('');
  React.useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-left mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Last updated: {currentDate}
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Prestige Bali ("us", "we", or "our") operates the Prestige Bali website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 className="text-2xl font-bold text-foreground">Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h4>Usage Data</h4>
              <p>
                We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
              </p>

              <h2 className="text-2xl font-bold text-foreground">Use of Data</h2>
              <p>
                Prestige Bali uses the collected data for various purposes:
              </p>
              <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground">Security of Data</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-bold text-foreground">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>

              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: info@prestigebali.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Added React import to solve build issues
import * as React from 'react';