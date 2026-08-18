export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label
                style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                }}
            >
                Category:
            </label>

            <select
                value={selectedCategory}
                onChange={(e) =>
                    onCategoryChange(e.target.value)
                }
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