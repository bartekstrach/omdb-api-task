import { useActionState, useEffect, useState, useTransition } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { MovieList, Pagination, TitleInput, TypeDropdown, YearInput } from '../../components';
import { useMovieSearchParams } from '../../hooks';
import omdbService from '../../services/omdb';
import { MoviesSearchResult, MovieType } from '../../types';

export const MainPage = () => {
    const { params, updateParams } = useMovieSearchParams();
    const { q, page: currentPage, type: currentType, year: currentYear } = params;

    const [searchBox, setSearchBox] = useState<string>(q);
    const [selectedType, setSelectedType] = useState<MovieType | undefined>(currentType);
    const [selectedYear, setSelectedYear] = useState<string>(currentYear);

    const [isTransitioning, startTransition] = useTransition();

    const [searchMovieResponse, runSearchAction, isSearching] = useActionState<
        { data?: MoviesSearchResult; error?: string },
        { page: number; title: string; type: MovieType | undefined; year: string | undefined }
    >(async (_prev, { page, title, type, year }) => {
        if (!title || page < 1) {
            return {
                data: {
                    currentPage: 1,
                    items: [],
                    pages: 0,
                    totalResults: 0,
                },
            };
        }

        try {
            const data = await omdbService.getMovies({ s: title, page, type, y: year });
            return { data };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            return { error: message };
        }
    }, {});

    const isLoading = isSearching || isTransitioning;

    const searchMovies = async () => {
        const trimmed = searchBox.trim();

        startTransition(() => {
            if (!trimmed) {
                updateParams({ q: '', page: 1, type: undefined, year: undefined });
                runSearchAction({
                    page: 1,
                    title: '',
                    type: undefined,
                    year: undefined,
                });
                return;
            }

            updateParams({
                q: trimmed,
                page: 1,
                type: selectedType,
                year: selectedYear,
            });

            runSearchAction({
                page: 1,
                title: trimmed,
                type: selectedType,
                year: selectedYear,
            });
        });
    };

    const handlePageChange = (newPage: number) => {
        startTransition(() => {
            updateParams({ page: newPage });

            runSearchAction({ page: newPage, title: q, type: selectedType, year: selectedYear });
        });
    };

    useEffect(() => {
        const trimmed = q.trim();

        if (!trimmed) {
            return;
        }

        startTransition(() => {
            runSearchAction({
                page: currentPage,
                title: trimmed,
                type: selectedType,
                year: selectedYear,
            });
        });
    }, []);

    useEffect(() => {
        if (!q) {
            startTransition(() => {
                runSearchAction({
                    page: 1,
                    title: '',
                    type: undefined,
                    year: undefined,
                });
            });
        }
    }, [q]);

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
                        disabled={isLoading}
                        onClick={searchMovies}
                    >
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
                        <span>Search</span>
                    </button>
                </div>

                {searchMovieResponse.data?.totalResults &&
                searchMovieResponse.data.totalResults > 0 ? (
                    <span>
                        Found {searchMovieResponse.data.totalResults}{' '}
                        {searchMovieResponse.data.totalResults === 1 ? 'record' : 'records'}
                    </span>
                ) : null}
            </div>

            <MovieList
                error={searchMovieResponse.error}
                hasSearched={!!q.trim()}
                isLoading={isLoading}
                movies={searchMovieResponse.data?.items || []}
            />

            {searchMovieResponse.data?.totalResults && searchMovieResponse.data?.totalResults > 0
                ? !isLoading && (
                      <Pagination
                          currentPage={currentPage}
                          totalPages={searchMovieResponse.data.pages || 1}
                          onPageChange={handlePageChange}
                      />
                  )
                : null}
        </div>
    );
};
