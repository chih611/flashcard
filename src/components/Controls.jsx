export default function Controls({
    isReverseMode,
    onToggleReverse,
    shuffleMode,
    onToggleShuffle,
    showMarkedOnly,
    handleToggleMarkedOnly,
    isCurrentCardMarked,
    onToggleCurrentCardMarked,
    onClearProgress,
}) {
    return (
        <div className="controls-container">
            <div className="button-group">
                <button className="btn btn-danger" onClick={onClearProgress}>
                    Clear Progress
                </button>
                <button className="btn btn-secondary" onClick={onToggleReverse}>
                    {isReverseMode ? "Normal Mode" : "Reverse Mode"}
                </button>
                <button className="btn btn-secondary" onClick={onToggleShuffle}>
                    {shuffleMode ? "Shuffle ON" : "Shuffle OFF"}
                </button>
            </div>

            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={showMarkedOnly}
                        onChange={(e) => handleToggleMarkedOnly(e.target.checked)}
                    />
                    Show Marked Only
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={isCurrentCardMarked}
                        onChange={() => onToggleCurrentCardMarked()} // Bỏ e.target.checked đi
                    />
                    Marked
                </label>
            </div>
        </div>
    );
}