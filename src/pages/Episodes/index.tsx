import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import EpisodeCard from "../../components/EpisodeCard";

import { GetEpisodes } from "../../queries/queries";
import { IEpisode } from "../../types/interfaces";
import ShowCount from "../../components/ShowCount";
import { FavoriteContext } from "../../context/favoriteContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Episode() {
  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [info, setInfo] = React.useState<number>(0);
  const [episodeArray, setEpisodeArray] = React.useState<JSX.Element[]>([]);
  const [getEpisodes, { loading, error, data }] = useLazyQuery(GetEpisodes);
  const favoritedItems = useContext(FavoriteContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    getEpisodes({ variables: { page: 1 } });
    setIsLoading(true);
  }, [getEpisodes]);

  useEffect(() => {
    if (loading === false && data) {
      setEpisodes(episodes => [...episodes, ...data.episodes.results]);
      setInfo(data.episodes.info.count);
      setIsLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    setEpisodeArray(prevState => {
      prevState = episodes.map(
        ({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          air_date,
          name,
          id,
          episode
        }: {
          air_date: string;
          name: string;
          id: number;
          episode: string;
        }) => {
          return (
            <div className="homepage-item" key={id}>
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
                    favoritedItems.addFavoriteEpisode(parseInt(id.toString()));
                  }
                }}
              />
            </div>
          );
        }
      );
      return prevState;
    });
    setIsLoading(false);
  }, [episodes, favoritedItems]);

  if (error) return <p>error</p>;

  if (loading === false && data && data.episodes.info) {
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (data.episodes.info.next !== null) {
          getEpisodes({
            variables: { page: data.episodes.info.next }
          });
          setIsLoading(true);
        }
      }
    };
  }
  return (
    <div>
      {isLoading && (
        <div className="episodes-page-loading-fixed">
          <LoadingSpinner />
        </div>
      )}
      <div className="episodes-page-showcount-container">
        <div className="episodes-page-showcount">
          <ShowCount count={info} title="Episodes" href="#" />
        </div>
      </div>
      <div className="episodes-page-container">
        <div className="episodes-page-items">{episodeArray}</div>
      </div>
    </div>
  );
}
