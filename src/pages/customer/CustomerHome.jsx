import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const C = {
  bg: '#1a0f0a',
  sidebar: '#140c07',
  card: 'rgba(255,255,255,0.04)',
  cardHover: 'rgba(200,95,32,0.08)',
  primary: '#c85f20',
  primaryLight: '#e07d3c',
  gold: '#d4a843',
  text: '#fdf6f0',
  muted: 'rgba(253,246,240,0.5)',
  border: 'rgba(255,255,255,0.07)',
  success: '#4ade80',
  danger: '#f87171',
}

const CAFES = [
  { id: 1, name: 'Brew & Co', location: 'Anna Nagar, Chennai', rating: 4.8, reviews: 320, cuisine: 'Coffee & Snacks', image: '🏡', tables: 12, open: true, tag: 'Popular' },
  { id: 2, name: 'The Roast Room', location: 'T Nagar, Chennai', rating: 4.6, reviews: 210, cuisine: 'Coffee & Desserts', image: '☕', tables: 8, open: true, tag: 'New' },
  { id: 3, name: 'Sip & Sit', location: 'Velachery, Chennai', rating: 4.5, reviews: 180, cuisine: 'Café & Bistro', image: '🫖', tables: 10, open: false, tag: 'Top Rated' },
  { id: 4, name: 'Mocha Mansion', location: 'Adyar, Chennai', rating: 4.9, reviews: 450, cuisine: 'Premium Coffee', image: '🍵', tables: 15, open: true, tag: 'Premium' },
  { id: 5, name: 'Bean & Brew', location: 'Nungambakkam, Chennai', rating: 4.7, reviews: 290, cuisine: 'Coffee & Meals', image: '🧋', tables: 10, open: true, tag: 'Trending' },
  { id: 6, name: 'Cuppa Tales', location: 'Mylapore, Chennai', rating: 4.4, reviews: 160, cuisine: 'Coffee & Books', image: '📚', tables: 6, open: true, tag: 'Cozy' },
  { id: 7, name: 'The Grand Café', location: 'Egmore, Chennai', rating: 4.7, reviews: 380, cuisine: 'Continental & Coffee', image: '🏨', tables: 20, open: true, tag: 'Grand' },
  { id: 8, name: 'Spice Garden', location: 'Sowcarpet, Chennai', rating: 4.3, reviews: 240, cuisine: 'Indian & Beverages', image: '🌿', tables: 14, open: true, tag: 'Spicy' },
  { id: 9, name: 'The Pastry House', location: 'Besant Nagar, Chennai', rating: 4.6, reviews: 195, cuisine: 'Bakery & Coffee', image: '🥐', tables: 8, open: true, tag: 'Sweet' },
  { id: 10, name: 'Urban Grind', location: 'OMR, Chennai', rating: 4.8, reviews: 410, cuisine: 'Modern Café', image: '🏙️', tables: 18, open: true, tag: 'Urban' },
  { id: 11, name: 'The Tea Garden', location: 'Alwarpet, Chennai', rating: 4.5, reviews: 220, cuisine: 'Tea & Snacks', image: '🍃', tables: 10, open: false, tag: 'Calm' },
  { id: 12, name: 'Coastal Brew', location: 'ECR, Chennai', rating: 4.7, reviews: 310, cuisine: 'Seafood & Coffee', image: '🌊', tables: 16, open: true, tag: 'Scenic' },
  { id: 13, name: 'Horizon Hotel Café', location: 'Mount Road, Chennai', rating: 4.9, reviews: 520, cuisine: 'Multi-cuisine & Bar', image: '🌅', tables: 25, open: true, tag: 'Luxury' },
  { id: 14, name: 'The Breakfast Club', location: 'Porur, Chennai', rating: 4.4, reviews: 175, cuisine: 'Breakfast & Brunch', image: '🍳', tables: 12, open: true, tag: 'Brunch' },
  { id: 15, name: 'Midnight Roasters', location: 'Thiruvanmiyur, Chennai', rating: 4.6, reviews: 265, cuisine: 'Coffee & Late Night', image: '🌙', tables: 9, open: true, tag: 'Night' },
  { id: 16, name: 'The Desi Corner', location: 'Chromepet, Chennai', rating: 4.3, reviews: 190, cuisine: 'Desi Food & Chai', image: '🪔', tables: 11, open: true, tag: 'Desi' },
]

