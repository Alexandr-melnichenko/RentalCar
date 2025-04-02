import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { carsReducer } from "./carsSlice";
import { favoriteReducer } from "./favoriteSlice";

const carsPersistConfig = {
  key: "cars",
  storage,
  whitelist: ["token", "carsData"],
};

const persistedCarsReducer = persistReducer(carsPersistConfig, carsReducer);

const favoritePersistConfig = {
  key: "favorite",
  storage,
  whitelist: ["token", "favoriteData"],
};

const persistedFavoriteReducer = persistReducer(
  favoritePersistConfig,
  favoriteReducer
);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
    favorite: persistedFavoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
