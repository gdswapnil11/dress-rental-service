import type { Category } from '../models/category.model';
import type { Collection } from '../models/collection.model';
import type { Coupon } from '../models/coupon.model';
import type { Dress } from '../models/dress.model';
import type { Notification } from '../models/notification.model';
import type { Order } from '../models/order.model';
import type { Review } from '../models/review.model';
import type { User } from '../models/user.model';

export const cities = ['Pune', 'Mumbai', 'Nagpur', 'Hyderabad', 'Bangalore'];
const brandNames = ['Maison Lumière', 'Velvet Atelier', 'Noir Couture', 'Aurora Atelier', 'Serene Silhouettes'];
export const occasions = ['Wedding', 'Reception', 'Engagement', 'Mehendi', 'Haldi', 'Sangeet', 'Navratri', 'Diwali', 'Ganesh Festival', 'Durga Puja', 'Eid', 'Farewell Party', 'Freshers Party', 'Annual Function', 'College Gathering', 'Birthday Party', 'Corporate Event', 'Photoshoot'];
const colors = ['Champagne', 'Ruby', 'Emerald', 'Sapphire', 'Ivory', 'Midnight', 'Gold', 'Rose', 'Peach', 'Teal'];
const priceTiers: Dress['priceTier'][] = ['Normal', 'Festival', 'Wedding Season', 'Weekend'];
const depositCategories: Dress['depositCategory'][] = ['Premium Bridal Wear', 'Designer Collection', 'Luxury Collection', 'Standard'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
const categoryList = [
  'Evening Gowns',
  'Bridal Wear',
  'Cocktail Dresses',
  'Party Wear',
  'Corporate Chic',
  'Luxury Sarees',
  'Ethnic Fusion',
  'Tailored Suits',
  'Resort Looks',
  'Vintage Glam',
  'Minimalist Silhouettes',
  'Red Carpet',
  'Date Night',
  'Editorial Looks',
  'Statement Pieces',
  'Bridesmaid Dresses',
  'Midi Dresses',
  'Maxi Dresses',
  'Ball Gowns',
  'Cocktail Sets'
];

export const categories: Category[] = categoryList.map((name, index) => ({
  id: `category-${index + 1}`,
  name,
  description: `A premium selection of ${name.toLowerCase()} for luxury events and style-forward moments.`,
  image: `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80&sig=${index}`
}));

export const collections: Collection[] = [
  {
    id: 'collection-navratri-2026',
    title: 'Navratri 2026 Collection',
    description: 'A festive edit designed for dandiya nights and nine evenings of celebration.',
    highlight: 'Vibrant lehengas and statement accessories',
    image: 'https://images.unsplash.com/photo-1549291326-f8fd74997d73?auto=format&fit=crop&w=1200&q=80',
    active: true,
    occasionTags: ['Navratri', 'Diwali', 'Ganesh Festival', 'Durga Puja'],
    cityAvailability: ['Pune', 'Mumbai', 'Hyderabad', 'Bangalore'],
    featuredDressIds: ['dress-2', 'dress-8', 'dress-14']
  },
  {
    id: 'collection-wedding-season',
    title: 'Wedding Season Collection',
    description: 'Curated bridal and guest looks for the wedding season.',
    highlight: 'Lehengas, jewelry sets, and couture-ready styles',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    active: true,
    occasionTags: ['Wedding', 'Reception', 'Engagement', 'Sangeet'],
    cityAvailability: ['Mumbai', 'Pune', 'Nagpur', 'Bangalore'],
    featuredDressIds: ['dress-4', 'dress-16', 'dress-27']
  },
  {
    id: 'collection-farewell-special',
    title: 'Farewell Special Collection',
    description: 'Designed for college send-offs and heartfelt evening celebrations.',
    highlight: 'Trendy silhouettes with a youthful edge',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    active: true,
    occasionTags: ['Farewell Party', 'Freshers Party', 'College Gathering'],
    cityAvailability: ['Nagpur', 'Hyderabad', 'Bangalore'],
    featuredDressIds: ['dress-11', 'dress-22', 'dress-33']
  }
];

const imagePool = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520975659880-0d8faddb17f8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80'
];

