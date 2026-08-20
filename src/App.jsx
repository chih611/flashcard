import { useEffect, useMemo, useState } from "react";
import { initialCards } from "./data/cards.js";
import FlashCard from "./components/FlashCard";
import Navigation from "./components/Navigation";
import Progress from "./components/Progress";
import CategoryFilter from "./components/CategoryFilter";
import Controls from "./components/Controls";
import AudioButton from "./components/AudioButton";
import EmptyState from "./components/EmptyState";

import "./App.css";
import { PrepositionFilter } from "./components/PrepositionFilter.jsx";
import { LevelFilter } from "./components/LevelFilter.jsx";

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : initialCards;
  });
  const [isReverseMode, setIsReverseMode] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [shuffleMode, setShuffleMode] = useState(false);

  const categories = ["All Categories", ...new Set(cards.map((c) => c.category))];

  const [selectedPrep, setSelectedPrep] = useState("ALL");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [selectedPreps, setSelectedPreps] = useState([]);

  const getInitialMarked = () => {
    try {
      const saved = localStorage.getItem("markedCardIds");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse marked items from localStorage", error);
      return [];
    }
  }


  const [markedIds, setMarkedIds] = useState(getInitialMarked);
  const [showMarkedOnly, setShowMarkedOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("markedCardIds", JSON.stringify(markedIds));
  }, [markedIds]);

  // 3. Hàm bật/tắt đánh dấu cho thẻ hiện tại
  const toggleMarkCard = (cardId) => {
    setMarkedIds((prevIds) =>
      prevIds.includes(cardId)
        ? prevIds.filter((id) => id !== cardId)
        : [...prevIds, cardId]
    );
  };
  // Logic lọc cards dựa trên component bộ lọc
  // Kết hợp lọc theo cả Preposition lẫn Level
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (showMarkedOnly && !markedIds.includes(card.id)) {
        return false;
      }

      // Preposition Multi-select Matching Logic
      let matchesPrep = true;
      if (selectedPreps.length > 0) {
        const cardPreps = card.preposition
          ? card.preposition.split(",").map((p) => p.trim())
          : [];

        matchesPrep = selectedPreps.some((selected) => {
          if (selected === "NONE") {
            return !card.preposition || cardPreps.length === 0;
          }
          return cardPreps.includes(selected);
        });
      }

      // Level Filter
      const matchesLevel =
        selectedLevel === "ALL"
          ? true
          : selectedLevel === "NONE"
            ? !card.level
            : card.level?.toUpperCase().trim() === selectedLevel;

      return matchesPrep && matchesLevel;
    });
  }, [cards, markedIds, showMarkedOnly, selectedPreps, selectedLevel]);
  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    if (shuffleMode) {
      handleRandom();
      return;
    }

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleRandom = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredCards.length);
    } while (filteredCards.length > 1 && randomIndex === currentIndex);

    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  };

  const speakWord = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleMarkedChange = (cardId, marked) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, marked } : card
    );
    setCards(updatedCards);
  };


  // XÓA HÀM NÀY đi vì ta đã có toggleMarkCard
  // const handleMarkedChange = (cardId, marked) => { ... }

  const handleToggleMarkedOnly = (checked) => {
    setShowMarkedOnly(checked);
    // Bỏ dòng localStorage ở đây đi vì useEffect đã tự động lo việc này
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("markedIds");
    setCards(initialCards);
    setCurrentIndex(0);
    setShowAnswer(false);
    setShowMasteredOnly(false);
    alert("Progress has been reset!");
  };

  if (filteredCards.length === 0) {
    return (
      <EmptyState
        showMarkedOnly={showMarkedOnly}
        handleToggleMarkedOnly={handleToggleMarkedOnly}
      />
    );
  }

  return (
    <div className="app-container">
      <Progress
        currentIndex={currentIndex}
        totalCards={filteredCards.length}
      />

      <Controls
        isReverseMode={isReverseMode}
        onToggleReverse={() => {
          setIsReverseMode((prev) => !prev);
          setShowAnswer(false);
        }}
        shuffleMode={shuffleMode}
        onToggleShuffle={() => setShuffleMode((prev) => !prev)}
        showMarkedOnly={showMarkedOnly}
        handleToggleMarkedOnly={handleToggleMarkedOnly}

        // SỬA 2 DÒNG DƯỚI ĐÂY:
        isCurrentCardMarked={currentCard ? markedIds.includes(currentCard.id) : false}
        onToggleCurrentCardMarked={() => toggleMarkCard(currentCard?.id)}

        onClearProgress={clearLocalStorage}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "15px",
          flexWrap: "wrap", // Tự động xuống hàng nếu màn hình điện thoại quá nhỏ
        }}
      >
        <div className="filters-row">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <LevelFilter
            cards={cards}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
        </div>
        <PrepositionFilter
          cards={cards}
          selectedPreps={selectedPreps}
          onSelectPreps={setSelectedPreps}
        />
      </div>

      <FlashCard
        card={currentCard}
        showAnswer={showAnswer}
        onFlip={() => setShowAnswer((prev) => !prev)}
        isReverseMode={isReverseMode}
      />

      <AudioButton onSpeak={() => speakWord(currentCard?.en)} />

      <Navigation
        onPrev={handlePrev}
        onNext={handleNext}
        onRandom={handleRandom}
        isFirstCard={currentIndex === 0}
        isLastCard={currentIndex === filteredCards.length - 1}
      />
    </div>
  );
}

export default App;