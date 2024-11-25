import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

const Card = ({ deal }) => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
      navigate(`/detail/${deal.id}`);
    }
  };

  return (
    <div
      className="card"
      role="article"
      aria-labelledby={`deal-title-${deal.id}`}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${deal.name}`}
    >
      <Link to={`/detail/${deal.id}`} className="card__link">
        <img
          src={deal.imageUrl}
          alt={deal.name}
          className="card__image"
          loading="lazy"
        />
        <h3 id={`deal-title-${deal.id}`} className="card__header">{deal.name}</h3>
        <p className="card__description">{deal.description}</p>
        <p className="card__price">Price per person: €{deal.price}</p>
      </Link>
      <div className="card__actions">
        <Link to={`/detail/${deal.id}`} className="card__actions__view-deal">
          View Deal
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  deal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;