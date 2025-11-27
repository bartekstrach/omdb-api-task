import { useEffect, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { MovieList, Pagination, TitleInput, TypeDropdown, YearInput } from '../../components';
import { useMovieSearchParams } from '../../hooks';
import omdbService from '../../services/omdb';
import { MoviesSearchResult, MovieType } from '../../types';

const defaultSearchResult: MoviesSearchResult = {
    currentPage: 1,
    items: [],
    pages: 0,
    totalResults: 0,
};

export const MainPage = () => {
    const { params, updateParams } = useMovieSearchParams();
    const { q, page: currentPage, type: currentType, year: currentYear } = params;

    const [searchBox, setSearchBox] = useState<string>(q);
    const [selectedType, setSelectedType] = useState<MovieType | undefined>(currentType);
    const [selectedYear, setSelectedYear] = useState<string>(currentYear);

    const [searchResults, setSearchResults] = useState<{
        data?: MoviesSearchResult;
        error?: string;
        isLoading: boolean;
    }>({
        data: defaultSearchResult,
        isLoading: false,
    });

    useEffect(() => {
        let cancelled = false;

        const performSearch = async () => {
            if (!q.trim() || currentPage < 1) {
                setSearchResults({
                    data: defaultSearchResult,
                    isLoading: false,
                });
                return;
            }

            setSearchResults(prev => ({
                ...prev,
                isLoading: true,
            }));

            try {
                const data = await omdbService.getMovies({
                    s: q,
                    page: currentPage,
                    type: currentType,
                    y: currentYear || undefined,
                });

                if (!cancelled) {
                    setSearchResults({ data, isLoading: false });
                }
            } catch (error) {
                if (!cancelled) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'An unexpected error occurred during fetching movies';
                    setSearchResults({
                        error: message,
                        isLoading: false,
                    });
                }
            }
        };

        performSearch();

        return () => {
            cancelled = true;
        };
    }, [q, currentPage, currentType, currentYear]);

    const searchMovies = async () => {
        const trimmed = searchBox.trim();

        if (!trimmed) {
            updateParams({ q: '', page: 1, type: undefined, year: undefined });
            return;
        }

        updateParams({
            q: trimmed,
            page: 1,
            type: selectedType,
            year: selectedYear,
        });
    };

    const handlePageChange = (newPage: number) => {
        updateParams({ page: newPage });
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
                    <TitleInput
                        label="Title"
                        placeholder="Search by title..."
                        onChange={setSearchBox}
                        value={searchBox}
                    />

                    <TypeDropdown onChange={setSelectedType} value={selectedType} />

                    <YearInput
                        value={selectedYear}
                        onChange={setSelectedYear}
                        minYear={1900}
                        maxYear={2025}
                    />

                    <button
                        className="flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                        disabled={searchResults.isLoading}
                        onClick={searchMovies}
                    >
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
                        <span>Search</span>
                    </button>
                </div>

                {searchResults.data?.totalResults && searchResults.data.totalResults > 0 ? (
                    <span>
                        Found {searchResults.data.totalResults}{' '}
                        {searchResults.data.totalResults === 1 ? 'record' : 'records'}
                    </span>
                ) : null}
            </div>

            <MovieList
                error={searchResults.error}
                hasSearched={!!q.trim()}
                isLoading={searchResults.isLoading}
                movies={searchResults.data?.items || []}
            />

            {searchResults.data?.totalResults && searchResults.data?.totalResults > 0
                ? !searchResults.isLoading && (
                      <Pagination
                          currentPage={currentPage}
                          totalPages={searchResults.data.pages || 1}
                          onPageChange={handlePageChange}
                      />
                  )
                : null}
        </div>
    );
};
