import {
    MovieDetails,
    SearchByRequestParams,
    SearchMoviesRequestParams,
    SearchMoviesResponse,
} from '../types/omdb.types';
import { queryBuilder } from '../utils/api';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const fetchMovies = async (
    params: SearchMoviesRequestParams
): Promise<SearchMoviesResponse> => {
    const queryParams = queryBuilder(params);

    const res = await fetch(`${BASE_URL}&${queryParams}`);

    if (!res.ok) {
        throw new Error('Failed to fetch movies');
    }

    return res.json();
};

export const fetchMovieDetails = async (params: SearchByRequestParams): Promise<MovieDetails> => {
    const queryParams = queryBuilder(params);

    const res = await fetch(`${BASE_URL}&${queryParams}`);

    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }

    return res.json();
};
