import React, { useState } from 'react'

const useToken = () => {

   const getToken = () => {
   //Look in sessionStorage, get an item called token
   const tokenString = sessionStorage.getItem('token');
   //Parse the JSON object
   const userToken = JSON.parse(tokenString);
   //Need to use optional chaining operator ?. which protects from reading 'undefined' 
   //upon first access
   return userToken?.token
  }

   const [token, setToken] = useState(getToken());

   const saveToken = (userToken) => {
    //call sessionStorage.setItem to save a user token into session storage
    //This allows it to persist in memory. Even when a user refreshes the page
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  return {
      setToken: saveToken,
      token
  }
}

export default useToken
