import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Home} from './pages/Home/Home';
// import { ServicesPage } from './pages/Services/Services';
import { DualModeTest } from './features/GoogleAddrSelMap/DualModeTest';
import { ThemeProvider } from './context/ThemeContext';
import { BreakpointProvider } from './context/BreakpointContext';
import './theme/index.css';
import './theme/Theme2.css';

export function App() {
  return (
    <BreakpointProvider>
    <ThemeProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/test" element={<DualModeTest />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </BreakpointProvider>

  );
}