const MENUS = {
  1: [
    { id: 1, name: 'Signature Espresso', desc: 'Rich and bold', price: 180, category: 'Coffee', emoji: '☕' },
    { id: 2, name: 'Butter Croissant', desc: 'Freshly baked', price: 120, category: 'Snacks', emoji: '🥐' },
    { id: 3, name: 'Cappuccino', desc: 'Creamy foam', price: 160, category: 'Coffee', emoji: '☕' },
    { id: 4, name: 'Club Sandwich', desc: 'Grilled chicken', price: 280, category: 'Meals', emoji: '🥪' },
    { id: 5, name: 'Chocolate Cake', desc: 'Dark chocolate', price: 200, category: 'Desserts', emoji: '🎂' },
    { id: 6, name: 'Cold Brew', desc: 'Smooth & refreshing', price: 220, category: 'Coffee', emoji: '🧋' },
    { id: 101, name: 'Pancake Stack', desc: 'With maple syrup', price: 240, category: 'Meals', emoji: '🥞' },
    { id: 102, name: 'Caesar Salad', desc: 'Fresh romaine', price: 200, category: 'Meals', emoji: '🥗' },
  ],
  2: [
    { id: 7, name: 'Matcha Latte', desc: 'Ceremonial grade', price: 220, category: 'Coffee', emoji: '🍵' },
    { id: 8, name: 'Velvet Cupcake', desc: 'Red velvet', price: 150, category: 'Desserts', emoji: '🧁' },
    { id: 9, name: 'Iced Americano', desc: 'Bold and cold', price: 170, category: 'Coffee', emoji: '☕' },
    { id: 10, name: 'Cheesecake', desc: 'New York style', price: 250, category: 'Desserts', emoji: '🍰' },
    { id: 103, name: 'Brownie Sundae', desc: 'Warm brownie + ice cream', price: 280, category: 'Desserts', emoji: '🍨' },
    { id: 104, name: 'French Toast', desc: 'Cinnamon dusted', price: 190, category: 'Meals', emoji: '🍞' },
  ],
  3: [
    { id: 11, name: 'Flat White', desc: 'Silky smooth', price: 190, category: 'Coffee', emoji: '☕' },
    { id: 12, name: 'Avocado Toast', desc: 'With poached egg', price: 320, category: 'Meals', emoji: '🥑' },
    { id: 13, name: 'Berry Smoothie', desc: 'Mixed berries', price: 200, category: 'Drinks', emoji: '🍓' },
    { id: 105, name: 'Mushroom Bruschetta', desc: 'Garlic & herbs', price: 240, category: 'Snacks', emoji: '🍄' },
    { id: 106, name: 'Lemon Tart', desc: 'Tangy & sweet', price: 180, category: 'Desserts', emoji: '🍋' },
  ],
  4: [
    { id: 14, name: 'Premium Latte', desc: 'Single origin', price: 280, category: 'Coffee', emoji: '☕' },
    { id: 15, name: 'Truffle Pasta', desc: 'Black truffle', price: 450, category: 'Meals', emoji: '🍝' },
    { id: 16, name: 'Tiramisu', desc: 'Classic Italian', price: 300, category: 'Desserts', emoji: '🍮' },
    { id: 17, name: 'Wagyu Burger', desc: 'Premium beef', price: 550, category: 'Meals', emoji: '🍔' },
    { id: 107, name: 'Lobster Bisque', desc: 'Creamy soup', price: 380, category: 'Meals', emoji: '🦞' },
    { id: 108, name: 'Macaron Box', desc: '6 assorted macarons', price: 320, category: 'Desserts', emoji: '🎨' },
  ],
  5: [
    { id: 18, name: 'Filter Coffee', desc: 'South Indian style', price: 80, category: 'Coffee', emoji: '☕' },
    { id: 19, name: 'Masala Chai', desc: 'Spiced milk tea', price: 60, category: 'Drinks', emoji: '🫖' },
    { id: 20, name: 'Vada Pav', desc: 'Mumbai street style', price: 90, category: 'Snacks', emoji: '🍔' },
    { id: 21, name: 'Idli Set', desc: 'With sambar', price: 120, category: 'Meals', emoji: '🍽️' },
    { id: 109, name: 'Poha', desc: 'Flattened rice', price: 100, category: 'Meals', emoji: '🍚' },
    { id: 110, name: 'Mango Lassi', desc: 'Fresh mango', price: 120, category: 'Drinks', emoji: '🥭' },
  ],
  6: [
    { id: 22, name: 'Book Club Latte', desc: 'Special blend', price: 200, category: 'Coffee', emoji: '☕' },
    { id: 23, name: 'Reading Snack Box', desc: 'Mixed snacks', price: 180, category: 'Snacks', emoji: '📦' },
    { id: 24, name: 'Earl Grey Tea', desc: 'Premium leaves', price: 140, category: 'Drinks', emoji: '🍵' },
    { id: 111, name: 'Walnut Brownie', desc: 'Fudgy & rich', price: 160, category: 'Desserts', emoji: '🍫' },
    { id: 112, name: 'Cinnamon Roll', desc: 'Fresh baked', price: 150, category: 'Snacks', emoji: '🌀' },
  ],
  7: [
    { id: 25, name: 'Grand Breakfast', desc: 'Full English', price: 480, category: 'Meals', emoji: '🍳' },
    { id: 26, name: 'Eggs Benedict', desc: 'Hollandaise sauce', price: 380, category: 'Meals', emoji: '🥚' },
    { id: 27, name: 'Continental Coffee', desc: 'Premium blend', price: 250, category: 'Coffee', emoji: '☕' },
    { id: 28, name: 'Fresh OJ', desc: 'Freshly squeezed', price: 180, category: 'Drinks', emoji: '🍊' },
    { id: 29, name: 'Crème Brûlée', desc: 'Classic French', price: 320, category: 'Desserts', emoji: '🍮' },
    { id: 30, name: 'Club Royale', desc: 'Triple decker', price: 420, category: 'Meals', emoji: '🥪' },
  ],
  8: [
    { id: 31, name: 'Masala Dosa', desc: 'Crispy & spicy', price: 140, category: 'Meals', emoji: '🫓' },
    { id: 32, name: 'Chai Special', desc: 'Ginger & cardamom', price: 70, category: 'Drinks', emoji: '🫖' },
    { id: 33, name: 'Samosa Plate', desc: '3 pieces + chutney', price: 100, category: 'Snacks', emoji: '🥟' },
    { id: 34, name: 'Biryani Bowl', desc: 'Hyderabadi style', price: 280, category: 'Meals', emoji: '🍛' },
    { id: 35, name: 'Gulab Jamun', desc: 'Warm & sweet', price: 120, category: 'Desserts', emoji: '🟤' },
    { id: 36, name: 'Lassi', desc: 'Sweet or salted', price: 100, category: 'Drinks', emoji: '🥛' },
  ],
  9: [
    { id: 37, name: 'Croissant Almond', desc: 'Filled with almond cream', price: 180, category: 'Snacks', emoji: '🥐' },
    { id: 38, name: 'Sourdough Toast', desc: 'With butter & jam', price: 150, category: 'Snacks', emoji: '🍞' },
    { id: 39, name: 'Caramel Latte', desc: 'Sweet & creamy', price: 200, category: 'Coffee', emoji: '☕' },
    { id: 40, name: 'Blueberry Muffin', desc: 'Freshly baked', price: 140, category: 'Snacks', emoji: '🫐' },
    { id: 41, name: 'Éclair', desc: 'Chocolate glazed', price: 160, category: 'Desserts', emoji: '🍫' },
    { id: 42, name: 'Hot Chocolate', desc: 'Rich & velvety', price: 180, category: 'Drinks', emoji: '🍫' },
  ],
  10: [
    { id: 43, name: 'Neon Cold Brew', desc: 'Nitrogen infused', price: 280, category: 'Coffee', emoji: '🧋' },
    { id: 44, name: 'Smash Burger', desc: 'Double smash patty', price: 380, category: 'Meals', emoji: '🍔' },
    { id: 45, name: 'Loaded Fries', desc: 'Cheese & jalapeños', price: 220, category: 'Snacks', emoji: '🍟' },
    { id: 46, name: 'Poke Bowl', desc: 'Salmon & avocado', price: 420, category: 'Meals', emoji: '🥗' },
    { id: 47, name: 'Kombucha', desc: 'Probiotic drink', price: 200, category: 'Drinks', emoji: '🍵' },
    { id: 48, name: 'Protein Smoothie', desc: 'Banana & peanut butter', price: 240, category: 'Drinks', emoji: '🍌' },
  ],
  11: [
    { id: 49, name: 'Darjeeling First Flush', desc: 'Premium tea', price: 180, category: 'Tea', emoji: '🍃' },
    { id: 50, name: 'Oolong Tea', desc: 'Aromatic & smooth', price: 160, category: 'Tea', emoji: '🍵' },
    { id: 51, name: 'Tea Sandwich', desc: 'Cucumber & cream cheese', price: 140, category: 'Snacks', emoji: '🥪' },
    { id: 52, name: 'Scones', desc: 'With clotted cream', price: 200, category: 'Snacks', emoji: '🧁' },
    { id: 53, name: 'Herbal Infusion', desc: 'Chamomile & mint', price: 150, category: 'Tea', emoji: '🌿' },
  ],
  12: [
    { id: 54, name: 'Prawn Café Fritto', desc: 'Crispy prawns', price: 380, category: 'Seafood', emoji: '🍤' },
    { id: 55, name: 'Fish Tacos', desc: 'Grilled snapper', price: 340, category: 'Meals', emoji: '🌮' },
    { id: 56, name: 'Sea Breeze Latte', desc: 'Coconut & vanilla', price: 240, category: 'Coffee', emoji: '☕' },
    { id: 57, name: 'Crab Cakes', desc: 'With tartar sauce', price: 420, category: 'Seafood', emoji: '🦀' },
    { id: 58, name: 'Mango Sorbet', desc: 'Fresh & tangy', price: 180, category: 'Desserts', emoji: '🥭' },
    { id: 59, name: 'Coconut Water', desc: 'Fresh coconut', price: 100, category: 'Drinks', emoji: '🥥' },
  ],
  13: [
    { id: 60, name: 'Horizon Signature', desc: 'Award winning blend', price: 350, category: 'Coffee', emoji: '☕' },
    { id: 61, name: 'Beef Tenderloin', desc: 'With truffle jus', price: 850, category: 'Meals', emoji: '🥩' },
    { id: 62, name: 'Lobster Thermidor', desc: 'Classic French', price: 1200, category: 'Meals', emoji: '🦞' },
    { id: 63, name: 'Champagne', desc: 'Moët & Chandon', price: 2500, category: 'Drinks', emoji: '🥂' },
    { id: 64, name: 'Opera Cake', desc: 'Layers of coffee & chocolate', price: 450, category: 'Desserts', emoji: '🎂' },
    { id: 65, name: 'Foie Gras Toast', desc: 'Brioche & fig jam', price: 680, category: 'Snacks', emoji: '🍞' },
  ],
  14: [
    { id: 66, name: 'Full Breakfast', desc: 'Eggs, bacon, toast', price: 320, category: 'Meals', emoji: '🍳' },
    { id: 67, name: 'Açaí Bowl', desc: 'Granola & berries', price: 280, category: 'Meals', emoji: '🫐' },
    { id: 68, name: 'Mimosa', desc: 'OJ & champagne', price: 350, category: 'Drinks', emoji: '🥂' },
    { id: 69, name: 'Waffles', desc: 'Belgian with fruits', price: 260, category: 'Meals', emoji: '🧇' },
    { id: 70, name: 'Smoked Salmon Bagel', desc: 'Cream cheese', price: 340, category: 'Meals', emoji: '🥯' },
  ],
  15: [
    { id: 71, name: 'Midnight Espresso', desc: 'Double shot', price: 200, category: 'Coffee', emoji: '☕' },
    { id: 72, name: 'Dark Roast', desc: 'Intense & smoky', price: 220, category: 'Coffee', emoji: '☕' },
    { id: 73, name: 'Grilled Cheese', desc: 'Triple cheese melt', price: 260, category: 'Meals', emoji: '🧀' },
    { id: 74, name: 'Nachos', desc: 'With salsa & guac', price: 280, category: 'Snacks', emoji: '🌮' },
    { id: 75, name: 'Nutella Waffle', desc: 'Warm & gooey', price: 240, category: 'Desserts', emoji: '🧇' },
    { id: 76, name: 'Red Bull Mocktail', desc: 'Energy & citrus', price: 200, category: 'Drinks', emoji: '⚡' },
  ],
  16: [
    { id: 77, name: 'Cutting Chai', desc: 'Strong & sweet', price: 50, category: 'Drinks', emoji: '🫖' },
    { id: 78, name: 'Pav Bhaji', desc: 'Mumbai special', price: 160, category: 'Meals', emoji: '🍛' },
    { id: 79, name: 'Chole Bhature', desc: 'Punjabi style', price: 180, category: 'Meals', emoji: '🫓' },
    { id: 80, name: 'Jalebi', desc: 'Crispy & syrupy', price: 80, category: 'Desserts', emoji: '🟠' },
    { id: 81, name: 'Aloo Tikki', desc: 'With chutneys', price: 100, category: 'Snacks', emoji: '🥔' },
    { id: 82, name: 'Thandai', desc: 'Rose & dry fruits', price: 140, category: 'Drinks', emoji: '🌹' },
  ],
}

