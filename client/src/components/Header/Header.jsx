import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => {

  return (
    <header className="header">
        <Link className="header__link" to="/">Holland Attractions</Link>
        <Link to="/cart" className='header__nav__link'>Cart</Link>
    </header>
  );
};

export default Header;