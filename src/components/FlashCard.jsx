import { motion } from "framer-motion";

export default function FlashCard({
    card,
    showAnswer,
    onFlip,
    isReverseMode,
}) {
    const renderSide = (
        primary,
        secondary,
        isMeaning = false,
        isBack = false,
        prep = null,
        example = null,
        example2 = null,
        level = null
    ) => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "center",
                position: "relative",
                padding: "20px 16px",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            {/* Level Badge */}
            {level && (
                <span
                    style={{
                        alignSelf: "center",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        backgroundColor: isBack ? "rgba(255, 255, 255, 0.2)" : "#e0e0e0",
                        color: isBack ? "#fff" : "#333",
                        textTransform: "uppercase",
                    }}
                >
                    {level}
                </span>
            )}

            {/* Primary Text */}
            <div style={{ fontSize: isMeaning ? "1.1rem" : "1.35rem", fontWeight: "bold", lineHeight: "1.4" }}>
                {primary}
            </div>

            {/* Secondary Text */}
            <div
                style={
                    isMeaning
                        ? { fontSize: "1rem", opacity: 0.9 }
                        : {
                            fontSize: "0.85rem",
                            color: isBack ? "rgba(255, 255, 255, 0.85)" : "#666",
                            fontWeight: "bold",
                        }
                }
            >
                {secondary}
            </div>

            {/* Preposition */}
            {prep && (
                <div
                    style={{
                        fontSize: "0.85rem",
                        fontStyle: "italic",
                        color: isBack ? "rgba(255, 255, 255, 0.75)" : "#888",
                    }}
                >
                    + prep: {prep}
                </div>
            )}

            {/* Examples Container */}
            {(example || example2) && (
                <div
                    style={{
                        marginTop: "6px",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        fontSize: "0.825rem",
                        fontStyle: "italic",
                        backgroundColor: isBack ? "rgba(255, 255, 255, 0.15)" : "#f5f5f5",
                        color: isBack ? "#fff" : "#444",
                        borderLeft: isBack ? "3px solid #fff" : "3px solid #007bff",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        lineHeight: "1.35",
                    }}
                >
                    {example && (
                        <div>
                            <strong>Ex 1:</strong> "{example}"
                        </div>
                    )}
                    {example2 && (
                        <div>
                            <strong>Ex 2:</strong> "{example2}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
    const frontText = isReverseMode
        ? renderSide(
            card.explain || card.meaning,
            card.answer || card.meaning,
            true,
            false,
            null
        )
        : renderSide(
            card.question || card.en,
            card.pronunciation,
            false,
            false,
            card.preposition,
            card.example,
            card.example2,
            card.level
        );

    const backText = isReverseMode
        ? renderSide(
            card.question || card.en,
            card.pronunciation,
            false,
            true,
            card.preposition,
            card.example,
            card.example2,
            card.level
        )
        : renderSide(
            card.answer || card.meaning,
            card.explain,
            true,
            true,
            null
        );

    return (
        <div
            style={{
                perspective: "1000px",
                height: "250px",
                marginBottom: "60px",
            }}
        >
            <motion.div
                onClick={onFlip}
                animate={{
                    rotateY: showAnswer ? 180 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    cursor: "pointer",
                }}
            >
                {/* Front Side */}
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        border: "2px solid #ddd",
                        borderRadius: "12px",
                        background: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                        padding: "20px",
                    }}
                >
                    {frontText}
                </div>

                {/* Back Side */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        border: "2px solid #047857",
                        borderRadius: "12px",
                        background: "#059669", /* Soft emerald green */
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                        padding: "20px",
                    }}
                >
                    {backText}
                </div>
            </motion.div>
        </div>
    );
}