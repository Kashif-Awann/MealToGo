import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";
export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthenticationContext);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`"@favourites-${uid}"`, jsonValue);
    } catch (e) {
      console.log("Error Storing", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`"@favourites-${uid}"`);
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("Error Loading", e);
    }
  };

  const add = (item) => {
    setFavourites([...favourites, item]);
  };

  const remove = (item) => {
    const newFavourites = favourites.filter((x) => x.placeId !== item.placeId);
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        addToFavourites: (item) => add(item),
        removeFromFavourites: (item) => remove(item),
        favourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
