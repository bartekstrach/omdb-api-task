export const queryBuilder = (
    params: Record<string, string | number | boolean | undefined>
): string => {
    const search = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            // TODO: what to do with params without any value
            search.append(key, String(value));
        }
    });

    return search.toString();
};
