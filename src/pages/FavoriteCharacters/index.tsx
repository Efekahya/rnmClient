import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { FavoriteContext } from "../../context/favoriteContext";

import CharacterList from "../../components/CharacterList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ShowCount from "../../components/ShowCount";

import { GetCharactersByIds } from "../../queries/queries";
import { ICharacter } from "../../types/interfaces";

export default function FavoriteCharacters() {
  const favoritedItems = useContext(FavoriteContext);
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);

  const [favoritedIds] = React.useState({
    episodeIds: favoritedItems.favoriteEpisodes,
    characterIds: favoritedItems.favoriteCharacters
  });
  const Characters = useLazyQuery(GetCharactersByIds, {
    variables: {
      ids: favoritedIds.characterIds
    }
  });

  useEffect(() => {
    Characters[0]();
  }, []);

  useEffect(() => {
    if (Characters[1].loading === false && Characters[1].data) {
      setCharacters(Characters[1].data.charactersByIds);
    }
  }, [Characters]);

  if (Characters[1].loading) return <LoadingSpinner />;

  return (
    <>
      <div className="favorite-episodes-main-frame">
        <div className="favorite-episodes-main-container">
          <div className="favorite-episodes-main-text">Favorite Characters</div>
          <ShowCount count={characters.length} href="" title="Characters" />
          <CharacterList characters={characters} count={-1} />
        </div>
      </div>
    </>
  );
}
