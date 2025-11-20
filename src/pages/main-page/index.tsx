import { useActionState, useEffect, useState, useTransition } from 'react';

import { MovieList, Pagination, SearchBar, TypeDropdown, YearInput } from '../../components';
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
        MoviesSearchResult | undefined,
        { page: number; title: string; type: MovieType | undefined; year: string | undefined }
    >(async (_prev, { page, title, type, year }) => {
        if (!title || page < 1) {
            return undefined;
        }

        return await omdbService.getMovies({ s: title, page, type, y: year });
    }, undefined);

    const isLoading = isSearching || isTransitioning;

    const searchMovies = async () => {
        const trimmed = searchBox.trim();

        startTransition(() => {
            if (!trimmed) {
                updateParams({ q: '' });
                return;
            }

            updateParams({
                q: trimmed,
                type: selectedType,
                year: selectedYear,
            });

            runSearchAction({
                page: currentPage,
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

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar
                isLoading={isLoading}
                onChange={setSearchBox}
                onSearch={searchMovies}
                value={searchBox}
            />

            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <TypeDropdown onChange={setSelectedType} value={selectedType} />

                    <YearInput
                        value={selectedYear}
                        onChange={setSelectedYear}
                        minYear={1900}
                        maxYear={2025}
                    />
                </div>

                {searchMovieResponse?.totalResults && (
                    <>Found {searchMovieResponse.totalResults} records</>
                )}
            </div>

            <MovieList isLoading={isLoading} movies={searchMovieResponse?.items || []} />

            {searchMovieResponse?.totalResults && !isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={searchMovieResponse.pages || 1}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};
