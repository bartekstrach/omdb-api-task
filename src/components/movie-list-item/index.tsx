import { useEffect, useState } from 'react';

import {
    HeartIcon as HeartIconOutlined,
    InformationCircleIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

import { MovieShortInfo } from '../../types';
import { addToFavorites, isFavorite, removeFromFavorites } from '../../utils/favorites';

interface Props {
    movieInfo: MovieShortInfo;
}

export const MovieListItem = ({ movieInfo }: Props) => {
    const { id, poster, title, year } = movieInfo;

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const favoriteStatus = await isFavorite(id);
            setIsFav(favoriteStatus);
        };

        fetchFavoriteStatus();
    }, [id]);

    const handleFavorite = async () => {
        if (isFav) {
            await removeFromFavorites(id);
        } else {
            await addToFavorites(movieInfo);
        }
        setIsFav(!isFav);
    };

    return (
        <div className="grid grid-cols-[auto_90px_1fr_auto_auto_auto] border border-gray-700 min-h-[100px] items-center hover:bg-gray-100 space-x-4">
            {/* Favorite */}
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

            {/* Poster */}
            <img
                alt={`${title} poster`}
                className="max-h-[100px]"
                src={poster}
            />

            {/* Info */}
            <div className="min-w-0 flex flex-col">
                <h3 className="font-semibold truncate">{title}</h3>
                <span>{year}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
                <StarIcon className="h-6 w-6 text-gray-900" />
                <span className="font-semibold">7.0</span>
                <span>(245k)</span>
            </div>

            {/* Info */}
            <Link to={`/movie/${id}`}>
                <button
                    aria-label="More info"
                    className="mr-4 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                    <InformationCircleIcon className="h-6 w-6 text-gray-900" />
                </button>
            </Link>
        </div>
    );
};
