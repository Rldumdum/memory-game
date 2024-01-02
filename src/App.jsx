import { useState, useEffect } from "react";
import "./App.css";
import "./styles/outerCard.scss";
import CardItem from "./components/CardItem";

const images = [
  { src: "https://picsum.photos/id/29/350/300", name: "Go Wild" },
  { src: "https://picsum.photos/id/30/350/300", name: "Shyamanata Baruah" },
  { src: "https://picsum.photos/id/31/350/300", name: "How-Soon-ngu" },
  { src: "https://picsum.photos/id/32/350/300", name: "Rodrigo Melo" },
  { src: "https://picsum.photos/id/33/350/300", name: "Alejandro Escamilla" },
  { src: "https://picsum.photos/id/34/350/300", name: "Aleks Dorohovich" },
  { src: "https://picsum.photos/id/35/350/300", name: "Shane Colella" },
  { src: "https://picsum.photos/id/36/350/300", name: "Vadim Sherbakov" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardChoice, setCardChoice] = useState([]);
  const [score, setScore] = useState(-2);
  const [bestScore, setBestScore] = useState(0);
  const shuffleCards = () => {
    const shuffledCards = [...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setGameStarted(true);
  };

  const handleChoice = (card) => {
    setCardChoice((prevCard) => [...prevCard, card]);
  };
  const checkvalue = cardChoice.map((item) => {
    return item.id;
  });

  const isDuplicate = checkvalue.some((item, index) => {
    console.log('item', item)
    return checkvalue.indexOf(item) != index;
  });

  useEffect(() => {
    if (isDuplicate) {
      setCardChoice([]);
      setScore(-1);
    } else {
      setScore((prevScore) => prevScore + 1);
    }
    return () => {};
  }, [cardChoice, isDuplicate]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }

    cards.sort(() => Math.random() - 0.6);

    return () => {};
  }, [score, bestScore, cards]);

  return (
    <div>
      <h1>Memory game</h1>
      <p>
        Instruction: Test your memory skills by clicking on different images
        without repeating.
      </p>
      {gameStarted && (
        <div>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      )}
      {!gameStarted && <button onClick={shuffleCards}>Start Game</button>}
      {gameStarted && (
        <div className="outerCard">
          {cards.map((card) => {
            return (
              <CardItem key={card.id} card={card} handleChoice={handleChoice} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
