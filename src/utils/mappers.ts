import { MovieDetailedInfo, MovieShortInfo } from '../types';

export const mapMovieDetailedInfoToMovieShortInfo = (item: MovieDetailedInfo): MovieShortInfo => ({
    id: item.id,
    poster: item.poster,
    title: item.title,
    type: item.type,
    year: item.year,
});
