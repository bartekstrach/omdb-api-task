import { useActionState, useEffect, useState, useTransition } from 'react';

import { useParams } from 'react-router';

import { useFavorites } from '../../hooks';
import omdbService from '../../services/omdb';
import { MovieDetailedInfo } from '../../types';
import { MovieDetailsContent } from './components/content';
import { MovieDetailsHeader } from './components/header';
import { LoadingSpinner, Message } from '../../components';

export const MovieDetailsPage = () => {
    const { id } = useParams();
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    const [isFav, setIsFav] = useState(false);
    const [isTransitioning, startTransition] = useTransition();

    const [movieDetails, fetchMovieDetails, isFetching] = useActionState<
        MovieDetailedInfo | undefined,
        string
    >(async (_prev, movieId) => {
        return await omdbService.getMovieDetails({ i: movieId, plot: 'full' });
    }, undefined);

    const isLoading = isFetching || isTransitioning;

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            fetchMovieDetails(id);

            const favoriteStatus = await isFavorite(id);
            setIsFav(favoriteStatus);
        };

        startTransition(() => {
            loadData();
        });
    }, [id]);

    const handleFavorite = async () => {
        if (!id || !movieDetails) {
            return;
        }

        if (isFav) {
            await removeFromFavorites(id);
        } else {
            // TODO mapper?
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!movieDetails) {
        return (
            <Message
                details="Go back to the home page and find a different one"
                title="Movie not found"
            />
        );
    }

    return (
        <div className="flex flex-col md:flex-row p-4 md:p-6">
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
