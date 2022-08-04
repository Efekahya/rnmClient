import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import EpisodeCard from "../../components/EpisodeCard";
import Navigation from "../../components/Navigation";

import { GetCharacterEpisodes } from "../../queries/queries";
import { IEpisode } from "../../types/interfaces";
import Dropdown from "../../components/Dropdown";
import { FavoriteContext } from "../../context/favoriteContext";

const id = window.location.pathname.split("/")[2];

export default function CharacterEpisodes() {
  const [filter, setFilter] = React.useState("");
  const [episodes, setEpisodes] = React.useState<JSX.Element[]>([]);
  const [seasons, setSeasons] = React.useState<IEpisode[]>([]);
  const [selected, setSelected] = React.useState<string>("All Seasons");

  const favoritedItems = useContext(FavoriteContext);

  const { loading, error, data } = useQuery(GetCharacterEpisodes, {
    variables: {
      id: id
    }
  });

  useEffect(() => {
    if (loading === false && data) {
      setEpisodes(prevState => {
        prevState = seasons.map(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ({ id, air_date, episode, name }: IEpisode) => {
            return (
              <div className="characterEpisodes-episode-item">
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
        );
        return prevState;
      });
    }
  }, [data, loading, seasons]);

  useEffect(() => {
    if (loading === false && data) {
      setSeasons(prevState => {
        if (filter !== "") {
          prevState = data.character.episode.filter(
            ({ episode }: IEpisode) => episode.split("E")[0] === filter
          );
          return prevState;
        }
        return data.character.episode;
      });
    }
  }, [data, loading, filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <div className="characterEpisodes-main-frame">
        <div className="characterEpisodes-navigation-container">
          <div className="characterEpisodes-navigation">
            <Navigation />
          </div>
        </div>
        <div className="characterEpisodes-main-container">
          <div className="characterEpisodes-character-details">
            <div className="characterEpisodes-character-container">
              <div className="characterEpisodes-character-name">
                {data.character.name}
              </div>
              <img src={data.character.image} alt={data.character.name} />
              <Dropdown
                items={[
                  {
                    label: "All seasons",
                    value: "",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  },
                  {
                    label: "Season 1",
                    value: "S01",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  },
                  {
                    label: "Season 2",
                    value: "S02",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  },
                  {
                    label: "Season 3",
                    value: "S03",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  },
                  {
                    label: "Season 4",
                    value: "S04",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  },
                  {
                    label: "Season 5",
                    value: "S05",
                    handleClick(event) {
                      setFilter((event.target as HTMLButtonElement).value);
                      setSelected(
                        (event.target as HTMLButtonElement).innerText
                      );
                    }
                  }
                ]}
                selected={selected}
              />
            </div>
          </div>
          <div className="characterEpisodes-episode-list">{episodes}</div>
        </div>
      </div>
    </div>
  );
}
