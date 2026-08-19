import React, { useMemo } from "react";

export const LevelFilter = ({ cards, selectedLevel, onSelectLevel }) => {
    // Trích xuất danh sách các Level duy nhất từ data
    const availableLevels = useMemo(() => {
        const levelSet = new Set();
        cards.forEach((card) => {
            if (card.level) {
                levelSet.add(card.level.toUpperCase().trim());
            }
        });
        return Array.from(levelSet).sort();
    }, [cards]);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
                id="level-filter"
                value={selectedLevel}
                onChange={(e) => onSelectLevel(e.target.value)}
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
                <option value="ALL">All Levels</option>
                {availableLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                        {lvl}
                    </option>
                ))}
            </select>
        </div>
    );
};