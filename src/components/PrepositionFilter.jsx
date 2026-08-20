import React, { useMemo } from "react";

export function PrepositionFilter({ cards, selectedPreps = [], onSelectPreps }) {
    // Compute total counts for each preposition
    const { prepCounts, noneCount } = useMemo(() => {
        const counts = {};
        let none = 0;

        cards.forEach((card) => {
            if (!card.preposition || !card.preposition.trim()) {
                none++;
            } else {
                const preps = card.preposition
                    .split(",")
                    .map((p) => p.trim())
                    .filter(Boolean);

                const uniquePreps = [...new Set(preps)];
                uniquePreps.forEach((prep) => {
                    counts[prep] = (counts[prep] || 0) + 1;
                });
            }
        });

        return { prepCounts: counts, noneCount: none };
    }, [cards]);

    const sortedPreps = useMemo(() => Object.keys(prepCounts).sort(), [prepCounts]);

    const handleCheckboxChange = (prep) => {
        if (selectedPreps.includes(prep)) {
            onSelectPreps(selectedPreps.filter((item) => item !== prep));
        } else {
            onSelectPreps([...selectedPreps, prep]);
        }
    };

    const handleSelectAll = () => {
        onSelectPreps([]); // Empty array represents "All / No Filter"
    };

    return (
        <div className="prep-filter-container">
            <div className="prep-checkbox-list">
                <label className="prep-checkbox-item">
                    <input
                        type="checkbox"
                        checked={selectedPreps.length === 0}
                        onChange={handleSelectAll}
                    />
                    <span>All ({cards.length})</span>
                </label>

                {sortedPreps.map((prep) => (
                    <label key={prep} className="prep-checkbox-item">
                        <input
                            type="checkbox"
                            checked={selectedPreps.includes(prep)}
                            onChange={() => handleCheckboxChange(prep)}
                        />
                        <span style={{ opacity: selectedPreps.includes(prep) ? 1 : 0.8 }}>
                            {prep} ({prepCounts[prep]})
                        </span>
                    </label>
                ))}

                {noneCount > 0 && (
                    <label className="prep-checkbox-item">
                        <input
                            type="checkbox"
                            checked={selectedPreps.includes("NONE")}
                            onChange={() => handleCheckboxChange("NONE")}
                        />
                        <span>No Prep ({noneCount})</span>
                    </label>
                )}
            </div>
        </div>
    );
}