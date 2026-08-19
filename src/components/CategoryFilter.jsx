export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}) {
    return (
        <div>

            <select
                value={selectedCategory}
                onChange={(e) =>
                    onCategoryChange(e.target.value)
                }
                style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    color: "#333",
                }}
            >
                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}