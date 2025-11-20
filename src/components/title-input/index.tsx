import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

export const TitleInput = ({
    value,
    onChange,
    label,
    placeholder = 'Search by title...',
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const clear = () => {
        onChange('');
    };

    return (
        <div className="flex items-center space-x-4">
            {label && (
                <label htmlFor="title-input" className="font-semibold">
                    {label}
                </label>
            )}
            <div className="flex-1 relative">
                <input
                    className="w-full border border-gray-700 p-2"
                    id="title-input"
                    type="text"
                    onChange={handleChange}
                    placeholder={placeholder}
                    value={value ?? ''}
                />
                {value && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                        onClick={clear}
                        aria-label={`Clear ${label}`}
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
};
