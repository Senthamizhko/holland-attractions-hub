import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import { SearchContext } from '../../context/SearchContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const location = useLocation();
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (location.pathname !== '/' && searchTerm !== '') {
       setSearchTerm('');
    } else if (location.pathname === '/' && searchInputRef.current) {
       searchInputRef.current.focus();
    }
  }, [location.pathname, searchTerm, setSearchTerm]);

  return (
    <header className="header">
        <Link className="header__link" to="/">Holland Attractions</Link>
        {location.pathname === '/' && (
            <input
              type="text"
              id="search"
              ref={searchInputRef}
              className="header__search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search Categories"
            />
        )}
        <Link to="/cart" className="header__nav__link">Cart</Link>
    </header>
  );
};

export default Header;