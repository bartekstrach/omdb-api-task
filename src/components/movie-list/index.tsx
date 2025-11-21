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
    if (error) {
        return <Message
            details={error}
            title="Oops, something went wrong!"
        />;
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!movies || movies.length === 0) {
        return <EmptyState hasSearched={hasSearched} />;
    }

    return (
        <div className="flex flex-col space-y-2">
            {movies.map(movieInfo => (
                <MovieListItem key={`movie-${movieInfo.id}`} movieInfo={movieInfo} />
            ))}
        </div>
    );
};
