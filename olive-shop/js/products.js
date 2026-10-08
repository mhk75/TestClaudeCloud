// Product catalog. In a real project this would come from an API.
const PRODUCTS = [
  { id: "evoo-500",    name: "Extra Virgin Olive Oil",   category: "oil",      price: 14.90, unit: "500 ml", emoji: "🫒", desc: "Cold-pressed from hand-picked green olives. Fruity, peppery and perfect for salads." },
  { id: "evoo-1000",   name: "Extra Virgin Olive Oil",   category: "oil",      price: 26.50, unit: "1 L",    emoji: "🫗", desc: "Our signature first cold press in a family-size bottle." },
  { id: "infused-oil", name: "Garlic & Herb Infused Oil", category: "oil",     price: 12.00, unit: "250 ml", emoji: "🌿", desc: "Olive oil infused with garlic, rosemary and thyme. Great for dipping bread." },
  { id: "green-whole", name: "Green Olives (Whole)",     category: "olives",   price: 6.90,  unit: "350 g",  emoji: "🫒", desc: "Crisp, mild green olives cured in a light brine." },
  { id: "black-sliced",name: "Sliced Black Olives",      category: "olives",   price: 5.50,  unit: "300 g",  emoji: "⚫", desc: "Ready-to-use sliced black olives for pizza, pasta and salads." },
  { id: "green-sliced",name: "Sliced Green Olives",      category: "olives",   price: 5.50,  unit: "300 g",  emoji: "🟢", desc: "Tangy sliced green olives, pitted and convenient." },
  { id: "stuffed",     name: "Pepper-Stuffed Olives",    category: "olives",   price: 7.80,  unit: "350 g",  emoji: "🌶️", desc: "Large green olives stuffed with sweet red pepper." },
  { id: "tapenade",    name: "Olive Tapenade",           category: "spreads",  price: 8.40,  unit: "190 g",  emoji: "🥫", desc: "Rich spread of black olives, capers and olive oil." },
  { id: "pickled",     name: "Pickled Olive Mix",        category: "olives",   price: 9.20,  unit: "500 g",  emoji: "🥗", desc: "A Mediterranean mix of olives marinated with herbs and lemon." },
  { id: "soap",        name: "Olive Oil Soap",           category: "care",     price: 4.90,  unit: "120 g",  emoji: "🧼", desc: "Natural handmade soap with 72% olive oil. Gentle on skin." },
  { id: "leaf-tea",    name: "Olive Leaf Tea",           category: "care",     price: 6.30,  unit: "50 g",   emoji: "🍵", desc: "Dried olive leaves for a soothing, antioxidant-rich herbal tea." },
  { id: "gift-box",    name: "Olive Gift Box",           category: "spreads",  price: 39.00, unit: "set",    emoji: "🎁", desc: "Oil, tapenade, olives and soap in a beautiful wooden box." },
];

const CATEGORIES = {
  all: "All",
  oil: "Olive Oil",
  olives: "Olives",
  spreads: "Spreads & Gifts",
  care: "Tea & Care",
};

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
