import { useState } from 'react';

import { FunnelIcon } from '@heroicons/react/24/outline';

import { MovieList, SearchBar } from '../../components';
import { useFavorites } from '../../hooks';

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    // const [favorites, isLoading] = useFavorites();
    const { favorites, isLoading } = useFavorites();

    const filteredFavorites = favorites.filter(movie =>
        movie.title.toLowerCase().includes(searchBox.toLowerCase())
    );

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar isLoading={isLoading} onChange={setSearchBox} value={searchBox} />
            <div className="flex items-center justify-between">
                <button
                    className="flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                    // onClick={searchMovies}
                >
                    <FunnelIcon className="h-6 w-6 text-gray-900" />
                    <span>Filter</span>
                </button>
                {filteredFavorites.length && <span>Found {filteredFavorites.length} records</span>}
            </div>
            <MovieList movies={filteredFavorites} />
            <p>Pagination</p>
        </div>
    );
};
