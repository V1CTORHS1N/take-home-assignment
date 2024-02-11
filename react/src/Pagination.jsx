const Pagination = ({ currentPage, setCurrentPage, maxPage }) => {
  function handleNextPage() {
    setCurrentPage((page) => (page === maxPage ? page : page + 1));
  }

  function handlePrevPage() {
    setCurrentPage((page) => (page === 1 ? page : page - 1));
  }

  return (
    <div className="pagination">
      <button
        className={`pagination-button ${
          currentPage === 1 ? "" : "button-active"
        }`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {new Array(Math.max(1, maxPage)).fill(0).map((_, index) => (
        <button
          className={`pagination-button ${
            currentPage === index + 1 ? "" : "button-active"
          }`}
          key={index}
          disabled={index + 1 === currentPage}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`pagination-button ${
          currentPage >= maxPage ? "" : "button-active"
        }`}
        onClick={handleNextPage}
        disabled={currentPage >= maxPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
