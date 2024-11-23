import React from 'react';
import { useQuery } from '@apollo/client';
import Category from '../Category/Category';
import LoadingState from '../LoadingState/LoadingState';
import { GET_CATEGORIES } from '../../graphql/queries';
import './style.scss';

const DashBoard = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <LoadingState />;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="category-overview">
    {console.log(data?.categories)}
      {data?.categories?.map((category) => (
        <Category 
          key={category.id} 
          category={category} 
        />
      ))}
    </div>
  );
};

export default DashBoard;
