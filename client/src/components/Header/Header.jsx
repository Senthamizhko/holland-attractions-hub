import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import { SearchContext } from '../../context/SearchContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <header className="header">
      <Link className="header__link" to="/">Holland Attractions</Link>
      {location.pathname === '/' && <input
        type="text"
        className="header__search"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearch}
      />}
      <Link to="/cart" className="header__nav__link">Cart</Link>
    </header>
  );
};

export default Header;