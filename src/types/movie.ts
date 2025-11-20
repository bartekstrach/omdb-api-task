export type MovieType = 'movie' | 'series' | 'episode';

export type MovieDetailedInfo = {
    id: string;
    actors: string;
    director: string;
    genre: string;
    language: string;
    plot: string;
    poster: string;
    rating: string;
    released: string;
    runtime: string;
    title: string;
    type: MovieType;
    votes: string;
    writer: string;
    year: string;
};

export type MovieShortInfo = {
    id: string;
    poster: string;
    title: string;
    type: MovieType;
    year: string;
};

export type MoviesSearchResult = {
    items: MovieShortInfo[];
    currentPage: number;
    pages: number;
    totalResults: number;
};
