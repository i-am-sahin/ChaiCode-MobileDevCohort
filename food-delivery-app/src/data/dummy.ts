export type Category = {
  id: string;
  title: string;
  emoji: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  etaMins: number;
  priceForOne: number;
  imageUrl: string;
  tags: string[];
  menu: MenuItem[];
};

export type OrderStatus = "Preparing" | "On the way" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  placedAt: string;
  status: OrderStatus;
  total: number;
  items: Array<{ name: string; qty: number; price: number }>;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  addresses: Array<{ id: string; label: string; address: string }>;
};

export const CATEGORIES: Category[] = [
  { id: "c1", title: "Pizza", emoji: "🍕" },
  { id: "c2", title: "Burgers", emoji: "🍔" },
  { id: "c3", title: "Indian", emoji: "🍛" },
  { id: "c4", title: "Desserts", emoji: "🍰" },
  { id: "c5", title: "Healthy", emoji: "🥗" },
  { id: "c6", title: "Coffee", emoji: "☕️" },
];

const commonImages = {
  pizza:
    "https://images.unsplash.com/photo-1548365328-9f547f3c82f0?auto=format&fit=crop&w=1200&q=80",
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
  indian:
    "https://images.unsplash.com/photo-1604908176997-125f25cc500f?auto=format&fit=crop&w=1200&q=80",
  dessert:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
  salad:
    "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=1200&q=80",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
} as const;

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    name: "Pizza Palace",
    cuisine: "Italian · Pizza",
    rating: 4.6,
    etaMins: 28,
    priceForOne: 220,
    imageUrl: commonImages.pizza,
    tags: ["Best Seller", "Cheesy", "Fast Delivery"],
    menu: [
      {
        id: "m1",
        name: "Margherita",
        description: "Classic cheese pizza with basil and olive oil.",
        price: 199,
        imageUrl: commonImages.pizza,
        isVeg: true,
        spicyLevel: 0,
      },
      {
        id: "m2",
        name: "Pepperoni",
        description: "Loaded pepperoni, mozzarella, and tomato sauce.",
        price: 279,
        imageUrl: commonImages.pizza,
        spicyLevel: 1,
      },
      {
        id: "m3",
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs.",
        price: 129,
        imageUrl: "https://images.unsplash.com/photo-1617191519105-b4a6d7f798f4?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 0,
      },
    ],
  },
  {
    id: "r2",
    name: "Burger Barn",
    cuisine: "American · Burgers",
    rating: 4.4,
    etaMins: 24,
    priceForOne: 180,
    imageUrl: commonImages.burger,
    tags: ["Juicy", "Combo Deals"],
    menu: [
      {
        id: "m4",
        name: "Classic Cheeseburger",
        description: "Beef patty, cheddar, lettuce, tomato, house sauce.",
        price: 189,
        imageUrl: commonImages.burger,
        spicyLevel: 0,
      },
      {
        id: "m5",
        name: "Crispy Chicken Burger",
        description: "Crispy chicken, pickles, slaw, mayo.",
        price: 199,
        imageUrl:
          "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?auto=format&fit=crop&w=1200&q=80",
        spicyLevel: 1,
      },
      {
        id: "m6",
        name: "Fries (Large)",
        description: "Golden fries with seasoning.",
        price: 99,
        imageUrl:
          "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 0,
      },
    ],
  },
  {
    id: "r3",
    name: "Spice Route",
    cuisine: "North Indian · Curry",
    rating: 4.7,
    etaMins: 35,
    priceForOne: 240,
    imageUrl: commonImages.indian,
    tags: ["Family Pack", "Authentic"],
    menu: [
      {
        id: "m7",
        name: "Butter Chicken",
        description: "Creamy tomato gravy, tender chicken pieces.",
        price: 289,
        imageUrl: commonImages.indian,
        spicyLevel: 1,
      },
      {
        id: "m8",
        name: "Paneer Tikka Masala",
        description: "Grilled paneer in a rich masala sauce.",
        price: 259,
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 2,
      },
      {
        id: "m9",
        name: "Garlic Naan",
        description: "Soft naan finished with garlic butter.",
        price: 49,
        imageUrl:
          "https://images.unsplash.com/photo-1604908553959-56b7db2a1e8d?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 0,
      },
    ],
  },
  {
    id: "r4",
    name: "Green Bowl",
    cuisine: "Healthy · Salads",
    rating: 4.3,
    etaMins: 22,
    priceForOne: 210,
    imageUrl: commonImages.salad,
    tags: ["High Protein", "Fresh"],
    menu: [
      {
        id: "m10",
        name: "Chicken Caesar Bowl",
        description: "Grilled chicken, romaine, parmesan, croutons.",
        price: 249,
        imageUrl: commonImages.salad,
        spicyLevel: 0,
      },
      {
        id: "m11",
        name: "Falafel Salad",
        description: "Falafel, hummus, veggies, tahini dressing.",
        price: 229,
        imageUrl:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 1,
      },
    ],
  },
  {
    id: "r5",
    name: "Sweet Studio",
    cuisine: "Desserts · Bakery",
    rating: 4.5,
    etaMins: 18,
    priceForOne: 160,
    imageUrl: commonImages.dessert,
    tags: ["New", "Trending"],
    menu: [
      {
        id: "m12",
        name: "Chocolate Brownie",
        description: "Fudgy brownie with a gooey center.",
        price: 129,
        imageUrl: commonImages.dessert,
        isVeg: true,
        spicyLevel: 0,
      },
      {
        id: "m13",
        name: "Red Velvet Slice",
        description: "Cream cheese frosting, moist velvet cake.",
        price: 149,
        imageUrl:
          "https://images.unsplash.com/photo-1612197527762-6f0c0f81b9b1?auto=format&fit=crop&w=1200&q=80",
        isVeg: true,
        spicyLevel: 0,
      },
    ],
  },
];

export const USER: UserProfile = {
  name: "Sahin Islam",
  email: "sahin@example.com",
  phone: "+91 90000 00000",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  addresses: [
    {
      id: "a1",
      label: "Home",
      address: "221B Baker Street, Near Central Park, Kolkata",
    },
    {
      id: "a2",
      label: "Work",
      address: "7th Floor, Tech Hub, Salt Lake Sector V",
    },
  ],
};

export const ORDERS: Order[] = [
  {
    id: "o1",
    restaurantId: "r1",
    restaurantName: "Pizza Palace",
    placedAt: "Today · 7:40 PM",
    status: "On the way",
    total: 428,
    items: [
      { name: "Margherita", qty: 1, price: 199 },
      { name: "Garlic Bread", qty: 1, price: 129 },
      { name: "Fries (Large)", qty: 1, price: 99 },
    ],
  },
  {
    id: "o2",
    restaurantId: "r3",
    restaurantName: "Spice Route",
    placedAt: "Yesterday · 1:12 PM",
    status: "Delivered",
    total: 397,
    items: [
      { name: "Paneer Tikka Masala", qty: 1, price: 259 },
      { name: "Garlic Naan", qty: 2, price: 49 },
      { name: "Cola", qty: 1, price: 40 },
    ],
  },
  {
    id: "o3",
    restaurantId: "r2",
    restaurantName: "Burger Barn",
    placedAt: "May 14 · 8:10 PM",
    status: "Cancelled",
    total: 0,
    items: [{ name: "Classic Cheeseburger", qty: 1, price: 189 }],
  },
];
