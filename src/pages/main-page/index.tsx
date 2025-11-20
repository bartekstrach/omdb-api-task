import { useActionState, useEffect, useState, useTransition } from 'react';

import { useSearchParams } from 'react-router';

import { MovieList } from '../../components/movie-list';
import { SearchBar } from '../../components/search-bar';
import omdbService from '../../services/omdb';
import { MoviesSearchResult, MovieType } from '../../types';

export const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') ?? '';
    const currentPage = parseInt(searchParams.get('page') ?? '1');
    const currentType = searchParams.get('type') ?? '';

    const [searchBox, setSearchBox] = useState<string>(q);
    const [selectedType, setSelectedType] = useState<MovieType | undefined>(
        currentType as MovieType | undefined
    );

    const [isTransitioning, startTransition] = useTransition();

    const [searchMovieResponse, runSearchAction, isSearching] = useActionState<
        MoviesSearchResult | undefined,
        { page: number; title: string; type?: MovieType }
    >(async (_prev, { page, title, type }) => {
        if (!title || page < 1) {
            return undefined;
        }

        return await omdbService.getMovies({ s: title, page, type });
    }, undefined);

    const searchMovies = async () => {
        const trimmed = searchBox.trim();
        const urlSearchParams = new URLSearchParams(searchParams);

        startTransition(() => {
            if (!trimmed) {
                urlSearchParams.delete('q');
                setSearchParams(urlSearchParams);
                return;
            }

            urlSearchParams.set('q', trimmed);

            if (selectedType) {
                urlSearchParams.set('type', selectedType);
            } else {
                urlSearchParams.delete('type');
            }

            setSearchParams(urlSearchParams);
            runSearchAction({ page: currentPage, title: trimmed, type: selectedType });
        });
    };

    const handlePageChange = (newPage: number) => {
        startTransition(() => {
            const urlSearchParams = new URLSearchParams(searchParams);
            urlSearchParams.set('page', newPage.toString());
            setSearchParams(urlSearchParams);

            runSearchAction({ page: newPage, title: q, type: selectedType });
        });
    };

    const handleTypeDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === 'all') {
            setSelectedType(undefined);
        } else if (['movie', 'series', 'episode'].includes(value)) {
            setSelectedType(value as MovieType);
        }
    };

    useEffect(() => {
        const trimmed = q.trim();

        if (!trimmed) {
            return;
        }

        startTransition(() => {
            runSearchAction({ page: currentPage, title: trimmed, type: selectedType });
        });
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar
                isLoading={isSearching || isTransitioning}
                onChange={setSearchBox}
                onSearch={searchMovies}
                value={searchBox}
            />
            <div className="flex items-center justify-between">
                {/* Type Dropdown */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="type" className="font-semibold">
                        Type
                    </label>
                    <select
                        id="type"
                        value={selectedType}
                        onChange={handleTypeDropdownChange}
                        className="border border-gray-700 px-4 py-2"
                    >
                        <option value="all">All</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                </div>

                {searchMovieResponse?.totalResults && (
                    <>Found {searchMovieResponse.totalResults} records</>
                )}
            </div>
            <MovieList movies={searchMovieResponse?.items || []} />

            {searchMovieResponse?.totalResults && (
                <div className="flex justify-center items-center gap-8">
                    <button
                        className="bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        {currentPage} of {searchMovieResponse?.pages}
                    </span>
                    <button
                        className="bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                        disabled={currentPage >= (searchMovieResponse?.pages || 1)}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
