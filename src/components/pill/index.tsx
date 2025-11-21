import { capitalizeWord } from '../../utils/string';

interface Props {
    text: string;
}

export const Pill = ({ text }: Props) => (
    <span className="border border-gray-700 rounded-xl p-1">{capitalizeWord(text)}</span>
);
