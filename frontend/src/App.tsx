import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Main Site
import MainLayout from './app/(main)/layout';
import HomePage from './app/(main)/page';
import AboutPage from './app/(main)/about/page';
import ContactPage from './app/(main)/contact/page';
import ProductsPage from './app/(main)/products/page';
import InquiryPage from './app/(main)/inquiry/page';
import PrivacyPolicyPage from './app/(main)/privacy-policy/page';
import TermsAndConditionsPage from './app/(main)/terms-and-conditions/page';
import OurTeamPage from './app/(main)/our-team/page';

// Admin Site
import AdminLayout from './app/admin/layout';
import AdminDashboard from './app/admin/dashboard/page';
import AdminProducts from './app/admin/products/page';
import AdminInquiries from './app/admin/inquiries/page';
import AdminMessages from './app/admin/messages/page';
import AdminLogin from './app/admin/login/page';
import AdminSignup from './app/admin/signup/page';
import AdminForgotPassword from './app/admin/forgot-password/page';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public home page is the entry point; login is optional. */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/forgot-password" element={<AdminForgotPassword />} />

        {/* Keep legacy auth URLs working while using cleaner public URLs. */}
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />
        <Route path="/admin/signup" element={<Navigate to="/signup" replace />} />
        <Route path="/admin/forgot-password" element={<Navigate to="/forgot-password" replace />} />

        {/* Main Site Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/our-team" element={<OurTeamPage />} />
        </Route>

        {/* Protected Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
