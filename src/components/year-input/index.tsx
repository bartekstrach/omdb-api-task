interface Props {
    value: string;
    onChange: (value: string) => void;
    minYear?: number;
    maxYear?: number;
    label?: string;
    placeholder?: string;
}

export const YearInput = ({
    value,
    onChange,
    minYear = 1900,
    maxYear = 2025,
    label = 'Year',
    placeholder = 'Enter year',
}: Props) => {
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/[^0-9]/g, '');

        if (inputValue.length > 4) {
            return;
        }

        onChange(inputValue);
    };

    const isValid = () => {
        if (!value) {
            return true;
        }

        const year = parseInt(value, 10);
        return year >= minYear && year <= maxYear && value.length === 4;
    };

    return (
        <div className="flex items-center space-x-4">
            <label htmlFor="year-input" className="font-semibold">
                {label}
            </label>
            <input
                className="border border-gray-700 p-2"
                id="year-input"
                type="text"
                inputMode="numeric"
                placeholder={placeholder}
                onChange={handleYearChange}
                value={value}
            />
            {value && !isValid() && (
                <p className="text-red-500 text-sm mt-1">
                    Please enter a valid year between {minYear} and {maxYear}
                </p>
            )}
        </div>
    );
};
