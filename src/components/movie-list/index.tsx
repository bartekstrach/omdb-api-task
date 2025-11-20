import { MovieShortInfo } from '../../types';
import { MovieListItem } from '../movie-list-item';

interface Props {
    movies: MovieShortInfo[];
}

export const MovieList = ({ movies }: Props) => {
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
