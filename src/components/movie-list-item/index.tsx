import { useEffect, useState } from 'react';

import { HeartIcon as HeartIconOutlined, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

import { useFavorites } from '../../hooks';
import { MovieShortInfo } from '../../types';
import { MoviePoster } from '../movie-poster';
import { Pill } from '../pill';

interface Props {
    movieInfo: MovieShortInfo;
}

export const MovieListItem = ({ movieInfo }: Props) => {
    const { id, poster, title, type, year } = movieInfo;

    const [isFav, setIsFav] = useState(false);
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    useEffect(() => {
        let cancelled = false;

        const fetchFavoriteStatus = async () => {
            try {
                const favoriteStatus = await isFavorite(id);

                if (!cancelled) {
                    setIsFav(favoriteStatus);
                }
            } catch (error) {
                console.error('Failed to check favorite status:', error);
            }
        };

        fetchFavoriteStatus();

        return () => {
            cancelled = true;
        };
    }, [id, isFavorite]);

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
            console.error('Failed to update favorite status:', error);
        }
    };

    return (
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_80px_1fr_auto_auto] border border-gray-700 min-h-[90px] items-center hover:bg-gray-100 px-4 gap-4">
            <div className="hidden sm:flex">
                <button
                    className="hover:bg-gray-100 rounded transition-colors cursor-pointer"
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={handleFavorite}
                >
                    {isFav ? (
                        <HeartIcon className="h-6 w-6 text-gray-900" />
                    ) : (
                        <HeartIconOutlined className="hover:fill-current h-6 w-6 text-gray-900" />
                    )}
                </button>
            </div>

            <div className="hidden md:inline">
                <MoviePoster alt={`${title} poster`} height={90} src={poster} width={60} />
            </div>

            <div className="min-w-0 flex flex-col text-sm md:text-base">
                <h2 className="font-semibold truncate">{title}</h2>
                <span>{year}</span>
            </div>

            <div className="hidden sm:inline">
                <Pill text={type} />
            </div>

            <Link to={`/movie/${id}`} className="flex items-center">
                <button
                    aria-label="More info"
                    className="hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                    <InformationCircleIcon className="h-6 w-6 text-gray-900" />
                </button>
            </Link>
        </div>
    );
};
