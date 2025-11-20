import { MovieShortInfo } from '../../types';
import { LoadingSpinner } from '../loading-spinner';
import { MovieListItem } from '../movie-list-item';

interface Props {
    isLoading: boolean;
    movies: MovieShortInfo[];
}

export const MovieList = ({ isLoading, movies }: Props) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!movies || movies.length === 0) {
        return <p>No items</p>;
    }

    return (
        <div className="flex flex-col space-y-2">
            {movies.map(movieInfo => (
                <MovieListItem key={`movie-${movieInfo.id}`} movieInfo={movieInfo} />
            ))}
        </div>
    );
};
