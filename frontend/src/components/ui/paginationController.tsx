type Props = {
  page: number; 
  pageCount: number; 
  loading?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
};

export const PaginationController: React.FC<Props> = ({
  page,
  pageCount,
  loading = false,
  onNext,
  onPrev,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    if (pageCount <= 6) return [...Array(pageCount).keys()];

    if (page < 3) {
      pages.push(0, 1, 2, -1, pageCount - 3, pageCount - 2, pageCount - 1);
    } else if (page > pageCount - 4) {
      pages.push(0, 1, 2, -1, pageCount - 3, pageCount - 2, pageCount - 1);
    } else {
      pages.push(
        0,
        1,
        -1,
        page - 1,
        page,
        page + 1,
        -1,
        pageCount - 2,
        pageCount - 1
      );
    }
    return pages;
  };

  return (
    <div className="mt-8 flex w-full justify-end">
      <nav className="flex items-center space-x-1">
        <span className="sm:hidden flex h-9 items-center justify-center px-3 text-sm text-gray-600 whitespace-nowrap">
          {loading ? (
            <div className="lds-ellipsis-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            `${page + 1} / ${pageCount}`
          )}
        </span>

        <button
          onClick={onPrev}
          disabled={page === 0 || loading}
          className="flex h-9 items-center justify-center px-5 text-sm font-medium leading-5 bg-white text-[#020618] rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer gap-1"
        >
          {loading ? (
            <div className="lds-ellipsis-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              <span className="text-2xl leading-none -mt-2">‹</span>
              <span className="hidden sm:inline">Previous</span>
            </>
          )}
        </button>

        <div className="hidden sm:flex items-center space-x-1">
          {loading ? (
            <div className="lds-ellipsis-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            getPageNumbers().map((p, index) => (
              <div key={index}>
                {p === -1 ? (
                  <span className="flex h-9 w-9 items-center justify-center text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(p)}
                    className={`flex h-9 w-9 items-center justify-center text-sm font-medium rounded transition-colors cursor-pointer min-w-9 ${
                      p === page
                        ? "text-black border border-gray-200 hover:bg-gray-100"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {p + 1}
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <button
          onClick={onNext}
          disabled={page >= pageCount - 1 || loading}
          className="w-[78px] h-10 flex items-center justify-center pl-4 pr-2.5 pt-0 pb-0 text-sm font-medium bg-white text-gray-900 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer gap-1"
        >
          {loading ? (
            <div className="lds-ellipsis-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <>
              <span className="hidden sm:inline">Next</span>
              <span className="text-2xl leading-none -mt-2">›</span>
            </>
          )}
        </button>
      </nav>
    </div>
  );
};
