import { useState, useEffect } from "react";
import "./App.css";
import "./styles/outerCard.scss";
import CardItem from "./components/CardItem";
import { Shake } from "reshake";
import Modal from "react-modal";
import { motion } from "framer-motion";
import backIcon from '/back-icon.svg'

const easy_images = [
  { src: "https://picsum.photos/id/29/350/300", name: "Go Wild" },
  { src: "https://picsum.photos/id/30/350/300", name: "Shyamanata Baruah" },
  { src: "https://picsum.photos/id/31/350/300", name: "How-Soon-ngu" },
  { src: "https://picsum.photos/id/32/350/300", name: "Rodrigo Melo" },
  { src: "https://picsum.photos/id/33/350/300", name: "Alejandro Escamilla" },
  { src: "https://picsum.photos/id/34/350/300", name: "Aleks Dorohovich" },
  { src: "https://picsum.photos/id/35/350/300", name: "Shane Colella" },
  { src: "https://picsum.photos/id/36/350/300", name: "Vadim Sherbakov" },
];
const hard_images = [
  { src: "/photos_hard/ai-1.jpg" },
  { src: "/photos_hard/ai-2.jpg" },
  { src: "/photos_hard/ai-3.jpg" },
  { src: "/photos_hard/ai-4.jpg" },
  { src: "/photos_hard/ai-5.jpg" },
  { src: "/photos_hard/ai-6.jpg" },
  { src: "/photos_hard/ai-7.jpg" },
  { src: "/photos_hard/ai-8.jpg" },
  { src: "/photos_hard/ai-9.jpg" },
  { src: "/photos_hard/ai-10.jpg" },
  { src: "/photos_hard/ai-11.jpg" },
  { src: "/photos_hard/ai-12.jpg" },
  { src: "/photos_hard/ai-13.jpg" },
];
const hardcore_images = [
  { src: "/photos_hardcore/Finn/ai-1.jpg" },
  { src: "/photos_hardcore/Finn/ai-2.jpg" },
  { src: "/photos_hardcore/Finn/ai-3.jpg" },
  { src: "/photos_hardcore/Finn/ai-4.jpg" },
  { src: "/photos_hardcore/Finn/ai-5.jpg" },
  { src: "/photos_hardcore/Finn/ai-6.jpg" },
  { src: "/photos_hardcore/Finn/ai-7.jpg" },
  { src: "/photos_hardcore/Finn/ai-8.jpg" },
  { src: "/photos_hardcore/Finn/ai-9.jpg" },
  { src: "/photos_hardcore/Jake/ai-1.jpg" },
  { src: "/photos_hardcore/Jake/ai-2.jpg" },
  { src: "/photos_hardcore/Jake/ai-3.jpg" },
  { src: "/photos_hardcore/Jake/ai-4.jpg" },
  { src: "/photos_hardcore/Jake/ai-5.jpg" },
  { src: "/photos_hardcore/Jake/ai-6.jpg" },
  { src: "/photos_hardcore/Jake/ai-7.jpg" },
  { src: "/photos_hardcore/Jake/ai-8.jpg" },
  { src: "/photos_hardcore/Jake/ai-9.jpg" },
];

function App() {
  const maxscore =
    easy_images.length + hard_images.length + hardcore_images.length;
  const [cards, setCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardChoice, setCardChoice] = useState([]);
  const [score, setScore] = useState(-2);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [h, setH] = useState(0);
  const [scale, setScale] = useState(0);
  let imageToShuffle;
  const shuffleCards = (version) => {
    switch (version) {
      case "easy":
        setDifficulty("Easy");
        imageToShuffle = easy_images;
        break;
      case "hard":
        setDifficulty("Hard");
        imageToShuffle = hard_images;
        break;
      case "hardcore":
        setDifficulty("Hardcore");
        imageToShuffle = hardcore_images;
        break;
    }
    const shuffledCards = [...imageToShuffle]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    console.log("card has been shuffled");

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
    console.log("item", item);
    return checkvalue.indexOf(item) != index;
  });

  useEffect(() => {
    if (isDuplicate) {
      setCardChoice([]);
      setScore(-1);
      setH(200);

      // cleanUp
    } else {
      setScore((prevScore) => prevScore + 1);
    }
    return () => {};
  }, [cardChoice, isDuplicate]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }

    if (difficulty === "Easy" && score === easy_images.length) {
      setModalIsOpen(true);
      setScale(1);
      setTimeout(() => {
        setScale(0);
      }, 2000);
      setTimeout(() => {
        setModalIsOpen(false);
      }, 3000);
      shuffleCards("hard");
    } else if (
      difficulty === "Hard" &&
      score === hard_images.length + easy_images.length
    ) {
      setModalIsOpen(true);
      setScale(1);
      setTimeout(() => {
        setScale(0);
      }, 2000);
      setTimeout(() => {
        setModalIsOpen(false);
      }, 3000);
      shuffleCards("hardcore");
    } else if (difficulty === "Hardcore" && score === maxscore) {
      alert("You won the game");
      setGameStarted(false);
    }

    cards.sort(() => Math.random() - 0.6);

    return () => {};
  }, [score, bestScore, cards]);

  useEffect(() => {
    if (h !== 0) {
      setTimeout(() => {
        setH((prevH) => prevH - 10);
      }, 10);
    }
  }, [h]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      height: "420px",
    },
  };

  return (
    <div>
      {gameStarted && (
        <>
          <img
            style={{
              position: "absolute",
              left: "100px",
              height: "50px",
              width: "50px",
              cursor: "pointer",
            }}
            onClick={() => {
              setScore(0);
              setGameStarted(false);
            }}
            src={backIcon}
          ></img>
          <h3 style={{ position: "absolute", right: "100px" }}>
            Max Score: {maxscore}
          </h3>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="EXAMPLE MODAL"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: scale }}
          transition={{ duration: 2 }}
        >
          <h1>Congratulations!</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>
              Difficulty:
              <p
                style={{
                  color:
                    difficulty === "Easy"
                      ? "green"
                      : difficulty === "Hard"
                      ? "orange"
                      : "red",
                }}
              >
                {difficulty}
              </p>
            </h1>
          </div>
        </motion.div>
      </Modal>
      <h1>Memory game</h1>
      <p>
        Instruction: Test your memory skills by clicking on different images
        without repeating.
      </p>
      {gameStarted && (
        <div>
          <p
            style={{
              color:
                difficulty === "Easy"
                  ? "green"
                  : difficulty === "Hard"
                  ? "orange"
                  : "red",
            }}
          >
            Difficulty: {difficulty}
          </p>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      )}
      {!gameStarted && (
        <>
          <h2>Select your level of difficulty: </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <button onClick={() => shuffleCards("easy")}>Easy</button>
            <button onClick={() => shuffleCards("hard")}>Hard</button>
            <button onClick={() => shuffleCards("hardcore")}>Hardcore</button>
          </div>
        </>
      )}
      {gameStarted && (
        <div className="outerCard">
          {cards.map((card) => {
            return (
              <Shake
                h={h}
                v={0}
                r={0}
                dur={560}
                int={18}
                max={100}
                fixed={true}
                fixedStop={false}
                freez={true}
                key={card.id}
              >
                <CardItem
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  h={h}
                />
              </Shake>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
