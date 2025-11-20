interface Props {
    details: string;
    title: string;
}

export const Message = ({ details, title }: Props) => (
    <div className="flex items-center flex-col gap-4">
        <h2 className="font-bold text-3xl">{title}</h2>
        <p>{details}</p>
    </div>
);
