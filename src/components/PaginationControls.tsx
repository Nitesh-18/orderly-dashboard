import React from "react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return (
        <div className="flex justify-center items-center mt-4 space-x-4">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
