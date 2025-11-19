import { mapResponseToMovieDetailedInfo, mapResponseToMovieShortInfo } from './mappers';
import {
    MovieDetailedInfo,
    MovieDetailsResponse,
    MoviesSearchResult,
    SearchMoviesRequestParams,
    SearchMoviesResponse,
} from '../../types';

export const processMovies = ({
    params,
    response,
}: {
    params: SearchMoviesRequestParams;
    response: SearchMoviesResponse;
}): MoviesSearchResult => {
    if (response.Response === 'False') {
        throw new Error('Failed to process movies');
        // return null; // TODO: how to handle it?
    }

    const currentPage = params.page ?? 1;
    const items = response.Search.map(mapResponseToMovieShortInfo);
    const totalResults = Number(response.totalResults);
    const MAX_ITEMS_PER_PAGE = 10;
    const pages = totalResults > 0 ? Math.ceil(totalResults / MAX_ITEMS_PER_PAGE) : 0;

    return {
        currentPage,
        items,
        pages,
        totalResults,
    };
};

export const processMovieDetails = (response: MovieDetailsResponse): MovieDetailedInfo => {
    if (response.Response === 'False') {
        throw new Error('Failed to process movie details');
        // return null; // TODO: how to handle it?
    }

    return mapResponseToMovieDetailedInfo(response);
};
