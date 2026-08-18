export default function AudioButton({ onSpeak }) {
    return (
        <button
            className="btn-audio"
            onClick={onSpeak}
            title="Pronounce word"
            aria-label="Pronounce word"
        >
            🔊
        </button>
    );
}