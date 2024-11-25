import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { GET_CATEGORIES } from '../../graphql/queries';
import Category from '../Category/Category';
import LoadingState from '../LoadingState/LoadingState';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';
import Notification from '../Notification/Notification'; // Import the Notification component

const getProductById = (categories, id) => {
  return categories.flatMap((category) => category.deals).find((deal) => deal.id === id);
};

const getRelatedProducts = (categories, id) => {
  const relatedCategory = categories.find((category) =>
    category.deals.some((deal) => deal.id === id)
  );
  return relatedCategory ? relatedCategory.deals.filter((deal) => deal.id !== id) : [];
};

const DetailedView = ({ onAddToCart }) => {
  const { id } = useParams();
  const { cartDispatch } = useCart();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  
  const [numPersons, setNumPersons] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notification, setNotification] = useState(null); // Manage notification state

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const handleAddToCart = () => {
    if (!selectedDate) {
      showNotification('Please select a date to continue.', 'error'); // Show error if no date is selected
      return;
    }

    const cartItem = { ...product, numPersons, selectedDate };
    cartDispatch({ type: 'ADD_TO_CART', payload: cartItem });
    showNotification('Item has been added to the cart!', 'success');
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) return <p className="error">Error: {error.message}</p>;

  const product = getProductById(data.categories, id);
  if (!product) return <p>Product not found.</p>;

  const relatedProducts = getRelatedProducts(data.categories, id);

  return (
    <div className="detailed-view">
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      <div className="detailed-view__detail">
        <img src={product.imageUrl} alt={product.name} className="detailed-view__detail__image" loading="lazy" />
        <div className="detailed-view__detail__info">
          <h1 className="detailed-view__detail__info__header">{product.name}</h1>
          <p>{product.description}</p>
          {product.detailedDescription && <p>{product.detailedDescription}</p>}
          <p className="price">€{product.price}</p>
          <p>Discount: {product.discount}%</p>
          <p>Offer expires on: {new Date(product.expiresAt).toLocaleString()}</p>

          <div className="num-persons">
            <label>Number of Persons:</label>
            <div className="num-persons__controls">
              <button onClick={() => setNumPersons(Math.max(1, numPersons - 1))} className="num-persons__controls__btn">-</button>
              <span>{numPersons}</span>
              <button onClick={() => setNumPersons(numPersons + 1)} className="num-persons__controls__btn">+</button>
            </div>
          </div>

          <div className="availability">
            <label>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
              className="availability__datepicker"
              placeholderText="Choose a date"
            />
          </div>

          <button
            className="detailed-view__detail__info__add-cart"
            onClick={handleAddToCart}
            // disabled={!selectedDate} // Disable the button if no date is selected
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Category 
        category={{ name: "Discover Extra Gems", id: 'Similar-items', deals: relatedProducts }}
      />
    </div>
  );
};

export default DetailedView;