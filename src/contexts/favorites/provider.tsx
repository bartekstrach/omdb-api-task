import { useEffect, useState } from 'react';

import { FavoritesContext } from './context';
import { MovieShortInfo } from '../../types';
import * as utils from '../../utils/favorites';

interface FavoritesProviderProps {
    children: React.ReactNode; // This is the key change
}

// Provider component
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const [favorites, setFavorites] = useState<MovieShortInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch the list of favorites from IndexedDB
    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            const data = await utils.getFavorites(); // Get favorites from IndexedDB
            setFavorites(data);
            setIsLoading(false);
        };
        fetchFavorites();
    }, []);

    // Add a movie to favorites
    const addToFavorites = async (movie: MovieShortInfo) => {
        await utils.addToFavorites(movie); // Add to IndexedDB
        setFavorites(prev => [...prev, movie]); // Update state
    };

    const isFavorite = async (id: string) => {
        return await utils.isFavorite(id);
    };

    // Remove a movie from favorites
    const removeFromFavorites = async (id: string) => {
        await utils.removeFromFavorites(id); // Remove from IndexedDB
        setFavorites(prev => prev.filter(movie => movie.id !== id)); // Update state
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, isLoading, addToFavorites, isFavorite, removeFromFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
