import { useState } from 'react';
/* hide scrollbar utility */
const style = document.createElement('style');
style.innerHTML = `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`;
document.head.appendChild(style);

import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MlmLogo from '../assets/MlmLogo.jpg';
import MlmFlag from '../assets/MlmFlag.jpg';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Account', path: '/account' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 h-16 flex items-center">
        
        <div className="flex items-center justify-between w-full px-4">

          {/* Top Nav Links */}
          <nav className="w-full">
            <ul className="flex items-center gap-2 mx-auto overflow-x-auto snap-x snap-mandatory no-scrollbar justify-center"
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`h-10 min-w-[100px] px-3 inline-flex items-center justify-center rounded-md font-medium transition-colors snap-start ${
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


      </header>

      <div className="flex flex-1">


        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white/60 dark:bg-gray-800/60 rounded-xl shadow-xl p-6 backdrop-blur-sm">

            <div className="flex items-center gap-4 mb-4 h-12">
              <div className="logoContainer flex items-center justify-center bg-white/70 dark:bg-gray-800/70 rounded-md border border-gray-200 dark:border-gray-700 h-full aspect-square">
                <img src={MlmLogo} alt="Miller Land Management Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              </div>
              <div className="flex-1 flex items-center justify-center text-center">
                {/* header text area; page content will sit below */}
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;