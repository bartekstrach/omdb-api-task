interface Props {
    hasSearched: boolean;
}

export const EmptyState = ({ hasSearched }: Props) => {
    const headerText = hasSearched ? 'No results found' : 'Start your search';
    const message = hasSearched
        ? 'Try a different one!'
        : `Enter a movie title to find what you're looking for`;

    return (
        <div className="flex items-center flex-col gap-4">
            <h2 className="font-bold text-3xl">{headerText}</h2>
            <p>{message}</p>
        </div>
    );
};
