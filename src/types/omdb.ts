// Search by ID / title
type ById = {
    i: string; // A valid IMDb ID
    t?: never; // Movie title to search for.
};

type ByTitle = {
    t: string; // Movie title to search for.
    i?: never; // A valid IMDb ID
};

export type SearchByRequestParams = (ById | ByTitle) & {
    type?: 'movie' | 'series' | 'episode'; // Type of result to return.
    y?: string; // Year of release.
    plot?: 'short' | 'full'; // Return short or full plot.
};

export type MovieDetailsResponse = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{ Source: string; Value: string }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};

// Search movies
export type SearchMoviesRequestParams = {
    s: string; // Movie title to search for.
    type?: 'movie' | 'series' | 'episode'; // Type of result to return.
    y?: string; // Year of release.
    page?: number; // Page number to return.
};

export type MovieShortInfoResponse = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
};

export type SearchMoviesResponse = {
    Search: MovieShortInfoResponse[];
    totalResults: string;
    Response: 'True' | 'False';
    Error?: string;
};
