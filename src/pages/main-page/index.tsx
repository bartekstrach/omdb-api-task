import { useActionState, useEffect, useState, useTransition } from 'react';

import { FunnelIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router';

import { MovieList } from '../../components/movie-list';
import { SearchBar } from '../../components/search-bar';
import omdbService from '../../services/omdb';
import { MoviesSearchResult } from '../../types';

export const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q') ?? '';
    // const currentPage = searchParams.get('page') ?? '1';

    const [searchBox, setSearchBox] = useState<string>(q); 

    const [isTransitioning, startTransition] = useTransition();

    const [searchMovieResponse, runSearchAction, isSearching] = useActionState<MoviesSearchResult | undefined, { title: string}>(async (_prev, { title }) => {
        if (!title) {
            return undefined;
        }

        return await omdbService.getMovies({ s: title });
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
            setSearchParams(urlSearchParams);

            runSearchAction({ title: trimmed});
        });

    };

    useEffect(() => {
        const trimmed = q.trim();

        if (!trimmed) {
            return;
        }

        startTransition(() => {
            runSearchAction({ title: trimmed});
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
                <button
                    className="flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                    // onClick={searchMovies}
                >
                    <FunnelIcon className="h-6 w-6 text-gray-900" />
                    <span>Filter</span>
                </button>
                {searchMovieResponse?.totalResults && (
                    <>Found {searchMovieResponse.totalResults} records</>
                )}
            </div>
            <MovieList movies={searchMovieResponse?.items || []} />
            <p>Pagination</p>
        </div>
    );
};
