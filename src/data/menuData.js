export const CURRENCY = 'Rs.';

export const categories = [
  { id: 'all', name: 'All Cravings', icon: 'fa-utensils' },
  { id: 'burgers', name: 'Crispy Burgers', icon: 'fa-burger' },
  { id: 'chicken', name: 'Fried Chicken & Wings', icon: 'fa-drumstick-bite' },
  { id: 'fries', name: 'Loaded Fries', icon: 'fa-fire-burner' },
  { id: 'combos', name: 'Value Combos & Deals', icon: 'fa-boxes-stacked' },
  { id: 'beverages', name: 'Chilled Drinks & Shakes', icon: 'fa-wine-bottle' },
  { id: 'dips', name: 'Signature Dips', icon: 'fa-bowl-rice' }
];

export const menuItems = [
  {
    id: 'c1',
    name: 'Monster Crispy Crunch Burger',
    category: 'burgers',
    price: 890,
    badge: 'Best Seller',
    spicy: true,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    desc: 'Double crispy zesty chicken patty, melt-in-mouth yellow cheddar, signature dynamite dip, iceberg lettuce on butter-toasted brioche bun.'
  },
  {
    id: 'c2',
    name: 'Classic Zinger Crisp Burger',
    category: 'burgers',
    price: 650,
    badge: 'Popular',
    spicy: false,
    rating: 4.8,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    desc: 'Golden-fried 100% chicken breast fillet, creamy garlic mayo, freshly shredded lettuce on warm sesame bun.'
  },
  {
    id: 'c3',
    name: 'Fire Hot Wings (6 Pcs)',
    category: 'chicken',
    price: 620,
    badge: 'Hot & Spicy',
    spicy: true,
    rating: 4.7,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80',
    desc: 'Extra crunchy battered wings tossed in fiery sweet chili buffalo glaze, served with creamy ranch dip.'
  },
  {
    id: 'c4',
    name: 'Loaded Dynamite Fries',
    category: 'fries',
    price: 550,
    badge: 'Must Try',
    spicy: true,
    rating: 4.9,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=700&q=80',
    desc: 'Crisp golden potato fries loaded with diced crispy chicken tenders, molten cheese sauce, spicy jalapenos & dynamite drizzle.'
  },
  {
    id: 'c5',
    name: 'Crispy Chicken Tortilla Wrap',
    category: 'burgers',
    price: 590,
    badge: 'Chef Special',
    spicy: false,
    rating: 4.6,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    desc: 'Golden crispy chicken strips wrapped in a toasted flour tortilla with garlic herb mayo, diced tomatoes & crispy slaw.'
  },
  {
    id: 'c6',
    name: '3-Piece Crispy Broast Bucket',
    category: 'chicken',
    price: 790,
    badge: 'Crispy Special',
    spicy: true,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=700&q=80',
    desc: 'Secret 12-spice marinated fried chicken pieces with signature crunchy coating, served with fresh dinner roll & garlic dip.'
  },
  {
    id: 'c7',
    name: 'Gourmet Crispy Smash Beef Burger',
    category: 'burgers',
    price: 980,
    badge: 'Premium',
    spicy: false,
    rating: 4.8,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80',
    desc: 'Double smashed beef patties with crispy grilled edges, American cheese, caramelized onions & secret truffle burger sauce.'
  },
  {
    id: 'c8',
    name: 'Crispy Combo Deluxe Box',
    category: 'combos',
    price: 1450,
    badge: 'Value Pack',
    spicy: true,
    rating: 5.0,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=700&q=80',
    desc: '1 Classic Zinger Burger + 2 Crispy Wings + Regular Salted Fries + 1 Garlic Mayo Dip + 500ml Chilled Drink.'
  },
  {
    id: 'c9',
    name: 'Cheesy Garlic Curly Fries',
    category: 'fries',
    price: 490,
    badge: 'New',
    spicy: false,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80',
    desc: 'Spiral seasoned curly fries smothered in rich garlic butter glaze and warm melted cheddar cheese.'
  },
  {
    id: 'c10',
    name: 'Chilled Cola (500ml)',
    category: 'beverages',
    price: 150,
    badge: '',
    spicy: false,
    rating: 4.9,
    reviewsCount: 610,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80',
    desc: 'Ice-cold refreshing beverage served chilled to complement your hot crunchy meal.'
  },
  {
    id: 'c11',
    name: 'Mint Lemonade Chiller',
    category: 'beverages',
    price: 280,
    badge: 'Refreshing',
    spicy: false,
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    desc: 'Freshly crushed mint leaves, lemon juice, soda and crushed ice. Ultimate heat buster!'
  },
  {
    id: 'c12',
    name: 'Garlic Mayo Dip (2oz)',
    category: 'dips',
    price: 80,
    badge: 'House Favorite',
    spicy: false,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=700&q=80',
    desc: 'Our famous thick & velvety garlic mayo whipped with herbs. Irresistible dipping companion.'
  }
];

