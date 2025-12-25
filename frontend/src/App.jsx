import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeDomSync } from './themes/ThemeContext';
import Layout from './layouts/Layout';
import { Home, Services, Knowledge, Account } from './pages';
import { ROUTES } from './api';
import './themes/Styles/GlobalTokens.css';

createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <ThemeProvider>
      <ThemeDomSync />
      <BrowserRouter>
        <Routes>
            {/* Parent Route controls the Layout */}
            <Route path="/" element={<Layout />}>
               {/* Index element controls the default page */}
               <Route index element={<Home />} />
               {/* These routes display to the user and map to your different pages. */}
               <Route path={ROUTES.HOME} element={<Home />} />
               <Route path={ROUTES.SERVICES} element={<Services />} />
               <Route path={ROUTES.KNOWLEDGE} element={<Knowledge />} />
               <Route path={ROUTES.ACCOUNT} element={<Account />} />
            </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider> 
    </React.StrictMode>
  </>
);
