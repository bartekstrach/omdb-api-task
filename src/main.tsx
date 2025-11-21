// Disabling StrictMode to avoid calling fetch twice
// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './style.css';
import { ErrorBoundary } from './components';
import { FavoritesProvider } from './contexts/favorites';
import AppRoutes from './pages/routes.tsx';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <ErrorBoundary>
        <FavoritesProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </FavoritesProvider>
    </ErrorBoundary>
    // </StrictMode>
);
