import React, { MutableRefObject, useEffect, useRef } from "react";
import "./styles.scss";
import { useQuery } from "@apollo/client";
import { GetCharacters } from "../../queries/queries";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import { ICharacter, IInfo } from "../../types/interfaces";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Characters() {
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [info, setInfo] = React.useState<IInfo>();
  const { data, loading, error, refetch } = useQuery(GetCharacters, {});

  useEffect(() => {
    setTimeout(() => {
      const fetchMore = (i: number) => {
        console.log("loading...");
        refetch({
          page: i++
        });
        if (window.innerHeight > document.body.offsetHeight) {
          setTimeout(() => {
            fetchMore(i);
            i++;
          }, 1000);
        }
      };
      if (window.innerHeight > document.body.offsetHeight) {
        fetchMore(2);
      }
    }, 1500);
  }, [refetch]);

  useEffect(() => {
    if (loading === false && data) {
      setCharacters([...characters, ...data.characters.results]);
      setInfo(data.characters.info);
    }
  }, [loading, data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error :(</p>;

  if (loading === false && data && info) {
    window.onscroll = e => {
      console.log("scrolling");
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop + 40 >
        document.documentElement.offsetHeight
      ) {
        console.log("bottom");
        if (info.next !== null) {
          refetch({
            page: info.next
          });
        }
      }
    };
  }

  return (
    <>
      <ShowCount count={data.characters.info.count} title="Characters" />
      <CharacterList characters={characters} count={-1} />
    </>
  );
}
