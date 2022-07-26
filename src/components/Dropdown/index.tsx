import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
export default function Dropdown() {
  interface IState {
    name: string;
    episode: number;
  }
  const [episodes, setEpisodes] = useState<IState[]>([]);
  const GetEpisodes = gql`
    query GetEpisodes($page: Int!) {
      episodes(page: $page) {
        info {
          count
          pages
          next
        }
        results {
          name
          episode
        }
      }
    }
  `;

  const [getResponse, { loading, error, data }] = useLazyQuery(GetEpisodes, {
    variables: {
      page: 1
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) {
    getResponse({
      variables: {
        page: 1
      }
    }).then(res => {
      setEpisodes([...res.data.episodes.results]);
    });
  }
  if (data) {
    if (data.episodes.info.next !== null) {
      getResponse({
        variables: {
          page: data.episodes.info.next
        }
      });
      setEpisodes([...episodes, ...data.episodes.results]);
    }
  }
  console.log(episodes);
  return <div>Dropdown</div>;
}
