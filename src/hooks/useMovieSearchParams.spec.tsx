import { act, ReactNode } from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { useMovieSearchParams } from './useMovieSearchParams';


// Wrapper component that provides React Router context
const createWrapper = (initialEntries: string[] = ['/']) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    );
    Wrapper.displayName = 'RouterWrapper';
    return Wrapper;
};

describe('useMovieSearchParams', () => {
    describe('getParams', () => {
        it('returns default values when no search params exist', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            expect(result.current.params).toEqual({
                q: '',
                page: 1,
                type: undefined,
                year: '',
            });
        });

        it('parses search query parameter', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?q=avengers']),
            });

            expect(result.current.params.q).toBe('avengers');
        });

        it('parses page parameter', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?page=5']),
            });

            expect(result.current.params.page).toBe(5);
        });

        it('parses type parameter', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?type=movie']),
            });

            expect(result.current.params.type).toBe('movie');
        });

        it('parses year parameter', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?y=2020']),
            });

            expect(result.current.params.year).toBe('2020');
        });

        it('parses multiple parameters together', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?q=matrix&page=3&type=series&y=1999']),
            });

            expect(result.current.params).toEqual({
                q: 'matrix',
                page: 3,
                type: 'series',
                year: '1999',
            });
        });

        it('defaults to page 1 when page param is invalid', () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?page=invalid']),
            });

            expect(result.current.params.page).toBe(1);
        });
    });

    describe('updateParams', () => {
        it('updates search query parameter', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({ q: 'inception' });
            });

            await waitFor(() => {
                expect(result.current.params.q).toBe('inception');
            });
        });

        it('trims whitespace from search query', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({ q: '  batman  ' });
            });

            await waitFor(() => {
                expect(result.current.params.q).toBe('batman');
            });
        });

        it('deletes query param when empty string is provided', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?q=test']),
            });

            expect(result.current.params.q).toBe('test');

            act(() => {
                result.current.updateParams({ q: '' });
            });

            await waitFor(() => {
                expect(result.current.params.q).toBe('');
            });
        });

        it('updates page parameter', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({ page: 5 });
            });

            await waitFor(() => {
                expect(result.current.params.page).toBe(5);
            });
        });

        it('updates type parameter', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({ type: 'movie' });
            });

            await waitFor(() => {
                expect(result.current.params.type).toBe('movie');
            });
        });

        it('deletes type param when empty string is provided', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?type=series']),
            });

            expect(result.current.params.type).toBe('series');

            act(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                result.current.updateParams({ type: '' });
            });

            await waitFor(() => {
                expect(result.current.params.type).toBeUndefined();
            });
        });

        it('updates year parameter', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({ year: '2023' });
            });

            await waitFor(() => {
                expect(result.current.params.year).toBe('2023');
            });
        });

        it('deletes year param when empty string is provided', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?y=2020']),
            });

            expect(result.current.params.year).toBe('2020');

            act(() => {
                result.current.updateParams({ year: '' });
            });

            await waitFor(() => {
                expect(result.current.params.year).toBe('');
            });
        });

        it('updates multiple parameters at once', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(),
            });

            act(() => {
                result.current.updateParams({
                    q: 'interstellar',
                    page: 2,
                    type: 'movie',
                    year: '2014',
                });
            });

            await waitFor(() => {
                expect(result.current.params).toEqual({
                    q: 'interstellar',
                    page: 2,
                    type: 'movie',
                    year: '2014',
                });
            });
        });

        it('preserves existing params when updating only one', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?q=matrix&type=movie']),
            });

            act(() => {
                result.current.updateParams({ page: 3 });
            });

            await waitFor(() => {
                expect(result.current.params).toEqual({
                    q: 'matrix',
                    page: 3,
                    type: 'movie',
                    year: '',
                });
            });
        });

        it('handles partial updates correctly', async () => {
            const { result } = renderHook(() => useMovieSearchParams(), {
                wrapper: createWrapper(['/?q=test&page=1&type=series&y=2020']),
            });

            act(() => {
                result.current.updateParams({ page: 2 });
            });

            await waitFor(() => {
                expect(result.current.params).toEqual({
                    q: 'test',
                    page: 2,
                    type: 'series',
                    year: '2020',
                });
            });
        });
    });
});
