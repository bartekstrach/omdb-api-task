import {
    MovieDetailedInfo,
    MovieDetailsResponse,
    MovieShortInfo,
    MovieShortInfoResponse,
} from '../../types';

export const mapResponseToMovieShortInfo = (item: MovieShortInfoResponse): MovieShortInfo => ({
    id: item.imdbID,
    poster: item.Poster,
    title: item.Title,
    type: item.Type,
    year: item.Year,
});

export const mapResponseToMovieDetailedInfo = (item: MovieDetailsResponse): MovieDetailedInfo => ({
    id: item.imdbID,
    actors: item.Actors,
    director: item.Director,
    genre: item.Genre,
    language: item.Language,
    plot: item.Plot,
    poster: item.Poster,
    rating: item.imdbRating,
    released: item.Released,
    runtime: item.Runtime,
    title: item.Title,
    type: item.Type,
    votes: item.imdbVotes,
    writer: item.Writer,
    year: item.Year,
});
