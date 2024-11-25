import React, { useContext, useState, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import Category from '../Category/Category';
import LoadingState from '../LoadingState/LoadingState';
import NotFound from '../NotFound/NotFound';
import { GET_CATEGORIES } from '../../graphql/queries';
import { SearchContext } from '../../context/SearchContext';
import './style.scss';

const DashBoard = () => {
  const { searchTerm } = useContext(SearchContext);
  const { loading, error, data } = useQuery(GET_CATEGORIES, { fetchPolicy: 'cache-first' });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilterClick = useCallback((categoryName) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  }, []);

  const filteredCategories = useMemo(() => {
    if (!data?.categories) return [];
    return data.categories
      .map((category) => ({
        ...category,
        deals: category.deals.filter((deal) =>
          searchTerm ? deal.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
        ),
      }))
      .filter((category) =>
        (selectedCategory ? category.name === selectedCategory : true) &&
        category.deals.length > 0
      );
  }, [data?.categories, searchTerm, selectedCategory]);

  if (loading) return <LoadingState />;
  if (error) return <NotFound message={`${error.message}, Check if the server is running!`} />;

  return (
    <div className="dashboard">
      <div className="dashboard__sections">
        <div className="dashboard__filter-bar">
          {data?.categories?.map((category) => (
            <button
              key={category.id}
              className={`dashboard__filter-bar__button ${
                selectedCategory === category.name ? 'active' : ''
              }`}
              onClick={() => handleFilterClick(category.name)}
            >
              {category.filterName}
            </button>
          ))}
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Category key={category.id} category={category} />
          ))
        ) : (
          <p className="dashboard__not-found">No results found. Try a different filter or search term.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(DashBoard);