const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ◀
      </button>

      <span>
        Page {page} of {pages}
      </span>

      <button disabled={page === pages} onClick={() => onChange(page + 1)}>
        ▶
      </button>
    </div>
  );
};

export default Pagination;
