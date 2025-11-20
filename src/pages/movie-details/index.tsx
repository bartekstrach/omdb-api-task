import { useEffect, useState } from 'react';

import { HeartIcon as HeartIconOutlined, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router';

import { useFavorites } from '../../hooks';
import omdbService from '../../services/omdb';
import { MovieDetailedInfo } from '../../types';

export const MovieDetailsPage = () => {
    const { id } = useParams();

    const [isFav, setIsFav] = useState(false);
    const [movieDetails, setMovieDetails] = useState<MovieDetailedInfo>();

    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    useEffect(() => {
        const fetchMovieDetails = async (movieId: string) => {
            const response = await omdbService.getMovieDetails({ i: movieId, plot: 'full' });
            setMovieDetails(response);
        };

        const fetchFavoriteStatus = async (movieId: string) => {
            const favoriteStatus = await isFavorite(movieId);
            setIsFav(favoriteStatus);
        };

        if (id) {
            fetchMovieDetails(id);
            fetchFavoriteStatus(id);
        }
    }, [id]);

    const handleFavorite = async () => {
        if (!id) {
            return;
        }

        if (isFav) {
            await removeFromFavorites(id);
        } else {
            // TODO mapper?
            if (!movieDetails) {
                return;
            }

            await addToFavorites({
                id: movieDetails.id,
                poster: movieDetails.poster,
                title: movieDetails.title,
                type: movieDetails.type,
                year: movieDetails.year,
            });
        }

        setIsFav(!isFav);
    };

    if (!movieDetails) {
        return <>No data</>;
    }

    return (
        <div className="flex flex-col md:flex-row p-4 md:p-6">
            {/* Poster */}
            <img
                alt={`${movieDetails.title} poster`}
                className="w-full md:w-80 h-auto h-fit"
                src={movieDetails.poster}
            />

            <div className="flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-between bg-gradient-to-br from-white to-gray-200 p-8">
                    <div className="flex flex-col">
                        {/* Title */}
                        <div className="flex gap-x-4">
                            <h2 className="text-3xl font-bold">{movieDetails.title}</h2>
                            <button
                                className="rounded transition-colors cursor-pointer"
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

                        {/* Year */}
                        <span>{movieDetails.year}</span>

                        {/* Runtime + type */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <span>{movieDetails.runtime}</span>
                            <span className="border border-gray-700 rounded-xl p-1">
                                {movieDetails.type}
                            </span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                        <StarIcon className="h-6 w-6 text-gray-900" />
                        <span className="font-semibold">{movieDetails.rating}</span>
                        <span>{`(${movieDetails.votes})`}</span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col p-8 gap-8">
                    {/* Genre */}
                    <div>
                        <h3 className="text-xl font-bold underline">Genre</h3>
                        <span>{movieDetails.genre}</span>
                    </div>

                    {/* Cast */}
                    <div>
                        <h3 className="text-xl font-bold underline">Cast</h3>
                        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                            <dt className="font-semibold">Actors</dt>
                            <dd>{movieDetails.actors}</dd>
                            <dt className="font-semibold">Director</dt>
                            <dd>{movieDetails.director}</dd>
                            <dt className="font-semibold">Writers</dt>
                            <dd>{movieDetails.writer}</dd>
                        </dl>
                    </div>

                    {/* Plot */}
                    <div>
                        <h3 className="text-xl font-bold underline">Plot</h3>
                        <p>{movieDetails.plot}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
