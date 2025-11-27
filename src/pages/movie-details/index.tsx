import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { useFavorites } from '../../hooks';
import omdbService from '../../services/omdb';
import { MovieDetailedInfo } from '../../types';
import { MovieDetailsContent } from './components/content';
import { MovieDetailsHeader } from './components/header';
import { LoadingSpinner, Message, MoviePoster } from '../../components';
import { mapMovieDetailedInfoToMovieShortInfo } from '../../utils/mappers';

export const MovieDetailsPage = () => {
    const { id } = useParams();
    const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();

    const [isFav, setIsFav] = useState(false);
    const [movieDetails, setMovieDetails] = useState<{
        data?: MovieDetailedInfo;
        error?: string;
        isLoading: boolean;
    }>({ isLoading: false });

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            if (!id) {
                return;
            }

            setMovieDetails({ isLoading: true });

            try {
                const [data, favoriteStatus] = await Promise.all([
                    omdbService.getMovieDetails({ i: id, plot: 'full' }),
                    isFavorite(id),
                ]);

                if (!cancelled) {
                    setMovieDetails({ data, isLoading: false });
                    setIsFav(favoriteStatus);
                }
            } catch (error) {
                if (!cancelled) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'An unexpected error occurred during fetching movie details';
                    setMovieDetails({ error: message, isLoading: false });
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, [id, isFavorite]);

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

    if (movieDetails.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (movieDetails.error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Message details={movieDetails.error} title="Failed to get movie details" />
            </div>
        );
    }

    if (!movieDetails.data) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Message
                    details="Go back to the home page and find a different one"
                    title="Movie not found"
                />
            </div>
        );
    }

    const {
        actors,
        director,
        genre,
        plot,
        poster,
        rating,
        runtime,
        title,
        type,
        votes,
        writer,
        year,
    } = movieDetails.data;

    return (
        <div className="flex flex-col md:flex-row">
            <MoviePoster alt={`${title} poster`} height={450} src={poster} width={300} />

            <div className="flex flex-col flex-1">
                <MovieDetailsHeader
                    isFavorite={isFav}
                    onToggleFavorite={handleFavorite}
                    rating={rating}
                    runtime={runtime}
                    title={title}
                    type={type}
                    votes={votes}
                    year={year}
                />

                <MovieDetailsContent
                    actors={actors}
                    director={director}
                    genre={genre}
                    plot={plot}
                    writer={writer}
                />
            </div>
        </div>
    );
};
