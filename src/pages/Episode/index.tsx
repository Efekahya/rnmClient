import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import EpisodeCard from "../../components/EpisodeCard";

import { GetEpisodes } from "../../queries/queries";
import { IEpisode } from "../../types/interfaces";
import ShowCount from "../../components/ShowCount";

export default function Episode() {
  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [episodeArray, setEpisodeArray] = React.useState<JSX.Element[]>([]);
  const { loading, error, data, refetch } = useQuery(GetEpisodes, {
    variables: {
      page: 1
    }
  });

  useEffect(() => {
    if (loading === false && data) {
      setEpisodes(episodes => [...episodes, ...data.episodes.results]);
    }
  }, [data, loading]);

  useEffect(() => {
    if (episodes.length > 0) {
      setEpisodeArray(episodeArray => {
        episodeArray = episodes.map(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ({ id, name, air_date, episode }: IEpisode) => {
            return (
              <>
                <div className="episodes-page-item">
                  <EpisodeCard
                    key={id}
                    title={name}
                    date={air_date}
                    episode={episode}
                    description="lorem ipsum"
                    favorited={false}
                    handleSetFavorited={() => console.log("here")}
                  />
                </div>
              </>
            );
          }
        );
        return episodeArray;
      });
    }
  }, [episodes]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  if (loading === false && data && data.episodes.info) {
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (data.episodes.info.next !== null) {
          refetch({
            page: data.episodes.info.next
          });
        }
      }
    };
  }

  return (
    <div>
      <div className="episodes-page-showcount-container">
        <div className="episodes-page-showcount">
          <ShowCount count={data.episodes.info.count} title="Episodes" />
        </div>
      </div>
      <div className="episodes-page-container">
        <div className="episodes-page-items">{episodeArray}</div>
      </div>
    </div>
  );
}
