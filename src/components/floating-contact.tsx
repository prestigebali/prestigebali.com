'use client';

import { useState, useEffect } from 'react';
import type { SanityDocument } from 'next-sanity';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { client } from '@/lib/sanity';
import Link from 'next/link';

// Using a simplified component-level fetch for contact info
async function getSiteSettings() {
  try {
    const settings = await client.fetch<SanityDocument | null>(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
        email,
        "whatsappNumber": phoneNumber
    }`);
    return settings;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
}

// Simple component to render the WhatsApp icon
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className="w-5 h-5"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>
);


export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<{ email: string; whatsappNumber: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
        const fetchedSettings = await getSiteSettings();
        if (fetchedSettings) {
            setSettings({
                email: fetchedSettings.email || 'sales@prestigebali.com',
                whatsappNumber: fetchedSettings.whatsappNumber ? fetchedSettings.whatsappNumber.replace(/[^0-9]/g, '') : '6287764161803'
            });
        }
    }
    fetchData();
  }, []);


  const whatsAppMessage = `Hello, I'm interested in learning more about your tour packages.`;
  const emailSubject = `Inquiry about Prestige Bali Tour Packages`;

  if (!settings) {
    return null; // Don't render anything until settings are fetched
  }

  const { whatsappNumber, email } = settings;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsAppMessage)}`;
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      <div
        className={cn(
          'flex flex-col items-center gap-3 transition-all duration-300 ease-in-out',
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        )}
      >
        <Link href={emailUrl} target="_blank" rel="noopener noreferrer" aria-label="Contact via Email">
            <Button size="icon" className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 shadow-lg">
                <Mail className="w-6 h-6" />
            </Button>
        </Link>
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contact via WhatsApp">
            <Button size="icon" className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg">
                <WhatsAppIcon/>
            </Button>
        </Link>
      </div>

      {/* Main Floating Action Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
            'rounded-full w-16 h-16 shadow-lg mt-4 transition-transform duration-300 ease-in-out',
             isOpen ? 'bg-muted text-muted-foreground hover:bg-muted/90 rotate-90' : 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
      >
        {isOpen ? (
            <X className="w-7 h-7" />
        ) : (
            <MessageCircle className="w-7 h-7" />
        )}
      </Button>
    </div>
  );
}
