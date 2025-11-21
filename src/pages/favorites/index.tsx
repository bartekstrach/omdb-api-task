import { useMemo, useState } from 'react';

import { MovieList, Pagination, TitleInput } from '../../components';
import { useFavorites } from '../../hooks';

const MAX_ITEMS_PER_PAGE = 10;

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { error, favorites, isLoading } = useFavorites();

    const filteredFavorites = useMemo(
        () =>
            favorites.filter(movie => movie.title.toLowerCase().includes(searchBox.toLowerCase())),
        [favorites, searchBox]
    );

    const pages = useMemo(
        () =>
            filteredFavorites.length > 0
                ? Math.ceil(filteredFavorites.length / MAX_ITEMS_PER_PAGE)
                : 0,
        [filteredFavorites]
    );

    const paginatedFavorites = useMemo(() => {
        const startIndex = (currentPage - 1) * MAX_ITEMS_PER_PAGE;
        const endIndex = startIndex + MAX_ITEMS_PER_PAGE;
        return filteredFavorites.slice(startIndex, endIndex);
    }, [filteredFavorites, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (value: string) => {
        setSearchBox(value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <TitleInput
                    onChange={handleSearchChange}
                    placeholder="Filter by title..."
                    value={searchBox}
                />

                {filteredFavorites.length > 0 && (
                    <span>
                        Found {filteredFavorites.length}{' '}
                        {filteredFavorites.length === 1 ? 'record' : 'records'}
                    </span>
                )}
            </div>

            <MovieList
                error={error}
                hasSearched
                isLoading={isLoading}
                movies={paginatedFavorites}
            />

            {filteredFavorites.length > 0 && pages > 1 && !isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};
