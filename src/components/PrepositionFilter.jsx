import React, { useMemo } from "react";

export const PrepositionFilter = ({ cards, selectedPrep, onSelectPrep }) => {
    // Trích xuất và loại bỏ các giới từ trùng nhau
    const availablePrepositions = useMemo(() => {
        const prepSet = new Set();
        cards.forEach((card) => {
            if (card.preposition) {
                card.preposition.split(",").forEach((p) => prepSet.add(p.trim()));
            }
        });
        return Array.from(prepSet).sort();
    }, [cards]);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <select
                id="prep-filter"
                value={selectedPrep}
                onChange={(e) => onSelectPrep(e.target.value)}
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
                <option value="ALL">All Prepositions</option>
                <option value="NONE">No Preposition</option>
                {availablePrepositions.map((prep) => (
                    <option key={prep} value={prep}>
                        + {prep}
                    </option>
                ))}
            </select>
        </div>
    );
};