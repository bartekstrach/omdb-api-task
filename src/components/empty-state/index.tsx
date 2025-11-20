import { Message } from '../message';

interface Props {
    hasSearched: boolean;
}

export const EmptyState = ({ hasSearched }: Props) => {
    if (hasSearched) {
        <Message details="Try a different one!" title="No results found" />;
    }

    return (
        <Message
            details="Enter a movie title to find what you're looking for"
            title="Start your search"
        />
    );
};
