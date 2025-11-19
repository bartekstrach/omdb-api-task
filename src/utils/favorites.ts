const FAVORITES_LOCAL_STORAGE_KEY = 'omdb-favorites';

const getFavorites = (): string[] => {
    const storedFavorites = localStorage.getItem(FAVORITES_LOCAL_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const addToFavorites = (id: string): void => {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    }
};

export const isFavorite = (id: string): boolean => {
    return getFavorites().includes(id);
};

export const removeFromFavorites = (id: string): void => {
    const favorites = getFavorites().filter(item => item !== id);
    localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(favorites));
};
