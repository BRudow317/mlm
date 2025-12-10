import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Account from './pages/Account';
import AccountDetails from './pages/AccountDetails';
import Owner from './pages/Owner';
import Support from './pages/Support';
import RequestQuote from './pages/RequestQuote';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="account" element={<Account />} />
            <Route path="account/details" element={<AccountDetails />} />
            <Route path="owner" element={<Owner />} />
            <Route path="support" element={<Support />} />
            <Route path="quote" element={<RequestQuote />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;