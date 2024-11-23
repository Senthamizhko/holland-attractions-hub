import React from 'react';
import { useCart } from '../../context/CartContext';
import './style.scss';

const CartPage = () => {
  const { cartState, cartDispatch } = useCart();
  const { cartItems } = cartState;

  const handleRemoveFromCart = (item) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  // Calculate total price for the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.numPersons || 1),
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-page__header">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-page__empty">Your cart is empty!</p>
      ) : (
        <div>
          <ul className="cart-page__items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-page__items__item">
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
                    Price per Person: €{item.price.toFixed(2)}
                  </p>

                  {/* Show number of persons */}
                  {item.numPersons && (
                    <p className="cart-page__items__item__details__persons">
                      Number of Persons: {item.numPersons}
                    </p>
                  )}

                  {/* Show selected date */}
                  {item.selectedDate && (
                    <p className="cart-page__items__item__details__date">
                      Date: {new Date(item.selectedDate).toLocaleDateString()}
                    </p>
                  )}

                  {/* Total price for the item */}
                  <p className="cart-page__items__item__details__total">
                    Total: €{(item.price * (item.numPersons || 1)).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="cart-page__items__item__remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Display total price for the cart */}
          <div className="cart-page__total">
            <h2>Total Amount: €{totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;