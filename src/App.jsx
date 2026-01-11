import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Home} from './pages/Home/Home';
// import { ServicesPage } from './pages/Services/Services';
import { ThemeProvider } from './context/ThemeContext';
import { BreakpointProvider } from './context/BreakpointContext';
import './theme/index.css';
import './theme/Theme2.css';
// import './theme/GlobalStyles.css';
// import { ROUTES } from './constants/ROUTES.js';
// Page Navigation Items
// export const NAV_ITEMS = [
//   { name: 'Home', path: '/' },
//   { name: 'Services', path: '/services' },
// ];

// // Define route paths that display to user as constants for consistency.
// export const ROUTES = {
//   HOME: '/',
//   SERVICES: '/services',

// };

export function App() {
  return (
    <BreakpointProvider>
    <ThemeProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </BreakpointProvider>
  
  );
}
