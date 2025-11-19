import { HeartIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/outline';

import { MovieShortInfo } from "../../types/omdb.types";

interface Props {
    movieInfo: MovieShortInfo;
}

export const MovieListItem = ({ movieInfo }: Props) => {

    return (
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
    );
};
