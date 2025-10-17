'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Search, List, Mail, MessageCircle, CreditCard, CheckCircle, Plane } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HowToBookPage() {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      title: '1. Jelajahi Paket Wisata',
      description: 'Temukan paket wisata yang sempurna untuk Anda di halaman Paket kami. Gunakan filter untuk menyortir berdasarkan destinasi, tipe pengalaman, dan harga.',
      link: '/packages',
      linkLabel: 'Jelajahi Paket'
    },
    {
      icon: <List className="w-12 h-12 text-primary" />,
      title: '2. Isi Formulir Booking',
      description: 'Setelah Anda memilih paket, klik tombol "Book Now". Isi formulir dengan nama, email, dan nomor telepon Anda, lalu klik "Submit Booking".',
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-primary" />,
      title: '3. Hubungi Kami (Opsional)',
      description: 'Untuk respon yang lebih cepat, Anda dapat langsung menghubungi kami melalui WhatsApp atau Email setelah mengirimkan formulir. Tim kami akan segera membantu Anda.',
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: '4. Konfirmasi & Pembayaran',
      description: 'Tim kami akan mengonfirmasi ketersediaan dan detail pesanan Anda. Kami akan mengirimkan instruksi untuk proses pembayaran yang aman dan mudah.',
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-primary" />,
      title: '5. Pemesanan Selesai!',
      description: 'Setelah pembayaran dikonfirmasi, pemesanan Anda selesai! Anda akan menerima semua detail perjalanan dan itinerary Anda melalui email.',
    },
    {
        icon: <Plane className="w-12 h-12 text-primary" />,
        title: '6. Nikmati Liburan Anda',
        description: 'Sekarang Anda siap untuk petualangan yang tak terlupakan. Tim kami akan memastikan semua berjalan lancar dari awal hingga akhir. Selamat menikmati liburan Anda!',
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative h-[40vh] w-full flex items-center justify-center text-center text-white bg-gray-800">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-shadow-lg shadow-black/50">
              Cara Memesan
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mt-4 text-shadow-md shadow-black/50">
              Panduan langkah demi langkah untuk merencanakan perjalanan impian Anda bersama kami.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                    <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                      {step.link && (
                        <Button asChild className="mt-4">
                          <Link href={step.link}>{step.linkLabel}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
