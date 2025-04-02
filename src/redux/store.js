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
import { carsReducer } from "./slice";

const filterPersistConfig = {
  key: "filter",
  storage,
  whitelist: ["token", "filterData"],
};

const persistedFilterReducer = persistReducer(
  filterPersistConfig,
  filterReducer
);

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
    filter: persistedFilterReducer,
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
