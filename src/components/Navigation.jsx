export default function Navigation({
    onPrev,
    onNext,
    onRandom,
    isFirstCard,
    isLastCard,
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
            }}
        >
            <button
                onClick={onPrev}
                disabled={isFirstCard}
            >
                Previous
            </button>

            <button onClick={onRandom}>
                🎲 Random
            </button>

            <button
                onClick={onNext}
                disabled={isLastCard}
            >
                Next
            </button>
        </div>
    );
}