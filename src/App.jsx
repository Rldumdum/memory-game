import { useState } from "react";
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
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardChoice, setCardChoice] = useState([]);
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
  cardChoice.map((item) => console.log('items in choice', item.id));
  console.log(cardChoice);

  console.log(score)
  return (
    <div>
      <h1>Memory game</h1>
      <p>
        Instruction: To get points, you must only click the image once. Or else,
        your score will reset
      </p>
      <div>
        <p>Score: 0</p>
        <p>Best Score: 10</p>
      </div>
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
