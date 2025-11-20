import { MovieType } from '../../types';

interface TypeDropdownProps {
    value: MovieType | undefined;
    onChange: (value: MovieType | undefined) => void;
    label?: string;
}

export const TypeDropdown = ({ value, onChange, label = 'Type' }: TypeDropdownProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'all') {
            onChange(undefined);
        } else if (['movie', 'series', 'episode'].includes(selectedValue)) {
            onChange(selectedValue as MovieType);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <label htmlFor="type" className="font-semibold">
                {label}
            </label>
            <select
                id="type"
                value={value || 'all'}
                onChange={handleChange}
                className="border border-gray-700 px-4 py-2"
            >
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
        </div>
    );
};
