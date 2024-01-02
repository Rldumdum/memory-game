import "../styles/card.scss";
import PropTypes from "prop-types";

const CardItem = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-img">
        <img src={card.src} className="card-img"></img>
      </div>
      <p className="card-text">{card.name}</p>
    </div>
  );
};
CardItem.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
};
export default CardItem;
