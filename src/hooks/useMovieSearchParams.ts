import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router';

import { MovieType } from '../types';

type MovieSearchParams = {
    q: string;
    page: number;
    type: MovieType | undefined;
    year: string;
};

export const useMovieSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo<MovieSearchParams>(() => {
        const q = searchParams.get('q') ?? '';

        const pageParam = searchParams.get('page') ?? '1';
        const parsedPage = parseInt(pageParam, 10);
        const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

        const typeParam = searchParams.get('type');
        const type = typeParam ? (typeParam as MovieType) : undefined;
        // TODO: validate type

        const year = searchParams.get('y') ?? '';
        // TODO: validate year

        return {
            q,
            page,
            type,
            year,
        };
    }, [searchParams]);

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
