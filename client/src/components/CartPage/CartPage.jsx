import React from 'react';
import { useCart } from '../../context/CartContext';
import './style.scss';

const CartPage = () => {
  const { cartState, cartDispatch } = useCart();
  const { cartItems } = cartState;

  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  // Group items by ID and selected date and sum the number of persons
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.selectedDate || ''}`;
    if (acc[key]) {
      acc[key].numPersons += item.numPersons || 1; 
    } else {
      acc[key] = { ...item };
    }
    return acc;
  }, {});

  const uniqueCartItems = Object.values(groupedItems);

  const totalPrice = uniqueCartItems.reduce(
    (acc, item) => acc + item.price * (item.numPersons || 1),
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-page__header">Your Cart</h1>
      {uniqueCartItems.length === 0 ? (
        <p className="cart-page__empty">No activities in your cart</p>
      ) : (
        <div>
          <ul className="cart-page__items">
            {uniqueCartItems.map((item) => (
              <li key={`${item.id}-${item.selectedDate || ''}`} className="cart-page__items__item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-page__items__item__image"
                  loading="lazy"
                />
                <div className="cart-page__items__item__details">
                  <h3 className="cart-page__items__item__details__header">
                    {item.name}
                  </h3>
                  <p className="cart-page__items__item__details__price">
                    Price per person: €{item.price.toFixed(2)}
                  </p>

                  {item.numPersons && (
                    <p className="cart-page__items__item__details__persons">
                      Number of Persons: {item.numPersons}
                    </p>
                  )}

                  {item.selectedDate && (
                    <p className="cart-page__items__item__details__date">
                      Date: {new Date(item.selectedDate).toLocaleDateString()}
                    </p>
                  )}

                  <p className="cart-page__items__item__details__total">
                    Total: €{(item.price * (item.numPersons || 1)).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item)}  // Correct item passed to remove
                  className="cart-page__items__item__remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-page__total">
            <h2>Total Amount: €{totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;