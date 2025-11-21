import { useEffect, useState } from 'react';

import { HeartIcon as HeartIconOutlined, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

import { useFavorites } from '../../hooks';
import { MovieShortInfo } from '../../types';
import { Pill } from '../pill';

interface Props {
    movieInfo: MovieShortInfo;
}

export const MovieListItem = ({ movieInfo }: Props) => {
    const { id, poster, title, type, year } = movieInfo;

    const [isFav, setIsFav] = useState(false);
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const favoriteStatus = await isFavorite(id);
            setIsFav(favoriteStatus);
        };

        fetchFavoriteStatus();
    }, [id]);

    const handleFavorite = async () => {
        try {
            if (isFav) {
                await removeFromFavorites(id);
                setIsFav(false);
            } else {
                await addToFavorites(movieInfo);
                setIsFav(true);
            }
        } catch (error) {
            console.error('Failed to update favorites:', error);
        }
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

            <img alt={`${title} poster`} className="max-h-[100px]" src={poster} />

            <div className="min-w-0 flex flex-col">
                <h3 className="font-semibold truncate">{title}</h3>
                <span>{year}</span>
            </div>

            <Pill text={type} />

            <Link to={`/movie/${id}`} className="flex items-center">
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
