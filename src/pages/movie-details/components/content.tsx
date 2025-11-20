interface Props {
    genre: string;
    actors: string;
    director: string;
    writer: string;
    plot: string;
}

export const MovieDetailsContent = ({
    genre,
    actors,
    director,
    writer,
    plot,
}: Props) => (
    <div className="flex flex-col p-8 gap-8">
        <div>
            <h3 className="text-xl font-bold underline">Genre</h3>
            <span>{genre}</span>
        </div>

        <div>
            <h3 className="text-xl font-bold underline">Cast</h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <dt className="font-semibold">Actors</dt>
                <dd>{actors}</dd>
                <dt className="font-semibold">Director</dt>
                <dd>{director}</dd>
                <dt className="font-semibold">Writers</dt>
                <dd>{writer}</dd>
            </dl>
        </div>

        <div>
            <h3 className="text-xl font-bold underline">Plot</h3>
            <p>{plot}</p>
        </div>
    </div>
);