export const sauceOptions = [
  { id: 'garlic-mayo', name: 'Garlic Mayo Dip', price: 80 },
  { id: 'dynamite-hot', name: 'Signature Dynamite Hot Sauce', price: 80 },
  { id: 'smoky-bbq', name: 'Smoky Chipotle BBQ', price: 80 },
  { id: 'honey-mustard', name: 'Creamy Honey Mustard', price: 80 }
];

export const spiceLevels = [
  { id: 'mild', label: 'Mild Cheesy', icon: '🧀', desc: 'No chili heat, maximum rich flavour' },
  { id: 'medium', label: 'Crispy Spicy', icon: '🌶️', desc: 'Signature Pakistani fast food kick' },
  { id: 'extra', label: 'Extra Fire 🔥', icon: '🔥', desc: 'Double spiced for true hot-heads' }
];

export const boxBuilderData = {
  mains: [
    { id: 'b1', name: 'Classic Zinger Crisp Burger', extraPrice: 0 },
    { id: 'b2', name: 'Monster Crispy Crunch Burger', extraPrice: 190 },
    { id: 'b3', name: 'Crispy Beef Smash Burger', extraPrice: 250 },
    { id: 'b4', name: 'Crispy Chicken Wrap', extraPrice: 50 }
  ],
  sides: [
    { id: 's1', name: 'Crispy Salted Fries (Regular)', extraPrice: 0 },
    { id: 's2', name: 'Garlic Butter Fries', extraPrice: 70 },
    { id: 's3', name: 'Crispy Chicken Tenders (2 Pcs)', extraPrice: 120 },
    { id: 's4', name: 'Fire Hot Wings (2 Pcs)', extraPrice: 130 }
  ],
  drinks: [
    { id: 'd1', name: 'Chilled Cola (500ml)', extraPrice: 0 },
    { id: 'd2', name: 'Chilled Lemon Soda (500ml)', extraPrice: 0 },
    { id: 'd3', name: 'Zero Sugar Cola (500ml)', extraPrice: 0 },
    { id: 'd4', name: 'Mint Lemonade Chiller', extraPrice: 130 }
  ],
  dips: [
    { id: 'dip1', name: 'Garlic Mayo Dip', extraPrice: 0 },
    { id: 'dip2', name: 'Dynamite Hot Sauce', extraPrice: 0 },
    { id: 'dip3', name: 'Smoky BBQ Sauce', extraPrice: 0 }
  ],
  baseBundlePrice: 1190 // In PKR
};

export const pakistaniCities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Gujranwala',
  'Sialkot',
  'Hyderabad'
];

export const STORE_CONTACT = {
  phone: '03130031711',
  phoneDisplay: '+92 313 0031711',
  whatsappRaw: '923130031711',
  whatsappUrl: 'https://wa.me/923130031711',
  jazzCashNumber: '03195756359',
  jazzCashTitle: 'The Crispy Corner'
};

