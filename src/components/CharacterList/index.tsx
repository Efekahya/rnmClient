import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ICharacterListProps } from "../../types/interfaces";
import { ReactComponent as Star } from "../../assets/star.svg";
import { FavoriteContext } from "../../context/favoriteContext";

export default function CharacterList({
  characters,
  count
}: ICharacterListProps) {
  let sliced;
  if (count !== -1) {
    sliced = characters.slice(0, count);
  } else {
    sliced = characters;
  }
  const favoritedItems = useContext(FavoriteContext);
  return (
    <div className="characterList--container">
      <div className="characterList--characterList">
        {sliced?.map(({ image, name, id, origin, species }) => (
          <div className="characterList--character" key={id}>
            <div className="characterList--imageContainer">
              <button
                className="characterList--button"
                onClick={() => {
                  if (
                    favoritedItems.favoriteCharacters.includes(
                      parseInt(id.toString())
                    )
                  ) {
                    favoritedItems.removeFavoriteCharacter(
                      parseInt(id.toString())
                    );
                  } else {
                    favoritedItems.addFavoriteCharacter(
                      parseInt(id.toString())
                    );
                  }
                }}
              >
                <Star
                  className={
                    favoritedItems.favoriteCharacters.includes(
                      parseInt(id.toString())
                    )
                      ? "characterList--star-favorited"
                      : ""
                  }
                />
              </button>
              <Link to={"/characters/" + id} className="characterList__link">
                <div className="characterList--infoLeft">{origin.name}</div>
                <div className="characterList--infoRight">{species}</div>
                <img
                  loading="eager"
                  className="characterList--image"
                  src={image}
                  alt={name}
                />
              </Link>
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
