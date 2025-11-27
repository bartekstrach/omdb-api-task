import { MovieType } from '../../types';
import { capitalizeWord } from '../../utils/string';

interface TypeDropdownProps {
    value: MovieType | undefined;
    onChange: (value: MovieType | undefined) => void;
    label?: string;
}

const DEFAULT_OPTION = 'all';

export const TypeDropdown = ({ value, onChange, label = 'Type' }: TypeDropdownProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        if (selectedValue === DEFAULT_OPTION) {
            onChange(undefined);
        } else if (Object.values(MovieType).includes(selectedValue as MovieType)) {
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
                value={value || DEFAULT_OPTION}
                onChange={handleChange}
                className="border border-gray-700 px-4 py-2"
            >
                <option value={DEFAULT_OPTION}>{capitalizeWord(DEFAULT_OPTION)}</option>
                {Object.values(MovieType).map(type => (
                    <option key={type} value={type}>
                        {capitalizeWord(type)}
                    </option>
                ))}
            </select>
        </div>
    );
};
