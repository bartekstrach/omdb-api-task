import { useState } from 'react';

interface Props {
    alt: string;
    height: number;
    src: string;
    width: number;
}

export const MoviePoster = ({ alt, height, src, width }: Props) => {
    const [hasError, setHasError] = useState<boolean>(false);

    const handleError = () => {
        setHasError(true);
    };

    return (
        <div
            className="bg-gray-200 flex items-center justify-center"
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            {hasError || !src ? (
                <span className="font-semibold text-xs">No image</span>
            ) : (
                <img
                    alt={alt}
                    className={`object-cover w-full h-full md:w-80`}
                    loading="lazy"
                    onError={handleError}
                    src={src}
                />
            )}
        </div>
    );
};
