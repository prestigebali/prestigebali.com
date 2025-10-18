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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.885-9.888-9.885-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.395 1.905 6.344l-1.225 4.485 4.575-1.212z" />
    </svg>
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
