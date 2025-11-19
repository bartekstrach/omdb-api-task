import { useEffect, useState } from 'react';

import {
    HeartIcon as HeartIconOutlined,
    InformationCircleIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

import { MovieShortInfo } from '../../types';
import { addToFavorites, isFavorite, removeFromFavorites } from '../../utils/favorites';

interface Props {
    movieInfo: MovieShortInfo;
}

export const MovieListItem = ({ movieInfo }: Props) => {
    const { id } = movieInfo;

    const [isFav, setIsFav] = useState(isFavorite(id));

    useEffect(() => {
        setIsFav(isFavorite(id));
    }, [id]);

    const handleFavorite = () => {
        if (isFav) {
            removeFromFavorites(id);
        } else {
            addToFavorites(id);
        }

        setIsFav(!isFav);
    };

    return (
        <div className="grid grid-cols-[auto_90px_1fr_auto_auto_auto] border border-gray-700 min-h-[100px] items-center hover:bg-gray-100 space-x-4">
            <button
                className="ml-4 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                onClick={handleFavorite}
            >
                {isFav ? (
                    <HeartIcon className="h-6 w-6 text-gray-900" />
                ) : (
                    <HeartIconOutlined className="hover:fill-current h-6 w-6 text-gray-900" />
                )}
            </button>
            <img src={movieInfo.poster} className="max-h-[100px]" />
            <div className="min-w-0 flex flex-col">
                <h3 className="font-semibold truncate">{movieInfo.title}</h3>
                <span>{movieInfo.year}</span>
            </div>
            <div className="flex items-center space-x-1">
                <StarIcon className="h-6 w-6 text-gray-900" />
                <span className="font-semibold">7.0</span>
                <span>(245k)</span>
            </div>
            <button
                className="mr-4 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label="More info"
            >
                <InformationCircleIcon className="h-6 w-6 text-gray-900" />
            </button>
        </div>
    );
};
