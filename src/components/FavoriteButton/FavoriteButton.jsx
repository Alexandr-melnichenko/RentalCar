import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./FavoriteButton.module.css";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/favoritesReducer";
import { selectFavorites } from "../../redux/selectors";

export const FavoriteButton = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((favCar) => favCar.id === car.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  return (
    <button
      className={style.favoriteButton}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <svg className={style.icons}>
          <use xlinkHref="/sprite.svg#icon-heart-blue"></use>
        </svg>
      ) : (
        <svg className={style.icons}>
          <use xlinkHref="/sprite.svg#icon-heart-white"></use>
        </svg>
      )}
    </button>
  );
};
