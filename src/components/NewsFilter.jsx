export function NewsFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-3 min-w-max pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
