import React, { useMemo } from "react";

export function LevelFilter({ cards, selectedLevel, onSelectLevel }) {
    // Compute card counts for each level (A1, A2, B1, B2, C1, C2, etc.)
    const { levelCounts, noLevelCount } = useMemo(() => {
        const counts = {};
        let noLevel = 0;

        cards.forEach((card) => {
            const level = card.level?.toUpperCase().trim();
            if (!level) {
                noLevel++;
            } else {
                counts[level] = (counts[level] || 0) + 1;
            }
        });

        return { levelCounts: counts, noLevelCount: noLevel };
    }, [cards]);

    // Sort levels logically (A1 -> A2 -> B1 -> B2 -> C1 -> C2)
    const sortedLevels = useMemo(() => {
        const standardOrder = ["A1", "A2", "B1", "B2", "C1", "C2"];
        const keys = Object.keys(levelCounts);

        return keys.sort((a, b) => {
            const idxA = standardOrder.indexOf(a);
            const idxB = standardOrder.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [levelCounts]);

    return (
        <select
            value={selectedLevel}
            onChange={(e) => onSelectLevel(e.target.value)}
            aria-label="Filter by Level"
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
            <option value="ALL">All Levels ({cards.length})</option>

            {sortedLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                    {lvl} ({levelCounts[lvl]})
                </option>
            ))}

            {noLevelCount > 0 && (
                <option value="NONE">No Level ({noLevelCount})</option>
            )}
        </select>
    );
}