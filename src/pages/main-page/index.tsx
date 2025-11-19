import { useEffect, useState } from 'react';

import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { fetchMovies } from '../../api/omdb';
import { MovieListItem } from '../../components/movie-list-item';
import { SearchMoviesResponse } from '../../types/omdb.types';

export const MainPage = () => {
    const [title, setTitle] = useState<string>('');
    const [searchMovieResponse, setSearchMovieResponse] = useState<SearchMoviesResponse>();

    const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const clearSearchBar = () => {
        setTitle('');
    };

    const searchMovies = async () => {
        console.log('searching...');
        const response = await fetchMovies({ s: title.trim() });
        setSearchMovieResponse(response);
    };

    useEffect(() => {
        console.log('api response');
        console.log(searchMovieResponse);
    }, [searchMovieResponse]);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
                <div className="flex-1 relative">
                    <input
                        className="w-full border border-gray-700 p-2"
                        onChange={onSearchBarChange}
                        placeholder="Search by title..."
                    />
                    {title && (
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                            onClick={clearSearchBar}
                            aria-label="Clear search"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-400" />
                        </button>
                    )}
                </div>
                <button
                    className="flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                    onClick={searchMovies}
                >
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
                    <span>Search</span>
                </button>
            </div>
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
            <div className="flex flex-col space-y-2">
                {searchMovieResponse?.Search?.map(movieInfo => (
                    <MovieListItem movieInfo={movieInfo} />
                ))}
            </div>
            <p>Pagination</p>
        </div>
    );
};
