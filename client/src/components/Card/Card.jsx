import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

const Card = ({ deal }) => {
  return (
    <div className="card">
      <Link to={`/product/${deal.id}`} className="card__link" key={deal.id}>
        <img 
          src={deal.imageUrl} 
          alt={deal.name} 
          className="card__image" 
          loading="lazy" 
        />
        <h3 className="card__header">{deal.name}</h3>
        <p className="card__description">{deal.description}</p>
        <p className="card__price">Price per person: €{deal.price}</p>
      </Link>
      <div className="card__actions">
        <Link to={`/product/${deal.id}`} className="card__actions__view-deal">
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