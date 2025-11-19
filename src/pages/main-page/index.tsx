import { useEffect, useState } from 'react';

import { FunnelIcon, HeartIcon, InformationCircleIcon, MagnifyingGlassIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { fetchMovies } from '../../api/omdb';
import { SearchMoviesResponse } from '../../api/omdb.types';

export const MainPage = () => {
    const [title, setTitle] = useState<string>('');
    const [searchMovieResponse, setSearchMovieResponse] = useState<SearchMoviesResponse>();

    const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const clearSearchBar = () => { setTitle(''); };

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
            <div className='flex space-x-4'>
                <div className='flex-1 relative'>
                    <input
                        className='w-full border border-gray-700 p-2'
                        onChange={onSearchBarChange}
                        placeholder='Search by title...'
                    />
                    {title && (
                        <button
                            className='absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded'
                            onClick={clearSearchBar}
                            aria-label='Clear search'
                        >
                            <XMarkIcon className='h-5 w-5 text-gray-400' />
                        </button>
                    )}
                </div>                
                <button
                    className='flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer'
                    onClick={searchMovies}
                >
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-900' />
                    <span>Search</span>
                </button>
            </div>
            <div className='flex items-center justify-between'>
                <button
                    className='flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer'
                    // onClick={searchMovies}
                >
                    <FunnelIcon className="h-6 w-6 text-gray-900" />
                    <span>Filter</span>
                </button>
                {searchMovieResponse?.totalResults && <>Found {searchMovieResponse.totalResults} records</>}
            </div>
            <div className='flex flex-col space-y-2'>
                {searchMovieResponse?.Search?.map((movieInfo) => (
                    <div className='grid grid-cols-[auto_90px_1fr_auto_auto_auto] border border-gray-700 min-h-[100px] items-center hover:bg-gray-100 space-x-4'>
                        <button className='ml-4 hover:bg-gray-100 rounded transition-colors cursor-pointer' aria-label='Add to favorites'>
                            <HeartIcon className="hover:fill-current h-6 w-6 text-gray-900" />
                        </button>
                        <img src={movieInfo.Poster} className='max-h-[100px]' />
                        <div className='min-w-0 flex flex-col'>
                            <h3 className='font-semibold truncate'>{movieInfo.Title}</h3>
                            <span>{movieInfo.Year}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <StarIcon className="h-6 w-6 text-gray-900" />
                            <span className='font-semibold'>7.0</span>
                            <span>(245k)</span>
                        </div>
                        <button className="mr-4 hover:bg-gray-100 rounded transition-colors cursor-pointer" aria-label='More info'>
                            <InformationCircleIcon className="h-6 w-6 text-gray-900" />
                        </button>
                    </div>
                ))}
            </div>
            <p>Pagination</p>
        </div>
    );
};
