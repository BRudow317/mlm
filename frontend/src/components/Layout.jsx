import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Truck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md h-16 flex items-center justify-between px-4">
        
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-miller-yellow">
            <Truck />
            <span>Miller Excavation</span>
          </div>
        </div>

        {/* Dark/Light Mode Toggle Switch */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
        </button>
      </header>

      <div className="flex flex-1 relative">
        {/* --- LEFT SIDE NAVIGATION BAR --- */}
        {/* We use a transform translate to slide it in/out */}
        <aside 
          className={`
            fixed inset-y-0 left-0 top-16 z-40 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:block 
            /* On Large screens (lg), sidebar is always visible (static). Remove lg: classes if you want it toggleable on desktop too. */
          `}
        >
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile click
                className={`p-3 rounded-lg transition-colors font-medium ${
                  location.pathname === item.path 
                    ? 'bg-miller-yellow text-black' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* This is where the page content renders */}
        </main>
      </div>
    </div>
  );
};

export default Layout;