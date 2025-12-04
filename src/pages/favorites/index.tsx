import { useCallback, useEffect, useState } from 'react';

import { MovieList, Pagination, TitleInput } from '../../components';
import { useFavorites } from '../../hooks';
import { MovieShortInfo } from '../../types';

const MAX_ITEMS_PER_PAGE = 10;

export const FavoritesPage = () => {
    const [searchBox, setSearchBox] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [paginatedMovies, setPaginatedMovies] = useState<MovieShortInfo[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
    const [pageError, setPageError] = useState<string | undefined>(undefined);

    const { error: contextError, getPaginatedFavorites } = useFavorites();

    const fetchPaginatedData = useCallback(async () => {
        setIsLoadingPage(true);
        setPageError(undefined);

        try {
            const result = await getPaginatedFavorites({
                page: currentPage,
                pageSize: MAX_ITEMS_PER_PAGE,
                searchTerm: searchBox,
            });

            const { data, total, totalPages } = result;
            setPaginatedMovies(data);
            setTotalPages(totalPages);
            setTotalRecords(total);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load favorites';
            setPageError(message);
            console.error('Failed to fetch paginated favorites', error);
        } finally {
            setIsLoadingPage(false);
        }
    }, [currentPage, getPaginatedFavorites, searchBox]);

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (value: string) => {
        setSearchBox(value);
        setCurrentPage(1);
    };

    const displayError = contextError || pageError;

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2">
                <TitleInput
                    onChange={handleSearchChange}
                    placeholder="Filter by title..."
                    value={searchBox}
                />

                {totalRecords > 0 && (
                    <span className="truncate text-sm md:text-base">
                        Found {totalRecords} {totalRecords === 1 ? 'record' : 'records'}
                    </span>
                )}
            </div>

            <MovieList
                error={displayError}
                hasSearched
                isLoading={isLoadingPage}
                movies={paginatedMovies}
            />

            {totalRecords > 0 && totalPages > 1 && !isLoadingPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};
