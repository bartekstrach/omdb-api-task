import { useState } from 'react';

import { FunnelIcon } from '@heroicons/react/24/outline';

import { MovieList } from '../../components/movie-list';
import { SearchBar } from '../../components/search-bar';
import omdbService from '../../services/omdb';
import { MoviesSearchResult } from '../../types';

export const MainPage = () => {
    const [title, setTitle] = useState<string>('');
    const [searchMovieResponse, setSearchMovieResponse] = useState<MoviesSearchResult>();

    const searchMovies = async () => {
        console.log('searching...');
        const response = await omdbService.getMovies({ s: title.trim() });
        console.log('api response');
        console.log(searchMovieResponse);
        setSearchMovieResponse(response);
    };

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar
                onChange={setTitle}
                onSearch={searchMovies}
                value={title}
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
