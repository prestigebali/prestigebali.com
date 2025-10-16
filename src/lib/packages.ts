import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';
import { Heart, Users, Mountain, Waves, Building } from 'lucide-react';

export type TourPackage = {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    image: ImagePlaceholder;
    category: string;
    destination: string;
}

const destinationImages = PlaceHolderImages.filter(p => p.description === 'destination').slice(0, 4);
const curatedTours = PlaceHolderImages.filter(p => p.description === 'tour');
const experienceImages = PlaceHolderImages.filter(p => p.description === 'experience');

export const destinations = [
  { name: "Bali", image: destinationImages[0] },
  { name: "Lombok", image: destinationImages[1] },
  { name: "Labuan Bajo", image: destinationImages[2] },
  { name: "Sumbawa", image: destinationImages[3] },
];

export const experienceTypes = [
    {
        icon: Heart,
        title: "Romantic Honeymoons",
        description: "Create timeless memories with our exclusive romantic escapes in breathtaking settings.",
        image: experienceImages.find(i => i.id === 'exp-1')!
    },
    {
        icon: Users,
        title: "Family Vacations",
        description: "Engaging, safe, and memorable adventures for the whole family to enjoy together.",
        image: experienceImages.find(i => i.id === 'exp-2')!
    },
    {
        icon: Mountain,
        title: "Cultural Adventures",
        description: "Immerse yourself in the rich traditions, arts, and heritage of the Indonesian islands.",
        image: experienceImages.find(i => i.id === 'exp-3')!
    },
    {
        icon: Waves,
        title: "Wellness Retreats",
        description: "Restore your mind, body, and soul in serene, luxurious settings with expert guidance.",
        image: experienceImages.find(i => i.id === 'exp-4')!
    },
    {
        icon: Building,
        title: "Company Outings",
        description: "Inspiring team-building and corporate retreats that foster collaboration and creativity.",
        image: experienceImages.find(i => i.id === 'exp-5')!
    }
];

export const tourCategories = [...new Set(experienceTypes.map(exp => exp.title))];

export const allPackages: TourPackage[] = [
  {
    id: "tour-1",
    title: "Enchanting Bali Discovery",
    description: "Immerse yourself in the spiritual and cultural heart of Bali.",
    price: 1350,
    rating: 4.9,
    image: curatedTours[0],
    category: "Cultural Adventures",
    destination: "Bali"
  },
  {
    id: "tour-2",
    title: "Lombok's Coastal Gems",
    description: "Explore pristine beaches and the majestic Mount Rinjani.",
    price: 1550,
    rating: 4.8,
    image: curatedTours[1],
    category: "Wellness Retreats",
    destination: "Lombok"
  },
  {
    id: "tour-3",
    title: "Komodo & Labuan Bajo Adventure",
    description: "Sail through turquoise waters and meet the legendary Komodo dragons.",
    price: 2200,
    rating: 4.9,
    image: curatedTours[2],
    category: "Cultural Adventures",
    destination: "Labuan Bajo"
  },
  {
    id: "tour-4",
    title: "Bali Honeymoon Dream",
    description: "Private villas, romantic dinners, and breathtaking sunsets.",
    price: 1800,
    rating: 5.0,
    image: experienceImages.find(i => i.id === 'exp-1')!,
    category: "Romantic Honeymoons",
    destination: "Bali"
  },
  {
    id: "tour-5",
    title: "Lombok Family Fun",
    description: "Safe & engaging activities for all ages on a beautiful island.",
    price: 1650,
    rating: 4.8,
    image: experienceImages.find(i => i.id === 'exp-2')!,
    category: "Family Vacations",
    destination: "Lombok"
  },
  {
    id: "tour-6",
    title: "Sumbawa Corporate Retreat",
    description: "Team building and strategy sessions in an inspiring, remote location.",
    price: 2500,
    rating: 4.9,
    image: experienceImages.find(i => i.id === 'exp-5')!,
    category: "Company Outings",
    destination: "Sumbawa"
  },
  {
    id: "tour-7",
    title: "Cultural Bali Immersion",
    description: "Deep dive into Balinese culture with temple visits and craft workshops.",
    price: 1450,
    rating: 4.8,
    image: PlaceHolderImages.find(i => i.id === 'tour-1')!,
    category: "Cultural Adventures",
    destination: "Bali",
  },
  {
    id: "tour-8",
    title: "Sumbawa Surf & Stay",
    description: "Catch world-class waves and relax in beachfront comfort.",
    price: 1900,
    rating: 4.9,
    image: PlaceHolderImages.find(i => i.id === 'dest-4')!,
    category: "Wellness Retreats",
    destination: "Sumbawa",
  },
  {
    id: "tour-9",
    title: "Labuan Bajo Family Expedition",
    description: "An exciting journey for families to discover islands and wildlife.",
    price: 2400,
    rating: 4.8,
    image: PlaceHolderImages.find(i => i.id === 'dest-3')!,
    category: "Family Vacations",
    destination: "Labuan Bajo",
  }
];
