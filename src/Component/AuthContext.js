import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getWithBasicAuth = (url, username, password) => {
  const authHeader = 'Basic ' + btoa(`${username}:${password}`);

  return axios.get(url, {
    headers: {
      'Authorization': authHeader
    }
  })
    .then(response => {
      console.log("Response from backend:", response);
      return response.data; // Axios automatically parses JSON
    })
    .catch(error => {
      console.error("Error in the request:", error.response || error.message);
      throw new Error('Network response was not ok: ' + error.message);
    });
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    //previousUrl=http://localhost:8080/Login/admin
    //mainlink https://newsapp-latest.onrender.com/Login/admin
    return getWithBasicAuth('https://srv620732.hstgr.cloud:8443/Login/admin', username, password)
      .then(data => {
        console.log("Login successful, setting isAuthenticated to true.");
        setIsAuthenticated(true); // Set authenticated if login succeeds
        return true;
      })
      .catch(error => {
        console.error("Login failed, setting isAuthenticated to false.", error);
        setIsAuthenticated(false); // Set not authenticated on failure
        throw error;
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
