import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingAudioPlayer from './components/FloatingAudioPlayer'

// Public Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import DonationsPage from './pages/DonationsPage'
import DonationDetailPage from './pages/DonationDetailPage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import TeamPage from './pages/TeamPage'
import FAQPage from './pages/FAQPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'

// Admin CMS Pages
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminDonationsPage from './pages/admin/AdminDonationsPage'
import AdminPujasPage from './pages/admin/AdminPujasPage'
import AdminEventsPage from './pages/admin/AdminEventsPage'
import AdminBlogsPage from './pages/admin/AdminBlogsPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#253d46',
            color: '#fff',
            fontFamily: '"Hind Siliguri", Poppins, sans-serif',
            fontSize: '14px',
            border: '1px solid #ae4427',
          },
          success: {
            iconTheme: {
              primary: '#ae4427',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Render Public Navbar & Audio Player when not inside Admin CMS */}
      {!isAdminRoute && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/donations" element={<DonationsPage />} />
          <Route path="/donations/:id" element={<DonationDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Management Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="donations" element={<AdminDonationsPage />} />
            <Route path="pujas" element={<AdminPujasPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingAudioPlayer />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  )
}
