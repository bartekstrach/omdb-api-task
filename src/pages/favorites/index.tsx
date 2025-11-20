import { useState } from 'react';

import { MovieList, SearchBar } from '../../components';
import { useFavorites } from '../../hooks';

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    const { favorites, isLoading } = useFavorites();

    const filteredFavorites = favorites.filter(movie =>
        movie.title.toLowerCase().includes(searchBox.toLowerCase())
    );

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar isLoading={isLoading} onChange={setSearchBox} value={searchBox} />
            <div className="flex items-center justify-between">
                {filteredFavorites.length && <span>Found {filteredFavorites.length} records</span>}
            </div>
            <MovieList movies={filteredFavorites} />
            <p>Pagination</p>
        </div>
    );
};
