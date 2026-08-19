import React, { useMemo } from "react";

export function PrepositionFilter({ cards, selectedPrep, onSelectPrep }) {
    // Compute counts for ALL, NONE, and each individual preposition
    const { prepCounts, noneCount } = useMemo(() => {
        const counts = {};
        let none = 0;

        cards.forEach((card) => {
            if (!card.preposition || !card.preposition.trim()) {
                none++;
            } else {
                // Handle comma-separated prepositions (e.g., "about, with")
                const preps = card.preposition
                    .split(",")
                    .map((p) => p.trim())
                    .filter(Boolean);

                // Deduplicate prepositions per card to prevent double counting
                const uniquePreps = [...new Set(preps)];
                uniquePreps.forEach((prep) => {
                    counts[prep] = (counts[prep] || 0) + 1;
                });
            }
        });

        return { prepCounts: counts, noneCount: none };
    }, [cards]);

    // Sort prepositions alphabetically
    const sortedPreps = useMemo(() => {
        return Object.keys(prepCounts).sort();
    }, [prepCounts]);

    return (
        <select
            value={selectedPrep}
            onChange={(e) => onSelectPrep(e.target.value)}
            aria-label="Filter by Preposition"
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
            <option value="ALL">All Preps ({cards.length})</option>

            {noneCount > 0 && (
                <option value="NONE">No Prep ({noneCount})</option>
            )}

            {sortedPreps.map((prep) => (
                <option key={prep} value={prep}>
                    {prep} ({prepCounts[prep]})
                </option>
            ))}
        </select>
    );
}