import React from "react";
import "../styles/card.scss";

const CardItem = ({ card, handleChoice}) => {

  const handleClick = () => {
    handleChoice(card)

  }
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-img">
        <img src={card.src} className="card-img"></img>
      </div>
      <p className="card-text">{card.name}</p>
    </div>
  );
};

export default CardItem;
