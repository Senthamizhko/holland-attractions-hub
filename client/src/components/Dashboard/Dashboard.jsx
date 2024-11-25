import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import Category from '../Category/Category';
import LoadingState from '../LoadingState/LoadingState';
import { GET_CATEGORIES } from '../../graphql/queries';
import { SearchContext } from '../../context/SearchContext';
import './style.scss';

const DashBoard = () => {
  const { searchTerm } = useContext(SearchContext); // Access the search term
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <LoadingState />;
  if (error) return <p className="dashboard__error">{error.message}, Check if the server is running!</p>;

  const filteredCategories = data?.categories?.map((category) => ({
    ...category,
    deals: category.deals.filter((deal) =>
      deal.name.toLowerCase().includes(searchTerm)
    ),
  }));

  const isfilteredDataAvailable = filteredCategories.some((fc) => fc?.deals?.length > 0);

  return (
    <div className="dashboard">
      {isfilteredDataAvailable ?
      (filteredCategories?.map((category) => (category?.deals?.length > 0 &&
        <Category key={category.id} category={category} />
      )))
      :
      <p className='dashboard__not-found'>No deals available for the searched term</p>
    }
    </div>
  );
};

export default DashBoard;