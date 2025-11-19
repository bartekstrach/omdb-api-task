import { useParams } from 'react-router';

export const MovieDetailsPage = () => {
    const params = useParams();

    return (
        <>
            <p>Movie details {`${params.id ?? '-'}`}</p>
        </>
    );
};
