import { createContext } from 'react';

import { MovieShortInfo } from '../../types';

type FavoritesContextType = {
    addToFavorites: (movie: MovieShortInfo) => Promise<void>;
    error?: string;
    favorites: MovieShortInfo[];
    isFavorite: (id: string) => Promise<boolean>;
    isLoading: boolean;
    removeFromFavorites: (id: string) => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
