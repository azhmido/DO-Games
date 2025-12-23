import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* First Page */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="p-2 bg-slate-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
        aria-label="Go to first page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </motion.button>

      {/* Previous Page */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 bg-slate-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Page Numbers */}
      {Array.from({ length: end - start + 1 }, (_, i) => {
        const pageNum = start + i;
        return (
          <motion.button
            key={pageNum}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === pageNum
                ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </motion.button>
        );
      })}

      {/* Next Page */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 bg-slate-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>

      {/* Last Page */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="p-2 bg-slate-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
        aria-label="Go to last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </motion.button>

      {/* Page Info */}
      <div className="ml-6 px-4 py-2 bg-slate-800 rounded-lg">
        <span className="text-sm text-slate-300">
          Page <span className="text-sky-400 font-bold">{currentPage}</span> of{" "}
          <span className="text-cyan-400 font-bold">{totalPages}</span>
        </span>
      </div>
    </div>
  );
}

export default Pagination;