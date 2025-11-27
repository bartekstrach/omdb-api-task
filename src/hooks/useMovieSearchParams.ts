import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router';

import { MovieType } from '../types';
import {
    getQueryParam,
    getPageParam,
    getTypeParam,
    getYearParam,
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

            if (q !== undefined) {
                if (q.trim()) {
                    urlSearchParams.set('q', q.trim());
                } else {
                    urlSearchParams.delete('q');
                }
            }

            if (page !== undefined) {
                urlSearchParams.set('page', page.toString());
            }

            if (type !== undefined) {
                if (type) {
                    urlSearchParams.set('type', type);
                } else {
                    urlSearchParams.delete('type');
                }
            }

            if (year !== undefined) {
                if (year) {
                    urlSearchParams.set('y', year);
                } else {
                    urlSearchParams.delete('y');
                }
            }

            setSearchParams(urlSearchParams);
        },
        [searchParams, setSearchParams]
    );

    return {
        params,
        updateParams,
    };
};