export const dresses: Dress[] = Array.from({ length: 100 }, (_, index) => {
  const category = categories[index % categories.length];
  const brand = brandNames[index % brandNames.length];
  const occasion = occasions[index % occasions.length];
  const color = colors[index % colors.length];
  const rating = Number((4.3 + (index % 20) * 0.03).toFixed(1));
  const city = cities[index % cities.length];
  const availableToday = index % 4 !== 0;
  const priceTier = priceTiers[index % priceTiers.length];
  const depositCategory = depositCategories[index % depositCategories.length];
  const collection = index % 5 === 0 ? collections[0].id : index % 7 === 0 ? collections[1].id : index % 9 === 0 ? collections[2].id : undefined;

  return {
    id: `dress-${index + 1}`,
    name: `${brand} ${occasion} ${index + 1}`,
    description: `A premium ${occasion.toLowerCase()} dress in ${color.toLowerCase()}, designed for statement arrivals and timeless elegance.`,
    brand,
    category: category.name,
    price: 1699 + ((index % 8) * 250),
    deposit: 1200 + ((index % 6) * 150),
    available: index % 6 !== 0,
    availableToday,
    availableCities: [city, cities[(index + 1) % cities.length]],
    rating,
    reviews: 24 + (index % 12) * 3,
    sizes: sizeOptions.filter((_, sizeIndex) => sizeIndex <= (index % sizeOptions.length)),
    colors: [color, 'Black', 'Ivory', 'Gold'].slice(0, 3),
    occasion,
    collection,
    priceTier,
    depositCategory,
    images: [imagePool[index % imagePool.length], imagePool[(index + 1) % imagePool.length], imagePool[(index + 2) % imagePool.length]],
    tags: [occasion, category.name, brand, city, priceTier]
  };
});

const names = [
  'Aanya Sharma', 'Rhea Kapoor', 'Mira Patel', 'Isha Desai', 'Tanvi Mehta',
  'Sara Fernandes', 'Neha Reddy', 'Anika Singh', 'Priya Joshi', 'Aditi Rao',
  'Kavya Jain', 'Nina Chandra', 'Leela Nair', 'Amrita Shah', 'Sonali Gupta',
  'Varsha Iyer', 'Nisha Bhat', 'Meera Kulkarni', 'Simran Kohli', 'Diya Sethi',
  'Vikram Chawla', 'Rohan Verma', 'Aarav Kapoor', 'Kabir Malhotra', 'Nikhil Das',
  'Arjun Mehra', 'Shiv Sharma', 'Karan Singh', 'Aditya Rao', 'Anil Patel',
  'Priyanka Sen', 'Madhuri Das', 'Pooja Nair', 'Ritu Menon', 'Sonal Joshi',
  'Pallavi Roy', 'Sneha Bose', 'Richa Ghosh', 'Pooja Iyer', 'Tanisha Das'
];

const membershipLevels: User['membershipLevel'][] = ['Silver', 'Gold', 'Platinum'];
const ageGroups: User['ageGroup'][] = ['18-24', '25-34', '35-44', '45+'];

