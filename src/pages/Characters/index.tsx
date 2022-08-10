import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetCharacters } from "../../queries/queries";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import { ICharacter, IInfo } from "../../types/interfaces";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Characters() {
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<IInfo>();
  const { data, loading, error, refetch } = useQuery(GetCharacters, {
    variables: { page: 1 }
  });

  useEffect(() => {
    setCharacters(prevState => {
      prevState = [];
      return prevState;
    });
  }, []);

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
        prevState = [...prevState, ...data.characters.results];
        return prevState;
      });
      setInfo(data.characters.info);
      setIsLoading(false);
    }
  }, [loading, data]);

  if (error) return <p>Error :(</p>;

  if (loading === false && data && info) {
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop + 40 >
        document.documentElement.offsetHeight
      ) {
        if (info.next !== null) {
          refetch({
            page: parseInt(info.next)
          });
          setIsLoading(true);
        }
      }
    };
  }

  return (
    <>
      {isLoading === true && (
        <div className="characters-page-loading-fixed">
          <LoadingSpinner />
        </div>
      )}
      <div className="characters-page-frame">
        <div className="characters-page-container">
          <ShowCount count={info?.count || 0} title="Characters" href="#" />
          <CharacterList characters={characters} count={-1} />
        </div>
      </div>
    </>
  );
}
