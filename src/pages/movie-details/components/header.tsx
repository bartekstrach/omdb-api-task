import { HeartIcon as HeartIconOutlined, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

import { Pill } from '../../../components';

interface Props {
    title: string;
    year: string;
    runtime: string;
    type: string;
    rating: string;
    votes: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const MovieDetailsHeader = ({
    title,
    year,
    runtime,
    type,
    rating,
    votes,
    isFavorite,
    onToggleFavorite,
}: Props) => (
    <div className="flex justify-between bg-gradient-to-br from-white to-gray-200 p-8">
        <div className="flex flex-col">
            <div className="flex gap-x-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <button
                    className="rounded transition-colors cursor-pointer"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={onToggleFavorite}
                >
                    {isFavorite ? (
                        <HeartIcon className="h-6 w-6 text-gray-900" />
                    ) : (
                        <HeartIconOutlined className="hover:fill-current h-6 w-6 text-gray-900" />
                    )}
                </button>
            </div>

            <span>{year}</span>

            <div className="flex items-center gap-4 flex-wrap">
                <span>{runtime}</span>
                <Pill text={type} />
            </div>
        </div>

        <div className="flex gap-1">
            <StarIcon className="h-6 w-6 text-gray-900" />
            <span className="font-semibold">{rating}</span>
            <span>{`(${votes})`}</span>
        </div>
    </div>
);
