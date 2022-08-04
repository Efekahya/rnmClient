import React, { useEffect } from "react";
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
      setCharacters(prevState => {
        prevState = [...characters, ...data.characters.results];
        return prevState;
      });
      setInfo(data.characters.info);
    }
  }, [loading, data, characters]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error :(</p>;

  if (loading === false && data && info) {
    window.onscroll = e => {
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
      <div className="characters-page-frame">
        <div className="characters-page-container">
          <ShowCount count={data.characters.info.count} title="Characters" />
          <CharacterList characters={characters} count={-1} />
        </div>
      </div>
    </>
  );
}
