import { createContext } from 'react';

import { MovieShortInfo } from '../../types';

type FavoritesContextType = {
    favorites: MovieShortInfo[];
    isLoading: boolean;
    addToFavorites: (movie: MovieShortInfo) => void;
    isFavorite: (id: string) => Promise<boolean>;
    removeFromFavorites: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
