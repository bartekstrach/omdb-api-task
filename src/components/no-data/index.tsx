export const NoData = () => (
    <div className="flex justify-center items-center gap-24">
        <img
            alt="'See no evil, hear no evil' movie poster"
            className="max"
            src="https://m.media-amazon.com/images/M/MV5BOThiYmVhMTItZGFiNS00MDRmLTkwZWUtODcyNGZlYmMzZGRlXkEyXkFqcGc@._V1_SX300.jpg"
        />
        <div className="flex flex-col gap-4">
            <h2 className="font-bold text-3xl">No results</h2>
            <span>Try a different one!</span>
        </div>
    </div>
);
