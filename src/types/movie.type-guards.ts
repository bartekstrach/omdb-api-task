import { MovieType } from './movie';

export const isMovieType = (param: string): param is MovieType =>
    Object.values(MovieType).includes(param as MovieType);
