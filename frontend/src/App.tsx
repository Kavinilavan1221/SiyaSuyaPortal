import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Main Site
import MainLayout from './app/(main)/layout';
import HomePage from './app/(main)/page';
import AboutPage from './app/(main)/about/page';
import ContactPage from './app/(main)/contact/page';
import ProductsPage from './app/(main)/products/page';
import InquiryPage from './app/(main)/inquiry/page';

// Admin Site
import AdminLayout from './app/admin/layout';
import AdminDashboard from './app/admin/dashboard/page';
import AdminProducts from './app/admin/products/page';
import AdminInquiries from './app/admin/inquiries/page';
import AdminLogin from './app/admin/login/page';
import AdminSignup from './app/admin/signup/page';
import AdminForgotPassword from './app/admin/forgot-password/page';

function App() {
  return (
    <Router>
      <Routes>
        {/* Entry Point: Directly open the Login page on root / */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* Main Site Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Route>

        {/* Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

        {/* Protected Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inquiries" element={<AdminInquiries />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
