import { useState } from 'react';

import { MovieList } from '../../components';
import { TitleInput } from '../../components/title-input';
import { useFavorites } from '../../hooks';

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    const { favorites, isLoading } = useFavorites();

    const filteredFavorites = favorites.filter(movie =>
        movie.title.toLowerCase().includes(searchBox.toLowerCase())
    );

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <TitleInput
                    onChange={setSearchBox}
                    placeholder="Filter by title..."
                    value={searchBox}
                />

                {filteredFavorites.length && <span>Found {filteredFavorites.length} records</span>}
            </div>

            <MovieList isLoading={isLoading} movies={filteredFavorites} />
            <p>Pagination</p>
        </div>
    );
};
