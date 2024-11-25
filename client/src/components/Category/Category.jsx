import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './style.scss';

const Category = React.memo(({ category }) => {
  return (
    <div className="category">
      {category.deals.length > 0 && <h2 className="category__header">{category.name}</h2>}
      <div className="category__cards">
        {category.deals.map((deal) => (
          <Card key={`${category.id}-${deal.id}`} deal={deal} />
        ))}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.category.id === nextProps.category.id &&
    prevProps.category.name === nextProps.category.name &&
    prevProps.category.deals.length === nextProps.category.deals.length
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