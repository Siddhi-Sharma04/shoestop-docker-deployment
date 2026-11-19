import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

// Use VITE_API_URL env variable; fallback to localhost for local dev without Docker
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Context = ({ children }) => {
  const [favProList, setFavProductList] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [token, setToken] = useState('')

  const getTokenFromLocalStorage = () => {
    setToken(localStorage.getItem('token'))
    return localStorage.getItem('token');
  };

  const getFav = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${API_URL}/api/addfav`, { headers });
        setFavProductList(response.data);
      }
    } catch (error) {
      console.log('No auth found');
    }
  };

  const getcart = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${API_URL}/api/addcart`, { headers });
        setCartProducts(response.data);
      }
    } catch (error) {
      console.log('No auth found');
    }
  };


  useEffect(() => {
    getTokenFromLocalStorage()
    if (token) {
      getFav()
      getcart();
    }
  }, [token]);


  return (
    <productContext.Provider
      value={{
        favProList,
        setFavProductList,
        cartProduct,
        setCartProducts,
        token,
        setToken,
        getcart,
        getFav,
        API_URL
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default Context;
