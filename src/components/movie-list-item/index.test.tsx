// src/components/movie-list-item/MovieListItem.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MovieShortInfo } from '../../types';

import { MovieListItem } from '.';

// Mock the useFavorites hook
const mockAddToFavorites = vi.fn();
const mockRemoveFromFavorites = vi.fn();
const mockIsFavorite = vi.fn();

vi.mock('../../hooks', () => ({
    useFavorites: () => ({
        addToFavorites: mockAddToFavorites,
        removeFromFavorites: mockRemoveFromFavorites,
        isFavorite: mockIsFavorite,
    }),
}));

// Mock the child components
vi.mock('../movie-poster', () => ({
    MoviePoster: ({ alt, src }: { alt: string; src: string }) => (
        <img alt={alt} src={src} data-testid="movie-poster" />
    ),
}));

vi.mock('../pill', () => ({
    Pill: ({ text }: { text: string }) => <span data-testid="pill">{text}</span>,
}));

const mockMovieInfo: MovieShortInfo = {
    id: 'tt1234567',
    poster: 'https://example.com/poster.jpg',
    title: 'Test Movie',
    type: 'movie',
    year: '2023',
};

const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('MovieListItem', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockIsFavorite.mockResolvedValue(false);
    });

    describe('Rendering', () => {
        it('renders movie title', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByRole('heading', { name: 'Test Movie' })).toBeInTheDocument();
        });

        it('renders movie year', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByText('2023')).toBeInTheDocument();
        });

        it('renders movie type pill', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByTestId('pill')).toHaveTextContent('movie');
        });

        it('renders movie poster with correct props', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            const poster = screen.getByTestId('movie-poster');
            expect(poster).toHaveAttribute('alt', 'Test Movie poster');
            expect(poster).toHaveAttribute('src', 'https://example.com/poster.jpg');
        });

        it('renders link to movie details page', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', '/movie/tt1234567');
        });

        it('renders more info button', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByRole('button', { name: 'More info' })).toBeInTheDocument();
        });
    });

    describe('Favorite functionality', () => {
        it('shows outlined heart when movie is not a favorite', async () => {
            mockIsFavorite.mockResolvedValue(false);
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            await waitFor(() => {
                expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
            });
        });

        it('shows filled heart when movie is a favorite', async () => {
            mockIsFavorite.mockResolvedValue(true);
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            await waitFor(() => {
                expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
            });
        });

        it('checks favorite status on mount', async () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            await waitFor(() => {
                expect(mockIsFavorite).toHaveBeenCalledWith('tt1234567');
            });
        });

        it('adds movie to favorites when clicking outlined heart', async () => {
            mockIsFavorite.mockResolvedValue(false);
            mockAddToFavorites.mockResolvedValue(undefined);
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Add to favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(mockAddToFavorites).toHaveBeenCalledWith(mockMovieInfo);
            });
        });

        it('removes movie from favorites when clicking filled heart', async () => {
            mockIsFavorite.mockResolvedValue(true);
            mockRemoveFromFavorites.mockResolvedValue(undefined);
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Remove from favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(mockRemoveFromFavorites).toHaveBeenCalledWith('tt1234567');
            });
        });

        it('updates UI after adding to favorites', async () => {
            mockIsFavorite.mockResolvedValue(false);
            mockAddToFavorites.mockResolvedValue(undefined);
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Add to favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
            });
        });

        it('updates UI after removing from favorites', async () => {
            mockIsFavorite.mockResolvedValue(true);
            mockRemoveFromFavorites.mockResolvedValue(undefined);
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Remove from favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
            });
        });

        it('handles error when adding to favorites fails', async () => {
            mockIsFavorite.mockResolvedValue(false);
            mockAddToFavorites.mockRejectedValue(new Error('Failed to add'));
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Add to favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    'Failed to update favorites:',
                    expect.any(Error)
                );
            });

            consoleErrorSpy.mockRestore();
        });

        it('handles error when removing from favorites fails', async () => {
            mockIsFavorite.mockResolvedValue(true);
            mockRemoveFromFavorites.mockRejectedValue(new Error('Failed to remove'));
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const user = userEvent.setup();

            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            const favoriteButton = await screen.findByLabelText('Remove from favorites');
            await user.click(favoriteButton);

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith(
                    'Failed to update favorites:',
                    expect.any(Error)
                );
            });

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Different movie types', () => {
        it('renders series type correctly', () => {
            const seriesMovie = { ...mockMovieInfo, type: 'series' as const };
            renderWithRouter(<MovieListItem movieInfo={seriesMovie} />);
            expect(screen.getByTestId('pill')).toHaveTextContent('series');
        });

        it('renders episode type correctly', () => {
            const episodeMovie = { ...mockMovieInfo, type: 'episode' as const };
            renderWithRouter(<MovieListItem movieInfo={episodeMovie} />);
            expect(screen.getByTestId('pill')).toHaveTextContent('episode');
        });
    });

    describe('Accessibility', () => {
        it('has accessible favorite button label when not favorited', async () => {
            mockIsFavorite.mockResolvedValue(false);
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            await waitFor(() => {
                const button = screen.getByLabelText('Add to favorites');
                expect(button).toBeInTheDocument();
            });
        });

        it('has accessible favorite button label when favorited', async () => {
            mockIsFavorite.mockResolvedValue(true);
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);

            await waitFor(() => {
                const button = screen.getByLabelText('Remove from favorites');
                expect(button).toBeInTheDocument();
            });
        });

        it('has accessible more info button label', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByLabelText('More info')).toBeInTheDocument();
        });

        it('has accessible heading for movie title', () => {
            renderWithRouter(<MovieListItem movieInfo={mockMovieInfo} />);
            expect(screen.getByRole('heading', { name: 'Test Movie' })).toBeInTheDocument();
        });
    });
});
