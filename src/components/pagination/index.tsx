interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-8 text-xs sm:text-sm md:text-base">
            <button
                className="bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <button
                className="bg-teal-100 hover:bg-teal-500 px-4 py-2 cursor-pointer"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};
