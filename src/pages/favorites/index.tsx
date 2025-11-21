import { useMemo, useState } from 'react';

import { MovieList, TitleInput } from '../../components';
import { useFavorites } from '../../hooks';

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    const { error, favorites, isLoading } = useFavorites();

    const filteredFavorites = useMemo(
        () =>
            favorites.filter(movie => movie.title.toLowerCase().includes(searchBox.toLowerCase())),
        [favorites, searchBox]
    );

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <TitleInput
                    onChange={setSearchBox}
                    placeholder="Filter by title..."
                    value={searchBox}
                />

                {filteredFavorites.length > 0 && (
                    <span>Found {filteredFavorites.length} records</span>
                )}
            </div>

            <MovieList error={error} hasSearched isLoading={isLoading} movies={filteredFavorites} />

            <p>Pagination</p>
        </div>
    );
};
