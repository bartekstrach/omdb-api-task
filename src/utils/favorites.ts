import { MovieShortInfo, PaginatedResult, PaginationParams } from '../types';

const FAVORITES_DB_NAME = 'omdb-db';
const FAVORITES_STORE_NAME = 'favorites';
const DB_VERSION = 2;

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(FAVORITES_DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBRequest).result;

            let store: IDBObjectStore;

            if (db.objectStoreNames.contains(FAVORITES_STORE_NAME)) {
                const transaction = (event.target as IDBRequest).transaction;
                store = transaction!.objectStore(FAVORITES_STORE_NAME);
            } else {
                store = db.createObjectStore(FAVORITES_STORE_NAME, { keyPath: 'id' });
            }

            // Create indexes
            if (!store.indexNames.contains('title')) {
                store.createIndex('title', 'title', { unique: false });
            }

            if (!store.indexNames.contains('titleLower')) {
                store.createIndex('titleLower', 'titleLower', { unique: false });
            }

            if (!store.indexNames.contains('addedAt')) {
                store.createIndex('addedAt', 'addedAt', { unique: false });
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

        const movieWithMeta = {
            ...movie,
            titleLower: movie.title.toLowerCase(),
            addedAt: Date.now(),
        };

        return new Promise((resolve, reject) => {
            const request = store.add(movieWithMeta);
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
    try {
        const db = await openDB();
        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result !== undefined);
            request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
        });
    } catch (error) {
        console.error('Failed to check favorite status:', error);
        return false;
    }
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

export const getPaginatedFavorites = async (
    params: PaginationParams
): Promise<PaginatedResult<MovieShortInfo>> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        let results: MovieShortInfo[] = [];
        let total = 0;

        const hasSearchTerm = params.searchTerm && params.searchTerm.trim() !== '';

        if (hasSearchTerm) {
            const searchResult = await searchAndPaginate(store, params);
            results = searchResult.data;
            total = searchResult.total;
        } else {
            const countRequest = await new Promise<number>((resolve, reject) => {
                const request = store.count();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
            total = countRequest;

            results = await getCursorPaginated(store, params.page, params.pageSize);
        }

        return {
            data: results,
            total,
            page: params.page,
            pageSize: params.pageSize,
            totalPages: Math.ceil(total / params.pageSize),
        };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Failed to get paginated favorites';
        throw new Error(message);
    }
};

const searchAndPaginate = async (
    store: IDBObjectStore,
    params: PaginationParams
): Promise<{ data: MovieShortInfo[]; total: number }> => {
    const searchLower = params.searchTerm!.toLowerCase();
    const index = store.index('titleLower');

    const range = IDBKeyRange.bound(searchLower, searchLower + '\uffff');

    const allMatches = await new Promise<MovieShortInfo[]>((resolve, reject) => {
        const request = index.getAll(range);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    const filtered = allMatches.filter(movie => movie.title.toLowerCase().includes(searchLower));

    const startIndex = (params.page - 1) * params.pageSize;
    const paginated = filtered.slice(startIndex, startIndex + params.pageSize);

    return {
        data: paginated,
        total: filtered.length,
    };
};

const getCursorPaginated = (
    store: IDBObjectStore,
    page: number,
    pageSize: number
): Promise<MovieShortInfo[]> => {
    return new Promise((resolve, reject) => {
        const results: MovieShortInfo[] = [];
        const skipCount = (page - 1) * pageSize;
        let skipped = 0;
        let collected = 0;

        const index = store.index('addedAt');
        const request = index.openCursor(null, 'prev');

        request.onsuccess = event => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

            if (!cursor || collected >= pageSize) {
                resolve(results);
                return;
            }

            if (skipped < skipCount) {
                skipped++;
                cursor.advance(1);
                return;
            }

            results.push(cursor.value);
            collected++;
            cursor.continue();
        };

        request.onerror = event => {
            reject((event.target as IDBRequest).error);
        };
    });
};

export const getFavoritesCount = async (): Promise<number> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(FAVORITES_STORE_NAME, 'readonly');
        const store = transaction.objectStore(FAVORITES_STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
        });
    } catch (error) {
        console.error('Failed to get favorites count:', error);
        return 0;
    }
};
