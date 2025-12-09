import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import MlmLogo from '../assets/MlmLogo.jpg';
import MlmFlag from '../assets/MlmFlag.jpg';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Account', path: '/account' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100 transition-colors duration-300 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${MlmFlag})` }}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md h-16 flex items-center justify-center px-4">
        
        <div className="flex items-center gap-6">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-miller-yellow">
            <img src={MlmLogo} alt="Miller Excavation Logo" className="h-8 w-8 rounded-sm" />
            <span>Miller Excavation</span>
          </div>
          {/* Top Nav Links */}
          <nav className="flex-1">
            <ul className="flex items-center justify-center gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-miller-yellow text-black'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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


        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl p-6 backdrop-blur-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;