import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GetEpisode } from "../../queries/queries";

import CharacterList from "../../components/CharacterList";
import ShowCount from "../../components/ShowCount";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ICharacter } from "../../types/interfaces";
import LoadingSpinner from "../../components/LoadingSpinner";

const id = window.location.pathname.split("/")[2];

export default function EpisodeCharacters() {
  const [characterArray, setCharacterArray] = React.useState<ICharacter[]>([]);
  const { loading, error, data } = useQuery(GetEpisode, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (loading === false && data) {
      setCharacterArray(characterArray => {
        characterArray = data.episode.characters;
        return characterArray;
      });
    }
  }, [loading, data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>error</p>;
  return (
    <>
      <div className="episodeCharacters-frame">
        <div className="episodeCharacters-container">
          <div className="episodeCharacters-goback">
            <Link to={`/episodes/${id}`}>
              <Arrow />
              <span>Episode Detail</span>
            </Link>
          </div>
          <ShowCount
            href="#"
            count={characterArray.length}
            title="Characters"
          />
        </div>
      </div>
      <CharacterList characters={characterArray} count={-1} />
    </>
  );
}
