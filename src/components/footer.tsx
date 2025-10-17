'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Landmark, Wallet } from 'lucide-react';
import { client } from '@/lib/sanity';
import type { SanityDocument } from 'next-sanity';
import { useState, useEffect } from 'react';

export function Footer() {
  const [settings, setSettings] = useState<SanityDocument | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const query = `*[_type == "siteSettings" && _id == "siteSettings"][0]`;
      const data = await client.fetch(query);
      setSettings(data);
    };
    fetchSettings();
  }, []);
  
  const socialLinks = [
    { name: 'Facebook', url: settings?.facebookUrl, icon: Facebook },
    { name: 'Twitter', url: settings?.twitterUrl, icon: Twitter },
    { name: 'Instagram', url: settings?.instagramUrl, icon: Instagram },
  ].filter(link => link.url);


  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4 text-white">
              <Image 
                src="https://res.cloudinary.com/dfinkfssq/image/upload/v1760581094/logo_th6oyh.png" 
                alt="Prestige Bali Logo"
                width={140}
                height={35}
                className="w-auto h-8"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Crafting premium leisure and tour experiences across Indonesia’s most captivating islands.
            </p>
          </div>
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/packages" className="text-sm text-gray-400 hover:text-primary">Packages</Link></li>
              <li><Link href="/promotions" className="text-sm text-gray-400 hover:text-primary">Promotions</Link></li>
              <li><Link href="/how-to-book" className="text-sm text-gray-400 hover:text-primary">How to Book</Link></li>
              <li><a href="/#destinations" className="text-sm text-gray-400 hover:text-primary">Destinations</a></li>
              <li><a href="/#experiences" className="text-sm text-gray-400 hover:text-primary">Experiences</a></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
             <h4 className="font-semibold text-white mb-4">Contact Us</h4>
             <ul className="space-y-2 text-sm text-gray-400">
                <li>{settings?.email || 'sales@prestigebali.com'}</li>
                <li>{settings?.phoneNumber || '+62 877 6416 1803'}</li>
                <li>{settings?.address || 'Jl. Sunset Road No.8, Kuta, Bali'}</li>
             </ul>
             {socialLinks.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                    {socialLinks.map(social => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                        <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                    </div>
                </div>
              )}
          </div>
           <div className="lg:col-span-1">
            <h4 className="font-semibold text-white mb-4">Official Payment</h4>
             <div className='flex flex-col gap-6 text-sm text-gray-400'>
                <div className="space-y-2">
                  <div className='flex gap-2 items-center font-medium text-white'><Wallet className='w-4 h-4'/> PayPal</div>
                  <p>{settings?.paypalEmail || 'Not configured'}</p>
                </div>
                <div className="space-y-2">
                  <div className='flex gap-2 items-center font-medium text-white'><Landmark className='w-4 h-4'/> Bank Transfer</div>
                  <p>{settings?.bankName || 'Not configured'}</p>
                  <p>A/N: {settings?.bankAccountHolder || 'Not configured'}</p>
                  <p>Acc: {settings?.bankAccountNumber || 'Not configured'}</p>
                </div>
             </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Prestige Bali. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
