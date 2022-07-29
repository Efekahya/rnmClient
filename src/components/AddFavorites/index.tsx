import React from "react";
import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { IAddFavoritesProps } from "../../types/interfaces";
export default function AddFavorites({
  backgroundColor,
  textColor,
  favorited,
  toggleFavorite
}: IAddFavoritesProps) {
  return (
    <button className="favorites--button" onClick={toggleFavorite}>
      <div
        className="favorites--container"
        style={{ backgroundColor: `var(${backgroundColor})` }}
      >
        <StarIcon
          style={
            favorited
              ? {
                  fill: `var(${textColor})`,
                  stroke: `var(${textColor})`
                }
              : {
                  stroke: `var(${textColor})`
                }
          }
        />
        <div className="favorites--text" style={{ color: `var(${textColor})` }}>
          Add to Favorites
        </div>
      </div>
    </button>
  );
}
