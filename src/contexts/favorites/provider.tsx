import { useEffect, useState } from 'react';

import { FavoritesContext } from './context';
import { MovieShortInfo, PaginationParams, PaginatedResult } from '../../types';
import * as utils from '../../utils/favorites';

interface FavoritesProviderProps {
    children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const [favorites, setFavorites] = useState<MovieShortInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            setError(undefined);

            try {
                const data = await utils.getFavorites();
                setFavorites(data);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to load favorites';
                setError(message);
                console.error('Failed to fetch favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorites = async (movie: MovieShortInfo) => {
        try {
            await utils.addToFavorites(movie);
            setFavorites(prev => [...prev, movie]);
            setError(undefined);
        } catch (error) {
            setError((error as Error).message);
            throw error;
        }
    };

    const isFavorite = async (id: string) => {
        try {
            return await utils.isFavorite(id);
        } catch (error) {
            console.error('Failed to check favorite status', error);
            return false;
        }
    };

    const removeFromFavorites = async (id: string) => {
        try {
            await utils.removeFromFavorites(id);
            setFavorites(prev => prev.filter(movie => movie.id !== id));
            setError(undefined);
        } catch (error) {
            setError((error as Error).message);
            throw error;
        }
    };

    const getPaginatedFavorites = async (params: PaginationParams): Promise<PaginatedResult<MovieShortInfo>> => {
        try {
            return await utils.getPaginatedFavorites(params);
        } catch (error) {
            setError((error as Error).message);
            throw error;
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ addToFavorites, error, favorites, getPaginatedFavorites, isFavorite, isLoading, removeFromFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
