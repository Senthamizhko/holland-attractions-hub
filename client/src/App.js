import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import LoadingState from './components/LoadingState/LoadingState';
import Dashboard from './components/Dashboard/Dashboard';

const DetailedView = lazy(() => import('./components/DetailedView/DetailedView'));
const CartPage = lazy(() => import('./components/CartPage/CartPage'));

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailedView />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;