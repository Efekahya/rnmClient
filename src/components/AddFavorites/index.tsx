import React from "react";
import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { IAddFavoritesProps } from "../../types/interfaces";

export default function AddFavorites({
  themeClass,
  favorited,
  toggleFavorite
}: IAddFavoritesProps) {
  return (
    <div
      className="favorites--button"
      onClick={toggleFavorite}
      onKeyDown={toggleFavorite}
      aria-label="Add to favorites"
      role="button"
      tabIndex={0}
    >
      <div className={`favorites--container ${themeClass}`}>
        <StarIcon
          aria-label="Add to favorites"
          className={`starIcon ${favorited ? "favorited" : ""}`}
        />
        <div className="favorites--text">Add to Favorites</div>
      </div>
    </div>
  );
}
