'use client';

import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  LogOut,
  Home,
  Fish
} from 'lucide-react';
import Logo from '@/components/logo';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/inquiries', label: 'Inquiries', icon: FileText },
];

export default function AdminLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    window.location.href = '/admin/login';
  };

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="py-6 px-4">
             <div className="flex items-center gap-2 text-primary">
               <Fish className="h-6 w-6" />
               <span className="font-headline text-lg font-bold tracking-wide">Siya Suya Admin</span>
             </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {adminNavItems.map(item => (
                <SidebarMenuItem key={item.href}>
                  <Link to={item.href}>
                    <SidebarMenuButton 
                      isActive={pathname === item.href}
                      tooltip={{
                        children: item.label,
                      }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarHeader>
             <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/">
                    <SidebarMenuButton tooltip={{ children: 'Back to Site' }}>
                      <Home />
                      <span>Back to Site</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div onClick={handleLogout} className="w-full cursor-pointer">
                  <SidebarMenuButton tooltip={{ children: 'Logout' }}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <SidebarInset className="bg-secondary/20">
          <header className="p-4 border-b bg-background/80 backdrop-blur-md flex items-center gap-4 sticky top-0 z-10">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg text-primary">Admin Dashboard</h1>
          </header>
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
