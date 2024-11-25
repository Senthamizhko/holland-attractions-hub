import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import Category from '../Category/Category';
import LoadingState from '../LoadingState/LoadingState';
import NotFound from '../NotFound/NotFound';
import { GET_CATEGORIES } from '../../graphql/queries';
import { SearchContext } from '../../context/SearchContext';
import './style.scss';

const DashBoard = () => {
  const { searchTerm } = useContext(SearchContext);
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected filter

  if (loading) return <LoadingState />;
  if (error) return <NotFound message={`${error.message}, Check if the server is running!`} />;

    const filteredCategories = data?.categories?.map((category) => {
      // search term filtering
      const matchedSearchDeals = category.deals.filter((deal) => searchTerm ? deal.name.toLowerCase().includes(searchTerm) : true);
      return {
        ...category,
        deals: matchedSearchDeals,
      };
    }).filter((category) => {
      // button filtering
      const matchedButtonFilter = selectedCategory ? category.name === selectedCategory : true;
      return matchedButtonFilter && category.deals.length > 0;
    });

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
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev === category.name ? null : category.name
                )
              }
            >
              {category.filterName}
            </button>
          ))}
        </div>

        {filteredCategories?.length > 0 ? (
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

export default DashBoard;