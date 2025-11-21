import { MovieShortInfo } from '../../types';
import { EmptyState } from '../empty-state';
import { LoadingSpinner } from '../loading-spinner';
import { Message } from '../message';
import { MovieListItem } from '../movie-list-item';

interface Props {
    hasSearched: boolean;
    error?: string;
    isLoading: boolean;
    movies: MovieShortInfo[];
}

export const MovieList = ({ error, hasSearched, isLoading, movies }: Props) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Message details={error} title="Oops, something went wrong!" />
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <EmptyState hasSearched={hasSearched} />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-2">
            {movies.map(movieInfo => (
                <MovieListItem key={`movie-${movieInfo.id}`} movieInfo={movieInfo} />
            ))}
        </div>
    );
};
