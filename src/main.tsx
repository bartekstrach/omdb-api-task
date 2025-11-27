import React, { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './style.css';
import { ErrorBoundary } from './components';
import { FavoritesProvider } from './contexts/favorites';
import AppRoutes from './pages/routes.tsx';

// Ref: https://vite.dev/guide/env-and-mode#node-env-and-modes
if (import.meta.env.DEV) {
    import('react-axe').then(axe => {
        axe.default(React, ReactDOM, 1000);
    });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <ErrorBoundary>
        <FavoritesProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </FavoritesProvider>
    </ErrorBoundary>
    </StrictMode>
);