export const users: User[] = Array.from({ length: 50 }, (_, index) => {
  const city = cities[index % cities.length];
  const favoriteCategories = [categories[index % categories.length].name, categories[(index + 3) % categories.length].name];
  const previousRentals = dresses.filter((_, i) => i % 12 === index % 11).slice(0, 3).map((dress) => dress.id);

  return {
    id: `user-${index + 1}`,
    fullName: names[index % names.length],
    email: `user${index + 1}@fashionrent.com`,
    phone: `+91-90000${String(index + 1).padStart(5, '0')}`,
    role: index === 0 ? 'admin' : 'customer',
    avatar: `https://i.pravatar.cc/150?img=${index + 5}`,
    wishlist: dresses.filter((_, i) => i % 11 === index % 11).slice(0, 4).map((dress) => dress.id),
    savedAddresses: [
      { id: `addr-${index + 1}`, label: 'Home', address: `Flat ${index + 3}, Luxury Apartments, Fashion Street, ${city}` }
    ],
    gender: index % 2 === 0 ? 'female' : 'male',
    ageGroup: ageGroups[index % ageGroups.length],
    measurements: {
      height: 150 + (index % 5) * 5,
      weight: 50 + (index % 5) * 4,
      bust: 30 + (index % 5) * 2,
      waist: 24 + (index % 5) * 2,
      hip: 34 + (index % 5) * 2
    },
    membershipLevel: membershipLevels[index % membershipLevels.length],
    favoriteCategories,
    previousRentals,
    city
  };
});

const reviewNotes = [
  'The fit was flawless and the fabric felt luxurious.',
  'Perfect for a gala night, comfortable and elegant.',
  'I received so many compliments on this design.',
  'Beautiful color and premium finish, would rent again.',
  'The rental process was seamless and the dress arrived on time.',
  'The accessories matched perfectly with the outfit.',
  'Ideal for evening occasions and special events.',
  'Love the silhouette and the lightweight material.',
  'Exceeded my expectations for the price.',
  'Sophisticated cut with a premium couture feel.'
];

export const reviews: Review[] = Array.from({ length: 200 }, (_, index) => {
  const dress = dresses[index % dresses.length];
  const user = users[(index + 7) % users.length];
  return {
    id: `review-${index + 1}`,
    dressId: dress.id,
    userId: user.id,
    userName: user.fullName,
    rating: 4 + ((index % 5) * 0.2),
    comment: reviewNotes[index % reviewNotes.length],
    createdAt: new Date(Date.now() - index * 86400000).toISOString()
  };
});

export const orders: Order[] = Array.from({ length: 30 }, (_, index) => {
  const dress = dresses[(index * 3) % dresses.length];
  const user = users[(index * 2) % users.length];
  const start = new Date(Date.now() - index * 12 * 86400000);
  const end = new Date(start.getTime() + 5 * 86400000);
  const statusOptions: Order['status'][] = ['Confirmed', 'Packed', 'Shipped', 'Delivered', 'Returned', 'Completed'];
  return {
    id: `order-${index + 1}`,
    userId: user.id,
    dressId: dress.id,
    dressName: dress.name,
    status: statusOptions[index % statusOptions.length],
    rentalDurationDays: 5,
    price: dress.price * 5,
    deposit: dress.deposit,
    rentalStart: start.toISOString(),
    rentalEnd: end.toISOString(),
    paymentMethod: ['UPI', 'Card', 'Net Banking', 'Wallet'][index % 4] as Order['paymentMethod'],
    deliveryMethod: index % 3 === 0 ? 'Store Pickup' : 'Home Delivery',
    address: user.savedAddresses[0].address
  };
});

export const notifications: Notification[] = Array.from({ length: 22 }, (_, index) => {
  const user = users[index % users.length];
  return {
    id: `notification-${index + 1}`,
    userId: user.id,
    title: index % 2 === 0 ? 'Booking confirmed' : 'New dress added',
    body: index % 2 === 0 ? 'Your recent booking is confirmed and will arrive soon.' : 'A new premium arrival is now available in your favorite category.',
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
    unread: index % 3 === 0
  };
});

export const coupons: Coupon[] = [
  { id: 'coupon-1', code: 'FASHION20', discountPercentage: 20, description: '20% off on your first rental', expiresAt: '2026-12-31T23:59:59.000Z' },
  { id: 'coupon-2', code: 'RENT50', discountPercentage: 15, description: '15% off for bookings over ₹5000', expiresAt: '2026-11-30T23:59:59.000Z' },
  { id: 'coupon-3', code: 'STYLE10', discountPercentage: 10, description: '10% off on premium evening gowns', expiresAt: '2027-01-31T23:59:59.000Z' }
];
