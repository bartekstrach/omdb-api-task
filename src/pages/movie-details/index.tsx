import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { useFavorites } from '../../hooks';
import omdbService from '../../services/omdb';
import { MovieDetailedInfo } from '../../types';
import { MovieDetailsContent } from './components/content';
import { MovieDetailsHeader } from './components/header';

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
    }, [id, isFavorite]);

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
                <MovieDetailsHeader
                    isFavorite={isFav}
                    onToggleFavorite={handleFavorite}
                    rating={movieDetails.rating}
                    runtime={movieDetails.runtime}
                    title={movieDetails.title}
                    type={movieDetails.type}
                    votes={movieDetails.votes}
                    year={movieDetails.year}
                />

                <MovieDetailsContent
                    actors={movieDetails.actors}
                    director={movieDetails.director}
                    genre={movieDetails.genre}
                    plot={movieDetails.plot}
                    writer={movieDetails.writer}
                />
            </div>
        </div>
    );
};
