import { createContext } from 'react';

import { MovieShortInfo, PaginationParams, PaginatedResult } from '../../types';

type FavoritesContextType = {
    addToFavorites: (movie: MovieShortInfo) => Promise<void>;
    error?: string;
    favorites: MovieShortInfo[];
    getPaginatedFavorites: (params: PaginationParams) => Promise<PaginatedResult<MovieShortInfo>>;
    isFavorite: (id: string) => Promise<boolean>;
    isLoading: boolean;
    removeFromFavorites: (id: string) => Promise<void>;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
