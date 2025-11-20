import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
    isLoading: boolean;
    onChange: (value: string) => void;
    onSearch?: () => void;
    placeholder?: string;
    value: string;
}

export const SearchBar = ({
    isLoading,
    onChange,
    onSearch,
    placeholder = 'Search by...',
    value,
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const clearSearch = () => {
        onChange('');
    };

    return (
        <div className="flex space-x-4">
            <div className="flex-1 relative">
                <input
                    className="w-full border border-gray-700 p-2"
                    onChange={handleChange}
                    placeholder={placeholder}
                    value={value ?? ''}
                />
                {value && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                )}
            </div>
            {onSearch && <button
                className="flex items-center space-x-2 bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                disabled={isLoading}
                onClick={onSearch}
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-900" />
                <span>Search</span>
            </button>}
        </div>
    );
};
