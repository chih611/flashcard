export default function EmptyState({ showMarkedOnly, handleToggleMarkedOnly }) {
    return (
        <div className="empty-container">
            <h2>No marked cards found 📚</h2>
            <div className="checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={showMarkedOnly}
                        onChange={(e) => handleToggleMarkedOnly(e.target.checked)}
                    />
                    Show marked Only
                </label>
            </div>
        </div>
    );
}