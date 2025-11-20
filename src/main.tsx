// Disabling StrictMode to avoid calling fetch twice
// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './style.css';
import { FavoritesProvider } from './contexts/favorites';
import AppRoutes from './pages/routes.tsx';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <FavoritesProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </FavoritesProvider>
    // </StrictMode>
);