const MY_BOOKINGS = [
  { id: 1, cafe: 'Brew & Co', date: '2025-03-20', time: '11:00 AM', table: 'Table 3', guests: 2, status: 'Confirmed' },
  { id: 2, cafe: 'Mocha Mansion', date: '2025-03-25', time: '07:00 PM', table: 'Table 7', guests: 4, status: 'Pending' },
  { id: 3, cafe: 'Urban Grind', date: '2025-03-28', time: '03:00 PM', table: 'Table 2', guests: 2, status: 'Confirmed' },
]

const MY_ORDERS = [
  { id: 1, cafe: 'Brew & Co', items: ['Signature Espresso', 'Butter Croissant'], total: 300, status: 'Served', date: '2025-03-15' },
  { id: 2, cafe: 'The Roast Room', items: ['Matcha Latte', 'Velvet Cupcake'], total: 370, status: 'Preparing', date: '2025-03-18' },
  { id: 3, cafe: 'Horizon Hotel Café', items: ['Beef Tenderloin', 'Horizon Signature'], total: 1200, status: 'Served', date: '2025-03-10' },
]

export default function CustomerHome() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('home')
  const [selectedCafe, setSelectedCafe] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [bookingModal, setBookingModal] = useState(false)
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', guests: 1, tableNo: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id)
      if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id))
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
  )
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)

  const menuItems = selectedCafe ? (MENUS[selectedCafe.id] || []) : []
  const categories = ['All', ...new Set(menuItems.map(m => m.category))]
  const filteredMenu = menuItems.filter(m => activeCategory === 'All' || m.category === activeCategory)

  const filteredCafes = CAFES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBooking = (e) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => { setBookingModal(false); setBookingSuccess(false) }, 2500)
  }

  const handleLogout = () => { logout(); navigate('/') }

  const handleProceedToPayment = () => {
    setCartOpen(false)
    navigate('/payment', {
      state: {
        amount: cartTotal,
        type: 'ORDER',
        items: cart,
      }
    })
  }

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Explore Cafés' },
    { id: 'bookings', icon: '📅', label: 'My Bookings' },
    { id: 'orders', icon: '🍽️', label: 'My Orders' },
    { id: 'booktable', icon: '🪑', label: 'Book a Table' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ]

  const statusColor = (status) => {
    if (status === 'Confirmed' || status === 'Served') return { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.2)' }
    if (status === 'Preparing') return { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.2)' }
    return { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: 'rgba(148,163,184,0.2)' }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cartSlide { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes pulse { 0%,100%{opacity:0.06} 50%{opacity:0.12} }
        .nav-item:hover { background: rgba(200,95,32,0.1) !important; color: #e07d3c !important; }
        .cafe-card:hover { transform: translateY(-6px) !important; border-color: rgba(200,95,32,0.35) !important; box-shadow: 0 20px 40px rgba(200,95,32,0.15) !important; }
        .menu-card:hover { border-color: rgba(200,95,32,0.3) !important; background: rgba(200,95,32,0.06) !important; }
        .add-btn:hover { background: #a04718 !important; transform: scale(1.05) !important; }
        .input-f:focus { border-color: #c85f20 !important; outline: none; background: rgba(200,95,32,0.06) !important; }
        .pay-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 15px 40px rgba(200,95,32,0.5) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,95,32,0.3); border-radius: 2px; }
      `}</style>

      {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarCollapsed ? '70px' : '240px',
        backgroundColor: C.sidebar,
        borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'sticky', top: 0, height: '100vh',
        zIndex: 50, flexShrink: 0, overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>☕</span>
            {!sidebarCollapsed && <span style={{ fontWeight: '800', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>SipSpot</span>}
          </div>
          {!sidebarCollapsed && (
            <div onClick={() => setSidebarCollapsed(true)} style={{ cursor: 'pointer', color: C.muted, fontSize: '1rem', padding: '0.25rem' }}>◀</div>
          )}
        </div>
        {sidebarCollapsed && (
          <div onClick={() => setSidebarCollapsed(false)} style={{ padding: '0.75rem', textAlign: 'center', cursor: 'pointer', color: C.muted, borderBottom: `1px solid ${C.border}` }}>▶</div>
        )}

        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => (
            <div key={item.id} className="nav-item" onClick={() => {
              if (item.id === 'booktable') { setBookingModal(true) }
              else { setActiveSection(item.id); setSelectedCafe(null) }
            }} style={{
              display: 'flex', alignItems: 'center', gap: '0.875rem',
              padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
              background: activeSection === item.id ? 'rgba(200,95,32,0.12)' : 'transparent',
              color: activeSection === item.id ? C.primaryLight : C.muted,
              border: `1px solid ${activeSection === item.id ? 'rgba(200,95,32,0.2)' : 'transparent'}`,
              transition: 'all 0.2s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              fontWeight: activeSection === item.id ? '600' : '400',
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{item.label}</span>}
            </div>
          ))}

          <div className="nav-item" onClick={() => setCartOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: '0.875rem',
            padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
            color: C.muted, transition: 'all 0.2s', position: 'relative',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
          }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🛒</span>
            {!sidebarCollapsed && <span style={{ fontSize: '0.875rem' }}>Cart</span>}
            {cartCount > 0 && (
              <div style={{
                position: 'absolute', top: '0.5rem', right: sidebarCollapsed ? '0.5rem' : '1rem',
                width: '18px', height: '18px', borderRadius: '50%',
                background: C.primary, color: '#fff', fontSize: '0.68rem',
                fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{cartCount}</div>
            )}
          </div>
        </nav>

        <div style={{ padding: '1rem 0.75rem', borderTop: `1px solid ${C.border}` }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>👤</div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.username}</div>
                <div style={{ fontSize: '0.7rem', color: C.muted }}>Customer</div>
              </div>
            </div>
          )}
          <div className="nav-item" onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer',
            color: '#f87171', transition: 'all 0.2s',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🚪</span>
            {!sidebarCollapsed && <span style={{ fontSize: '0.875rem' }}>Logout</span>}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>

        <div style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(26,15,10,0.9)', backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${C.border}`,
          padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.1rem' }}>
              {activeSection === 'home' && (selectedCafe ? selectedCafe.name : 'Explore Cafés')}
              {activeSection === 'bookings' && 'My Bookings'}
              {activeSection === 'orders' && 'My Orders'}
              {activeSection === 'profile' && 'My Profile'}
            </h1>
            <p style={{ color: C.muted, fontSize: '0.78rem' }}>
              {activeSection === 'home' && !selectedCafe && `${filteredCafes.length} cafés available`}
              {activeSection === 'home' && selectedCafe && selectedCafe.location}
              {activeSection === 'bookings' && `${MY_BOOKINGS.length} bookings`}
              {activeSection === 'orders' && `${MY_ORDERS.length} orders`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div onClick={() => setCartOpen(true)} style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: '1.2rem' }}>🛒</span>
              {cartCount > 0 && (
                <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: C.primary, color: '#fff', fontSize: '0.68rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</div>
              )}
            </div>
            <div style={{ fontSize: '0.875rem', color: C.muted }}>
              Hello, <span style={{ color: C.primaryLight, fontWeight: '600' }}>{user?.username} 👋</span>
            </div>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>

          {/* ── HOME: CAFE LIST ──────────────────────────────────────── */}
          {activeSection === 'home' && !selectedCafe && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div style={{ marginBottom: '2rem', position: 'relative', maxWidth: '400px' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
                <input className="input-f" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search cafés or locations..."
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: '0.875rem', border: `1.5px solid ${C.border}`, background: C.card, color: C.text, fontSize: '0.9rem', boxSizing: 'border-box', transition: 'all 0.2s' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { icon: '🏪', label: 'Total Cafés', value: CAFES.length },
                  { icon: '✅', label: 'Open Now', value: CAFES.filter(c => c.open).length },
                  { icon: '📅', label: 'My Bookings', value: MY_BOOKINGS.length },
                  { icon: '🍽️', label: 'My Orders', value: MY_ORDERS.length },
                ].map((s, i) => (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: C.gold }}>{s.value}</div>
                      <div style={{ fontSize: '0.75rem', color: C.muted }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {filteredCafes.map(cafe => (
                  <div key={cafe.id} className="cafe-card" onClick={() => { setSelectedCafe(cafe); setActiveCategory('All') }} style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ height: '140px', background: `linear-gradient(135deg, rgba(200,95,32,0.15), rgba(212,168,67,0.1))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                      {cafe.image}
                      <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(200,95,32,0.85)', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>{cafe.tag}</div>
                      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: cafe.open ? 'rgba(74,222,128,0.85)' : 'rgba(248,113,113,0.85)', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>
                        {cafe.open ? '● Open' : '● Closed'}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontWeight: '700', fontSize: '1rem' }}>{cafe.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(212,168,67,0.1)', borderRadius: '0.5rem', padding: '0.2rem 0.5rem' }}>
                          <span style={{ color: C.gold, fontSize: '0.8rem' }}>★</span>
                          <span style={{ color: C.gold, fontSize: '0.8rem', fontWeight: '700' }}>{cafe.rating}</span>
                        </div>
                      </div>
                      <div style={{ color: C.muted, fontSize: '0.8rem', marginBottom: '0.35rem' }}>📍 {cafe.location}</div>
                      <div style={{ color: C.muted, fontSize: '0.8rem', marginBottom: '1rem' }}>🍽️ {cafe.cuisine} · {cafe.reviews} reviews</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={e => { e.stopPropagation(); setSelectedCafe(cafe); setActiveCategory('All') }} style={{ flex: 1, padding: '0.6rem', borderRadius: '0.625rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>
                          View Menu
                        </button>
                        <button onClick={e => { e.stopPropagation(); setBookingModal(true) }} style={{ padding: '0.6rem 0.875rem', borderRadius: '0.625rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.text, fontSize: '0.82rem', cursor: 'pointer' }}>
                          📅 Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CAFE MENU PAGE ───────────────────────────────────────── */}
          {activeSection === 'home' && selectedCafe && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              <div onClick={() => setSelectedCafe(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.muted, cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.875rem' }}
                onMouseEnter={e => e.currentTarget.style.color = C.primaryLight}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >← Back to Cafés</div>

              <div style={{ background: `linear-gradient(135deg, rgba(200,95,32,0.12), rgba(212,168,67,0.06))`, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '1.75rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ fontSize: '4rem' }}>{selectedCafe.image}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{selectedCafe.name}</h2>
                    <span style={{ background: 'rgba(200,95,32,0.15)', color: C.primaryLight, fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>{selectedCafe.tag}</span>
                    <span style={{ background: selectedCafe.open ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)', color: selectedCafe.open ? '#4ade80' : '#f87171', fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '0.5rem' }}>{selectedCafe.open ? '● Open' : '● Closed'}</span>
                  </div>
                  <div style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '0.35rem' }}>📍 {selectedCafe.location} · 🍽️ {selectedCafe.cuisine}</div>
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span style={{ color: C.gold, fontSize: '0.85rem', fontWeight: '600' }}>★ {selectedCafe.rating} ({selectedCafe.reviews} reviews)</span>
                    <span style={{ color: C.muted, fontSize: '0.85rem' }}>🪑 {selectedCafe.tables} tables</span>
                  </div>
                </div>
                <button onClick={() => setBookingModal(true)} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                  📅 Book Table
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    padding: '0.45rem 1.1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                    background: activeCategory === cat ? 'linear-gradient(135deg, #c85f20, #e07d3c)' : 'rgba(255,255,255,0.05)',
                    color: activeCategory === cat ? '#fff' : C.muted,
                    fontSize: '0.82rem', fontWeight: activeCategory === cat ? '700' : '400',
                    transition: 'all 0.2s'
                  }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {filteredMenu.map(item => {
                  const inCart = cart.find(c => c.id === item.id)
                  return (
                    <div key={item.id} className="menu-card" style={{
                      background: C.card, border: `1px solid ${C.border}`,
                      borderRadius: '1rem', padding: '1.25rem', transition: 'all 0.2s'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '0.75rem', background: 'rgba(200,95,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{item.emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.name}</div>
                          <div style={{ color: C.muted, fontSize: '0.78rem', marginBottom: '0.35rem' }}>{item.desc}</div>
                          <span style={{ background: 'rgba(255,255,255,0.05)', color: C.muted, fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '0.4rem' }}>{item.category}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: C.gold }}>₹{item.price}</span>
                        {inCart ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', border: `1px solid rgba(200,95,32,0.3)`, color: C.primaryLight, fontWeight: '700', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                            <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{inCart.qty}</span>
                            <button onClick={() => addToCart(item)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', border: `1px solid rgba(200,95,32,0.3)`, color: C.primaryLight, fontWeight: '700', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                          </div>
                        ) : (
                          <button className="add-btn" onClick={() => addToCart(item)} style={{ padding: '0.45rem 1rem', borderRadius: '0.625rem', background: C.primary, color: '#fff', border: 'none', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── MY BOOKINGS ──────────────────────────────────────────── */}
          {activeSection === 'bookings' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '700px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Your upcoming bookings</h2>
                <button onClick={() => setBookingModal(true)} style={{ padding: '0.6rem 1.25rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
                  + New Booking
                </button>
              </div>
              {MY_BOOKINGS.map(b => {
                const sc = statusColor(b.status)
                return (
                  <div key={b.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>☕ {b.cafe}</h3>
                        <div style={{ color: C.muted, fontSize: '0.82rem' }}>📅 {b.date} · 🕐 {b.time}</div>
                      </div>
                      <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: '600' }}>{b.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', color: C.muted, fontSize: '0.82rem' }}>
                      <span>🪑 {b.table}</span>
                      <span>👥 {b.guests} guests</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── MY ORDERS ────────────────────────────────────────────── */}
          {activeSection === 'orders' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '700px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Your order history</h2>
              {MY_ORDERS.map(o => {
                const sc = statusColor(o.status)
                return (
                  <div key={o.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>☕ {o.cafe}</h3>
                        <div style={{ color: C.muted, fontSize: '0.82rem' }}>📅 {o.date}</div>
                      </div>
                      <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.78rem', fontWeight: '600' }}>{o.status}</span>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      {o.items.map((item, i) => (
                        <span key={i} style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', color: C.muted, borderRadius: '0.5rem', padding: '0.2rem 0.6rem', fontSize: '0.78rem', marginRight: '0.5rem', marginBottom: '0.4rem' }}>🍽️ {item}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: C.gold, fontWeight: '800', fontSize: '1rem' }}>₹{o.total}</span>
                      <button style={{ padding: '0.45rem 1rem', borderRadius: '0.625rem', background: 'rgba(200,95,32,0.1)', border: `1px solid rgba(200,95,32,0.2)`, color: C.primaryLight, fontSize: '0.8rem', cursor: 'pointer' }}>Reorder</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── PROFILE ──────────────────────────────────────────────── */}
          {activeSection === 'profile' && (
            <div style={{ animation: 'fadeUp 0.5s ease', maxWidth: '600px' }}>
              <div style={{ background: `linear-gradient(135deg, rgba(200,95,32,0.12), rgba(212,168,67,0.06))`, border: `1px solid ${C.border}`, borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(200,95,32,0.2)', border: `3px solid rgba(200,95,32,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>👤</div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.25rem' }}>{user?.username}</h2>
                <div style={{ display: 'inline-block', background: 'rgba(200,95,32,0.12)', border: '1px solid rgba(200,95,32,0.2)', color: C.primaryLight, borderRadius: '2rem', padding: '0.25rem 0.875rem', fontSize: '0.78rem', fontWeight: '600' }}>Customer</div>
              </div>
              {[
                { label: 'Account Details', items: [['Username', user?.username], ['Role', 'Customer'], ['Member since', '2025']] },
                { label: 'Activity', items: [['Total Bookings', MY_BOOKINGS.length], ['Total Orders', MY_ORDERS.length], ['Favourite Café', 'Brew & Co']] },
              ].map((section, si) => (
                <div key={si} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '1rem', color: C.primaryLight }}>{section.label}</h3>
                  {section.items.map(([key, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: i < section.items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.muted, fontSize: '0.875rem' }}>{key}</span>
                      <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
              <button onClick={handleLogout} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.875rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CART DRAWER ──────────────────────────────────────────────── */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '380px',
            background: '#1a0f0a', borderLeft: `1px solid ${C.border}`,
            display: 'flex', flexDirection: 'column',
            animation: 'cartSlide 0.3s ease'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontWeight: '800', fontSize: '1.1rem' }}>🛒 Your Cart</h2>
                <p style={{ color: C.muted, fontSize: '0.78rem', marginTop: '0.2rem' }}>{cartCount} items</p>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>×</button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '1.25rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                  <p style={{ color: C.muted, fontSize: '0.875rem' }}>Your cart is empty</p>
                  <p style={{ color: C.muted, fontSize: '0.8rem', marginTop: '0.5rem' }}>Browse cafés and add items!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 0', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '0.625rem', background: 'rgba(200,95,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.2rem' }}>{item.name}</div>
                      <div style={{ color: C.gold, fontSize: '0.82rem', fontWeight: '700' }}>₹{item.price}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, -1)} style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(200,95,32,0.15)', border: `1px solid rgba(200,95,32,0.25)`, color: C.primaryLight, fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ fontWeight: '700', minWidth: '18px', textAlign: 'center', fontSize: '0.875rem' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(200,95,32,0.15)', border: `1px solid rgba(200,95,32,0.25)`, color: C.primaryLight, fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ color: C.muted }}>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>₹{cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ color: C.muted }}>Taxes (5%)</span>
                  <span style={{ fontWeight: '600' }}>₹{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div style={{ height: '1px', background: C.border, margin: '0.875rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontWeight: '700' }}>Total</span>
                  <span style={{ fontWeight: '800', color: C.gold, fontSize: '1.1rem' }}>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                </div>

                {/* ── PROCEED TO PAYMENT BUTTON ── */}
                <button
                  className="pay-btn"
                  onClick={handleProceedToPayment}
                  style={{
                    width: '100%', padding: '0.9rem',
                    borderRadius: '0.875rem',
                    background: 'linear-gradient(135deg, #c85f20, #e07d3c)',
                    color: '#fff', border: 'none', fontWeight: '700',
                    fontSize: '1rem', cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(200,95,32,0.35)',
                    transition: 'all 0.3s ease',
                    marginBottom: '0.5rem'
                  }}
                >
                  💳 Pay ₹{cartTotal + Math.round(cartTotal * 0.05)} →
                </button>

                <button onClick={() => setCart([])} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.875rem', background: 'transparent', color: C.muted, border: 'none', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BOOKING MODAL ────────────────────────────────────────────── */}
      {bookingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setBookingModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }} />
          <div style={{ position: 'relative', background: '#1f0f08', border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '440px', animation: 'fadeUp 0.3s ease' }}>
            <button onClick={() => setBookingModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📅</div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.3rem' }}>Book a Table</h2>
              <p style={{ color: C.muted, fontSize: '0.82rem' }}>
                {selectedCafe ? `at ${selectedCafe.name}` : 'Choose your preferred café and time'}
              </p>
            </div>
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <div style={{ color: '#4ade80', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Booking Confirmed!</div>
                <p style={{ color: C.muted, fontSize: '0.85rem' }}>Check your email for confirmation details.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                {[
                  { label: 'Select Date', type: 'date', key: 'date' },
                  { label: 'Preferred Time', type: 'time', key: 'time' },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: '500', color: C.muted }}>{f.label}</label>
                    <input className="input-f" type={f.type} required
                      value={bookingForm[f.key]} onChange={e => setBookingForm({ ...bookingForm, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${C.border}`, background: 'rgba(255,255,255,0.04)', color: C.text, fontSize: '0.9rem', boxSizing: 'border-box', colorScheme: 'dark' }} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: '500', color: C.muted }}>Guests</label>
                    <select className="input-f" value={bookingForm.guests} onChange={e => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${C.border}`, background: '#1a0f0a', color: C.text, fontSize: '0.9rem', boxSizing: 'border-box' }}>
                      {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: '500', color: C.muted }}>Table No.</label>
                    <input className="input-f" placeholder="e.g. Table 3" value={bookingForm.tableNo}
                      onChange={e => setBookingForm({ ...bookingForm, tableNo: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${C.border}`, background: 'rgba(255,255,255,0.04)', color: C.text, fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.9rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #c85f20, #e07d3c)', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 25px rgba(200,95,32,0.35)' }}>
                  Confirm Booking →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}