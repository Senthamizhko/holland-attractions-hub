import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './style.scss';

const Category = React.memo(({ category }) => {
  return (
    <div className="category">
      <h2 className="category__header">{category.name}</h2>
      <div className="category__cards">
        {category.deals.map((deal) => (
          <Card key={`${category.id}-${deal.id}`} deal={deal} />
        ))}
      </div>
    </div>
  );
});

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    deals: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Category;