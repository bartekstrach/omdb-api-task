import { Routes, Route } from 'react-router';

import { FavoritesPage } from './favorites';
import { MainPage } from './main-page';
import { MovieDetailsPage } from './movie-details';
import { GlobalLayout } from '../layouts/global';

const AppRoutes = () => (
    <Routes>
        <Route element={<GlobalLayout />}>
            <Route index element={<MainPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Route>
    </Routes>
);

export default AppRoutes;
