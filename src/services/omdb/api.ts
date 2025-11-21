import {
    MovieDetailsResponse,
    SearchByRequestParams,
    SearchMoviesRequestParams,
    SearchMoviesResponse,
} from '../../types';
import { queryBuilder } from '../../utils/api';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_VERSION = '1';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&v=${API_VERSION}`;

export const fetchMovies = async (
    params: SearchMoviesRequestParams
): Promise<SearchMoviesResponse> => {
    const queryParams = queryBuilder(params);

    try {
        const res = await fetch(`${BASE_URL}&${queryParams}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch movies: ${res.statusText}`);
        }

        const data = await res.json();
        
        // Handle OMDB API errors (Response: "False")
        if (data.Response === 'False') {
            throw new Error(data.Error || 'No movies found');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Network error. Please check your connection.');
    }
};

export const fetchMovieDetails = async (
    params: SearchByRequestParams
): Promise<MovieDetailsResponse> => {
    const queryParams = queryBuilder(params);

    try {
        const res = await fetch(`${BASE_URL}&${queryParams}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch movie details: ${res.statusText}`);
        }

        const data = await res.json();
        
        // Handle OMDB API errors (Response: "False")
        if (data.Response === 'False') {
            throw new Error(data.Error || 'Movie not found');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error('Network error. Please check your connection.');
    }
};
