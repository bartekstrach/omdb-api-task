import { isMovieType, MovieType } from '../types';

type ParamType = string | number | undefined;

const getParam = <T extends ParamType>({
    searchParams,
    key,
    defaultValue,
    transform,
}: {
    searchParams: URLSearchParams;
    key: string;
    defaultValue: T;
    transform: (value: string) => T;
}): T => {
    const param = searchParams.get(key);
    if (param === null) {
        return defaultValue;
    }
    return transform(param);
};

const DEFAULT_QUERY = '';
const QUERY_PARAM_KEY = 'q';
export const getQueryParam = (searchParams: URLSearchParams): string =>
    getParam({
        searchParams,
        key: QUERY_PARAM_KEY,
        defaultValue: DEFAULT_QUERY,
        transform: val => val,
    });

const DEFAULT_PAGE = 1;
const PAGE_PARAM_KEY = 'page';
export const getPageParam = (searchParams: URLSearchParams): number =>
    getParam({
        searchParams,
        key: PAGE_PARAM_KEY,
        defaultValue: DEFAULT_PAGE,
        transform: val => {
            const page = parseInt(val, 10);

            if (isNaN(page) || page < DEFAULT_PAGE) {
                return DEFAULT_PAGE;
            }

            return page;
        },
    });

const DEFAULT_TYPE = undefined;
const TYPE_PARAM_KEY = 'type';
export const getTypeParam = (searchParams: URLSearchParams): MovieType | undefined =>
    getParam({
        searchParams,
        key: TYPE_PARAM_KEY,
        defaultValue: DEFAULT_TYPE,
        transform: val => (isMovieType(val) ? val : DEFAULT_TYPE),
    });

const DEFAULT_YEAR = '';
const YEAR_PARAM_KEY = 'y';
export const getYearParam = (searchParams: URLSearchParams): string =>
    getParam({
        searchParams,
        key: YEAR_PARAM_KEY,
        defaultValue: DEFAULT_YEAR,
        transform: val => val, // TODO: validate year
    });
