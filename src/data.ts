export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  tags?: string[]
}

export type MenuCategory = {
  id: string
  label: string
  items: MenuItem[]
}

export type GalleryItem = {
  id: string
  src: string
  title: string
  category: 'Food' | 'Interior' | 'Chef'
}

/* ── Site constants ───────────────────────────────────────────── */

export const site = {
  name: 'Ember & Spice',
  tagline: 'Modern African Kitchen',
  city: 'Nairobi, Kenya',
  address: '18 Riverside Drive, Westlands, Nairobi',
  phone: '+254 712 345 678',
  whatsapp: '+254 712 345 678',
  email: 'hello@emberandspice.co.ke',
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 11:00 PM' },
    { days: 'Friday – Saturday', time: '11:00 AM – 1:00 AM' },
    { days: 'Sunday', time: '12:00 PM – 10:00 PM' },
  ],
  socials: [
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'facebook', label: 'Facebook', href: '#' },
    { id: 'tiktok', label: 'TikTok', href: '#' },
    { id: 'whatsapp', label: 'WhatsApp', href: '#' },
  ],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Contact', href: '#contact' },
]

/* ── Menu ─────────────────────────────────────────────────────── */

export const menu: MenuCategory[] = [
  {
    id: 'starters',
    label: 'Starters',
    items: [
      {
        id: 'skewers',
        name: 'Grilled Beef Skewers',
        description: 'Spiced beef, roasted vegetables & tamarind sauce',
        price: 850,
        tags: ['Grill'],
      },
      {
        id: 'samosas',
        name: 'Kenyan Samosa Trio',
        description: 'Beef, lentil & paneer, coriander-mint chutney',
        price: 550,
      },
      {
        id: 'maize-bites',
        name: 'Maize & Cheese Bites',
        description: 'Golden corn fritters, smoked chili aioli',
        price: 480,
        tags: ['Veg'],
      },
      {
        id: 'soup',
        name: 'Roasted Pumpkin Soup',
        description: 'Coconut cream, toasted seeds, house bread',
        price: 520,
        tags: ['Veg'],
      },
    ],
  },
  {
    id: 'mains',
    label: 'Main Courses',
    items: [
      {
        id: 'nyama-choma',
        name: 'Signature Nyama Choma',
        description: 'Charcoal-grilled Kenyan beef, kachumbari & ugali',
        price: 1450,
        tags: ['Signature'],
      },
      {
        id: 'prawns',
        name: 'Coconut Prawns',
        description: 'Garlic, coconut cream & fresh herbs, pilau rice',
        price: 1200,
      },
      {
        id: 'ember-chicken',
        name: 'Ember Chicken',
        description: 'Fire-grilled chicken, peri-peri glaze & fries',
        price: 1350,
        tags: ['Signature'],
      },
      {
        id: 'tilapia',
        name: 'Whole Grilled Tilapia',
        description: 'Lake Victoria tilapia, lemon butter, sukuma wiki',
        price: 1280,
      },
      {
        id: 'pilau',
        name: 'Swahili Lamb Pilau',
        description: 'Slow-cooked lamb, spiced rice, kachumbari',
        price: 1150,
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      {
        id: 'cheesecake',
        name: 'Passion Cheesecake',
        description: 'Creamy cheesecake with passion-fruit glaze',
        price: 650,
        tags: ['Signature'],
      },
      {
        id: 'mandazi',
        name: 'Chocolate Mandazi',
        description: 'Warm chocolate doughnuts, spiced caramel',
        price: 480,
      },
      {
        id: 'mango',
        name: 'Mango & Cardamom Sorbet',
        description: 'Kenyan mangoes, cardamom, coconut tuile',
        price: 420,
        tags: ['Vegan'],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    items: [
      {
        id: 'dawa',
        name: 'Ember Dawa Cocktail',
        description: 'Honey, whisky, lime & ginger — the Kenyan classic',
        price: 750,
        tags: ['Cocktail'],
      },
      {
        id: 'chai',
        name: 'Spiced Kenyan Chai',
        description: 'Kericho tea, ginger, cardamom, fresh milk',
        price: 250,
      },
      {
        id: 'tamarind',
        name: 'Tamarind & Hibiscus Cooler',
        description: 'Tamarind syrup, hibiscus, sparkling water',
        price: 380,
        tags: ['Mocktail'],
      },
      {
        id: 'tusker',
        name: 'Local & Craft Beers',
        description: 'Tusker, WhiteCap, BOMS brews on rotation',
        price: 450,
      },
    ],
  },
]

export const signatures = [
  {
    id: 'nyama-choma',
    name: 'Nyama Choma',
    description: 'Charcoal-grilled beef, kachumbari & soft ugali — our fire-driven classic.',
    price: 1450,
    image: '/media/images/dishes/nyama-choma.jpg',
  },
  {
    id: 'coconut-prawns',
    name: 'Coconut Prawns',
    description: 'Coastal prawns folded in garlic cream and fresh herbs.',
    price: 1200,
    image: '/media/images/dishes/coconut-prawns.jpg',
  },
  {
    id: 'ember-chicken',
    name: 'Ember Chicken',
    description: 'Half chicken glazed in peri-peri over open flame.',
    price: 1350,
    image: '/media/images/dishes/ember-chicken.jpg',
  },
]

/* ── Gallery ──────────────────────────────────────────────────── */

export const gallery: GalleryItem[] = [
  { id: 'g1', src: '/media/images/gallery/food-01.jpg', title: 'The Grill at Work', category: 'Food' },
  { id: 'g2', src: '/media/images/gallery/interior-01.jpg', title: 'Main Dining Room', category: 'Interior' },
  { id: 'g3', src: '/media/images/gallery/chef-01.jpg', title: 'Chef Amina at the Pass', category: 'Chef' },
  { id: 'g4', src: '/media/images/gallery/food-02.jpg', title: 'Coastal Flavors', category: 'Food' },
  { id: 'g5', src: '/media/images/gallery/interior-02.jpg', title: 'The Ember Bar', category: 'Interior' },
  { id: 'g6', src: '/media/images/gallery/food-03.jpg', title: 'From the Garden', category: 'Food' },
]

export const formatKsh = (amount: number) => `KSh ${amount.toLocaleString('en-KE')}`
