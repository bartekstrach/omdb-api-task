export const queryBuilder = (
    params: Record<string, string | number | boolean | undefined | null>
): string => {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        // Ignore undefined, null and empty strings
        if (value !== undefined && value !== '' && value !== null) {
            search.append(key, String(value));
        }
    });

    return search.toString();
};
