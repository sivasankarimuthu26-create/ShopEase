
const categories = [
    {
      name: "Mobiles",
      products: [
        ["Smartphone X1", 24999, "6.5-inch smartphone with a high-resolution display", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
        ["Smartphone Lite", 14999, "Everyday smartphone with long battery life", "https://images.unsplash.com/photo-1598327105666-5b89351aff97"],
        ["Smartphone Pro", 39999, "Premium smartphone for photos and multitasking", "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd"],
        ["Budget Smartphone", 9999, "Affordable smartphone for daily use", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
        ["5G Smartphone", 18999, "5G smartphone for fast connectivity", "https://images.unsplash.com/photo-1598327105666-5b89351aff97"],
        ["Camera Phone", 27999, "Smartphone designed for photography", "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd"],
        ["Compact Smartphone", 21999, "Compact phone for comfortable one-hand use", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
      ],
    },
    {
      name: "Laptops",
      products: [
        ["Slim Laptop", 54999, "Lightweight laptop for study and everyday work", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"],
        ["Developer Laptop", 59999, "Laptop suitable for programming and development", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"],
        ["Gaming Laptop", 84999, "Performance laptop for gaming and creative work", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"],
        ["Student Laptop", 39999, "Practical laptop for college and assignments", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"],
        ["Business Laptop", 69999, "Professional laptop for productivity", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"],
        ["Creator Laptop", 92999, "Laptop for design, editing, and creative projects", "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"],
      ],
    },
    {
      name: "Computer Accessories",
      products: [
        ["Mechanical Keyboard", 3499, "Mechanical keyboard for gaming and programming", "https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
        ["Gaming Mouse", 1499, "Precision mouse with adjustable DPI", "https://images.unsplash.com/photo-1527814050087-3793815479db"],
        ["Wireless Keyboard", 1799, "Wireless keyboard for desk setups", "https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
        ["USB-C Hub", 1299, "Multi-port hub for compatible laptops", "https://images.unsplash.com/photo-1625842268584-8f3296236761"],
        ["Laptop Stand", 999, "Adjustable stand for a comfortable workspace", "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"],
        ["Webcam HD", 2299, "HD webcam for meetings and online classes", "https://images.unsplash.com/photo-1587826080692-f439cd0b70da"],
        ["Wireless Mouse", 799, "Compact wireless mouse for everyday work", "https://images.unsplash.com/photo-1527814050087-3793815479db"],
      ],
    },
    {
      name: "Audio",
      products: [
        ["Wireless Headphones", 1999, "Bluetooth headphones with clear sound", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
        ["Bluetooth Speaker", 1999, "Portable speaker for music on the go", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"],
        ["Wireless Earbuds", 1799, "Compact earbuds with charging case", "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"],
        ["Studio Headphones", 4999, "Over-ear headphones for detailed listening", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
        ["Mini Bluetooth Speaker", 1299, "Small portable speaker for everyday use", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"],
        ["Wired Earphones", 499, "Lightweight wired earphones for daily listening", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
      ],
    },
    {
      name: "Smart Watches",
      products: [
        ["Smart Watch", 2999, "Fitness watch with activity tracking", "https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
        ["Sport Smart Watch", 3999, "Sport watch for workouts and daily activity", "https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
        ["Classic Smart Watch", 4999, "Classic design with smart features", "https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
        ["Fitness Band", 1499, "Lightweight band for step and activity tracking", "https://images.unsplash.com/photo-1557935728-e6d1eaabe558"],
        ["Kids Smart Watch", 1999, "Colorful watch designed for kids", "https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
      ],
    },
    {
      name: "Bags",
      products: [
        ["Laptop Backpack", 1299, "Backpack with a padded laptop compartment", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
        ["Travel Backpack", 1899, "Roomy backpack for weekend trips", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
        ["College Backpack", 999, "Everyday backpack for books and accessories", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
        ["Laptop Sleeve", 699, "Protective sleeve for compatible laptops", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
        ["Travel Duffel Bag", 1599, "Duffel bag for gym and short trips", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
      ],
    },
    {
      name: "Home & Lifestyle",
      products: [
        ["Desk Lamp", 899, "Desk lamp for studying and working", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"],
        ["Insulated Water Bottle", 599, "Reusable bottle for everyday hydration", "https://images.unsplash.com/photo-1602143407151-7111542de6e8"],
        ["Travel Mug", 499, "Reusable mug for hot and cold drinks", "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d"],
        ["Digital Alarm Clock", 799, "Digital clock for a bedside table or desk", "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"],
        ["Study Table Organizer", 399, "Organizer for pens and desk accessories", "https://images.unsplash.com/photo-1498050108023-c5249f4df085"],
        ["LED Desk Light", 1199, "LED light for reading and focused work", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"],
      ],
    },
    {
      name: "Gaming",
      products: [
        ["Gaming Controller", 2499, "Game controller for compatible devices", "https://images.unsplash.com/photo-1592840496694-26d035b52b48"],
        ["Gaming Headset", 2999, "Headset with microphone for team gaming", "https://images.unsplash.com/photo-1599669454699-248893623440"],
        ["Gaming Mouse Pad", 699, "Large mouse pad for smooth movement", "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"],
        ["RGB Gaming Keyboard", 3999, "RGB keyboard for gaming setups", "https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
        ["Gaming Monitor", 15999, "Monitor for gaming and everyday computing", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"],
        ["USB Gaming Microphone", 3499, "Microphone for streaming and voice chat", "https://images.unsplash.com/photo-1590602847861-f357a9332bbc"],
      ],
    },
    {
      name: "Cameras",
      products: [
        ["Digital Camera", 32999, "Digital camera for everyday photography", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"],
        ["Action Camera", 14999, "Compact camera for outdoor adventures", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"],
        ["Camera Tripod", 1499, "Adjustable tripod for photography", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd"],
        ["Camera Bag", 1299, "Padded bag for camera equipment", "https://images.unsplash.com/photo-1502920917128-1aa500764cbd"],
      ],
    },
    {
      name: "Tablets",
      products: [
        ["Study Tablet", 17999, "Tablet for reading, study, and video calls", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
        ["Drawing Tablet", 6999, "Digital drawing tablet for creative work", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
        ["Compact Tablet", 12999, "Portable tablet for media and browsing", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
        ["Pro Tablet", 34999, "High-performance tablet for productivity", "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
      ],
    },
  ];
  
  const products = categories.flatMap((category) =>
    category.products.map(([name, price, description, image], index) => ({
      name,
      description,
      price,
      category: category.name,
      brand: "ShopEase",
      image,
      stock: 5 + ((index + name.length) % 26),
      rating: Number((3.8 + ((index + name.length) % 13) / 10).toFixed(1)),
      numReviews: 10 + name.length * 3,
    }))
  );
  
  export default products;