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

    const getParams = (): MovieSearchParams => {
        const q = searchParams.get('q') ?? '';
        const page = parseInt(searchParams.get('page') ?? '1');
        const type = searchParams.get('type') || undefined;
        const year = searchParams.get('y') ?? '';

        return {
            q,
            page,
            type: type as MovieType | undefined,
            year,
        };
    };

    const updateParams = ({
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
    };

    return {
        params: getParams(),
        updateParams,
    };
};
