export default function Progress({
    currentIndex,
    totalCards,
}) {
    // Calculate percentage width dynamically
    const progressPercentage = Math.min(
        100,
        Math.max(0, ((currentIndex + 1) / totalCards) * 100)
    );

    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>
                Card {currentIndex + 1} of {totalCards}
            </h3>

            {/* Custom Progress Bar Container */}
            <div
                style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "#e5e7eb", // Light grey background
                    borderRadius: "6px",
                    overflow: "hidden",
                }}
            >
                {/* Filled Progress Bar */}
                <div
                    style={{
                        width: `${progressPercentage}%`,
                        height: "100%",
                        backgroundColor: "#059669", // Matching soft green
                        borderRadius: "6px",
                        transition: "width 0.3s ease-in-out", // Smooth animation when moving cards
                    }}
                />
            </div>
        </div>
    );
}