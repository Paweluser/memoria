import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <Link
        href={`?page=${currentPage - 1}`}
        className={`rounded-md border border-(--border-color) p-1.5 ${
          prevDisabled
            ? "pointer-events-none opacity-40"
            : "hover:bg-(--table-header-bg)"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      <span className="text-sm">
        Strona {currentPage} z {totalPages}
      </span>

      <Link
        href={`?page=${currentPage + 1}`}
        className={`rounded-md border border-(--border-color) p-1.5 ${
          nextDisabled
            ? "pointer-events-none opacity-40"
            : "hover:bg-(--table-header-bg)"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
