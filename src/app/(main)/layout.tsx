import MainNav from '@/components/main-nav';
import Footer from '@/components/footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <MainNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
