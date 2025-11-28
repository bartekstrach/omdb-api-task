import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router';

import { MovieType } from '../types';
import {
    getQueryParam,
    getPageParam,
    getTypeParam,
    getYearParam,
    updateQueryParam,
    QUERY_PARAM_KEY,
    PAGE_PARAM_KEY,
    TYPE_PARAM_KEY,
    YEAR_PARAM_KEY,
} from '../utils/movie-search-params';

type MovieSearchParams = {
    q: string;
    page: number;
    type: MovieType | undefined;
    year: string;
};

export const useMovieSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo<MovieSearchParams>(
        () => ({
            q: getQueryParam(searchParams),
            page: getPageParam(searchParams),
            type: getTypeParam(searchParams),
            year: getYearParam(searchParams),
        }),
        [searchParams]
    );

    const updateParams = useCallback(
        ({
            q,
            page,
            type,
            year,
        }: {
            q?: string;
            page?: number;
            type?: MovieType | undefined;
            year?: string;
        }) => {
            const urlSearchParams = new URLSearchParams(searchParams);

            updateQueryParam(urlSearchParams, QUERY_PARAM_KEY, q);
            updateQueryParam(urlSearchParams, PAGE_PARAM_KEY, page);
            updateQueryParam(urlSearchParams, TYPE_PARAM_KEY, type);
            updateQueryParam(urlSearchParams, YEAR_PARAM_KEY, year);

            setSearchParams(urlSearchParams);
        },
        [searchParams, setSearchParams]
    );

    return {
        params,
        updateParams,
    };
};
