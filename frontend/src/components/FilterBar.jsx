const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

const FilterBar = ({ filter, setFilter, loading }) => {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {FILTERS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={filter === item.id ? "filter-btn filter-btn--active" : "filter-btn"}
          onClick={() => setFilter(item.id)}
          disabled={loading}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
