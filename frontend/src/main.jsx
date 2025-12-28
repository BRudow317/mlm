import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './app/App';
import { Home, Services, Knowledge, Account } from './pages';
import { ThemeProvider } from './theme/ThemeContext';
import './theme/index.css';

// Page Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Knowledge', path: '/knowledge' },
  { name: 'Account', path: '/account' },
];

// Define route paths that display to user as constants for consistency.
export const ROUTES = {
  HOME: '/',
  KNOWLEDGE: '/knowledge',
  SERVICES: '/services',
  ACCOUNT: '/account',
  LOGIN: '/account/login',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path={ROUTES.SERVICES} element={<Services />} />
            <Route path={ROUTES.KNOWLEDGE} element={<Knowledge />} />
            <Route path={ROUTES.ACCOUNT} element={<Account />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
