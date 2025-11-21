import { MovieShortInfo } from '../types';

const FAVORITES_DB_NAME = 'omdb-db';
const FAVORITES_STORE_NAME = 'favorites';

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(FAVORITES_DB_NAME, 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains(FAVORITES_STORE_NAME)) {
                db.createObjectStore(FAVORITES_STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

export const addToFavorites = async (movie: MovieShortInfo): Promise<void> => {
    try {
        const db = await openDB();

        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.add(movie);

            request.onsuccess = () => resolve();
            request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to add to favorites';

        throw new Error(message);
    }
};

export const removeFromFavorites = async (id: string): Promise<void> => {
    try {
        const db = await openDB();

        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to remove from favorites';

        throw new Error(message);
    }
};

export const isFavorite = async (id: string): Promise<boolean> => {
    const db = await openDB();

    const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
    const store = transaction.objectStore(FAVORITES_STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result !== undefined);
        request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
};

export const getFavorites = async (): Promise<MovieShortInfo[]> => {
    try {
        const db = await openDB();

        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load favorites';

        throw new Error(message);
    }
};
