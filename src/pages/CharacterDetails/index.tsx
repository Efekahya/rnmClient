import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GetCharacter } from "../../queries/queries";
import {
  ICharacter,
  ICharacterDetailCardProps,
  IEpisode
} from "../../types/interfaces";

import AddFavorites from "../../components/AddFavorites";
import CharacterDetailCard from "../../components/CharacterDetailCard";
import EpisodeCard from "../../components/EpisodeCard";
import ShowCount from "../../components/ShowCount";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FavoriteContext } from "../../context/favoriteContext";
import Navigation from "../../components/Navigation";

export default function CharacterDetails() {
  const favoritedItems = useContext(FavoriteContext);
  const [getCharacter, { loading, error, data }] = useLazyQuery(GetCharacter);
  const [episodes, setEpisodes] = React.useState<JSX.Element[]>([]);
  const [characterDetails, setCharacterDetails] = React.useState<
    ICharacterDetailCardProps[]
  >([]);
  const [character, setCharacter] = React.useState<ICharacter>();
  const [characterDetailsArray, setCharacterDetailsArray] =
    React.useState<JSX.Element[]>();
  const [id, setId] = React.useState<string>("");

  useEffect(() => {
    if (loading === false && data) {
      setEpisodes(prevState => {
        prevState = data.character.episode.map(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ({ id, air_date, episode, name }: IEpisode, index: number) => {
            if (index < 3) {
              return (
                <div className="character-episode-item">
                  <EpisodeCard
                    id={id}
                    date={air_date}
                    title={name}
                    episode={episode}
                    description={"lorem ipsum"}
                    favorited={favoritedItems.favoriteEpisodes.includes(
                      parseInt(id.toString())
                    )}
                    handleSetFavorited={() => {
                      if (
                        favoritedItems.favoriteEpisodes.includes(
                          parseInt(id.toString())
                        )
                      ) {
                        favoritedItems.removeFavoriteEpisode(
                          parseInt(id.toString())
                        );
                      } else {
                        favoritedItems.addFavoriteEpisode(
                          parseInt(id.toString())
                        );
                      }
                    }}
                  />
                </div>
              );
            }
          }
        );
        return prevState;
      });
    }
  }, [data, favoritedItems, loading]);

  useEffect(() => {
    setId(prevState => {
      prevState = window.location.href.split("/")[4];
      return prevState;
    });
    getCharacter({ variables: { id: window.location.href.split("/")[4] } });
  }, []);

  useEffect(() => {
    if (loading === false && data) {
      setCharacterDetails(prevState => {
        prevState = [
          { title: "Status", content: data.character.status },
          { title: "Gender", content: data.character.gender },
          { title: "Species", content: data.character.species },
          { title: "Origin", content: data.character.origin.name },
          {
            title: "Type",
            content:
              data.character.type === "" ? "Unknown" : data.character.type
          },
          { title: "Location", content: data.character.location.name }
        ];
        return prevState;
      });
      setCharacter(prevState => {
        prevState = data.character;
        return prevState;
      });
    }
  }, [data, loading]);

  useEffect(() => {
    if (characterDetails?.length > 0) {
      setCharacterDetailsArray(prevState => {
        prevState = characterDetails.map(
          ({ title, content }: { title: string; content: string }) => {
            return (
              <div className="character__info__item">
                <CharacterDetailCard title={title} content={content} />
              </div>
            );
          }
        );
        return prevState;
      });
    }
  }, [characterDetails]);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <div className="character-container">
        <div className="character-details-container">
          <Navigation />
          <div className="character-details">
            <div className="character-name-container">
              <div className="character-name">
                <div className="character-name-text">{character?.name}</div>
                <AddFavorites
                  favorited={favoritedItems.favoriteCharacters.includes(
                    parseInt(id.toString())
                  )}
                  themeClass={"black transparent"}
                  toggleFavorite={() => {
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
                />
              </div>
            </div>
            <div className="character-info-container">
              <div className="character-image">
                <img
                  src={character?.image}
                  alt={character?.name}
                  className="character-image"
                />
              </div>
              <div className="character-info">{characterDetailsArray}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="character-episode-frame">
        <div className="character-episode-container">
          <div className="character-episode">
            <ShowCount
              title="Episodes"
              count={character?.episode.length || 0}
              href={`/characters/${id}/episodes`}
            />
            <div className="character-episode-items-container">
              <div className="character-episode-showmore-psuedo">
                <div className="character-episode-showmore">
                  <Link to={`/characters/${id}/episodes`}>
                    <Arrow />
                  </Link>
                </div>
              </div>
              <div className="character-episode-items">{episodes}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
