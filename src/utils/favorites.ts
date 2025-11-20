import { MovieShortInfo } from "../types";

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

export const addToFavorites = (movie: MovieShortInfo): Promise<void> => {
    return new Promise((resolve, reject) => {
        openDB().then((db) => {
            const transaction = db.transaction(FAVORITES_STORE_NAME, 'readwrite');
            const store = transaction.objectStore(FAVORITES_STORE_NAME);
            const request = store.add(movie);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    });
};

export const removeFromFavorites = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        openDB().then((db) => {
            const transaction = db.transaction(FAVORITES_STORE_NAME, 'readwrite');
            const store = transaction.objectStore(FAVORITES_STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    });
};

export const isFavorite = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        openDB().then((db) => {
            const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
            const store = transaction.objectStore(FAVORITES_STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result !== undefined);
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    });
};
