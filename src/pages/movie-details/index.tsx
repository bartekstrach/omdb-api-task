import { useActionState, useEffect, useState, useTransition } from 'react';

import { useParams } from 'react-router';

import { useFavorites } from '../../hooks';
import omdbService from '../../services/omdb';
import { MovieDetailedInfo } from '../../types';
import { MovieDetailsContent } from './components/content';
import { MovieDetailsHeader } from './components/header';
import { LoadingSpinner, Message } from '../../components';
import { mapMovieDetailedInfoToMovieShortInfo } from '../../utils/mappers';

export const MovieDetailsPage = () => {
    const { id } = useParams();
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    const [isFav, setIsFav] = useState(false);
    const [isTransitioning, startTransition] = useTransition();

    const [movieDetails, fetchMovieDetails, isFetching] = useActionState<
        { data?: MovieDetailedInfo; error?: string },
        string
    >(async (_prev, movieId) => {
        try {
            const data = await omdbService.getMovieDetails({
                i: movieId,
                plot: 'full',
            });
            return { data };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            return { error: message };
        }
    }, {});

    const isLoading = isFetching || isTransitioning;

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            fetchMovieDetails(id);

            try {
                const favoriteStatus = await isFavorite(id);
                setIsFav(favoriteStatus);
            } catch (error) {
                console.error('Failed to check favorite status:', error);
            }
        };

        startTransition(() => {
            loadData();
        });
    }, [id]);

    const handleFavorite = async () => {
        if (!id || !movieDetails.data) {
            return;
        }

        try {
            if (isFav) {
                await removeFromFavorites(id);
            } else {
                await addToFavorites(mapMovieDetailedInfoToMovieShortInfo(movieDetails.data));
            }
            setIsFav(!isFav);
        } catch (error) {
            console.error('Failed to update favorites:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (movieDetails.error) {
        return <Message details={movieDetails.error} title="Failed to get movie details" />;
    }

    if (!movieDetails.data) {
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
                alt={`${movieDetails.data.title} poster`}
                className="w-full md:w-80 h-auto h-fit"
                src={movieDetails.data.poster}
            />

            <div className="flex flex-col flex-1">
                <MovieDetailsHeader
                    isFavorite={isFav}
                    onToggleFavorite={handleFavorite}
                    rating={movieDetails.data.rating}
                    runtime={movieDetails.data.runtime}
                    title={movieDetails.data.title}
                    type={movieDetails.data.type}
                    votes={movieDetails.data.votes}
                    year={movieDetails.data.year}
                />

                <MovieDetailsContent
                    actors={movieDetails.data.actors}
                    director={movieDetails.data.director}
                    genre={movieDetails.data.genre}
                    plot={movieDetails.data.plot}
                    writer={movieDetails.data.writer}
                />
            </div>
        </div>
    );
};
