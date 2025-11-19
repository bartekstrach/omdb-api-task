import { fetchMovieDetails, fetchMovies } from './api';
import { processMovieDetails, processMovies } from './data-processors';
import {
    MovieDetailedInfo,
    MoviesSearchResult,
    SearchByRequestParams,
    SearchMoviesRequestParams,
} from '../../types';

const getMovies = async (params: SearchMoviesRequestParams): Promise<MoviesSearchResult> => {
    const response = await fetchMovies(params);
    return processMovies({ params, response });
};

const getMovieDetails = async (params: SearchByRequestParams): Promise<MovieDetailedInfo> => {
    const response = await fetchMovieDetails(params);
    return processMovieDetails(response);
};

export default {
    getMovieDetails,
    getMovies,
};
