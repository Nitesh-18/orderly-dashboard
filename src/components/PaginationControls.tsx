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
        <div className="flex justify-center items-center mt-6 space-x-6">
            {/* Previous Button */}
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 
                    ${currentPage === 1
                        ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-500 transform hover:scale-105"
                    }`}
            >
                Previous
            </button>

            {/* Current Page Indicator */}
            <span className="text-white text-lg font-medium">
                Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 
                    ${currentPage === totalPages
                        ? "bg-gray-600 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-500 transform hover:scale-105"
                    }`}
            >
                Next
            </button>
        </div>
    );

};

export default PaginationControls;
