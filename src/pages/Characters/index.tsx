import React, { useEffect } from "react";
import "./styles.scss";
import { useQuery } from "@apollo/client";
import { GetCharacters } from "../../queries/queries";
import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import { ICharacter, IInfo } from "../../types/interfaces";

export default function Characters() {
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [info, setInfo] = React.useState<IInfo>();
  const { data, loading, error, refetch } = useQuery(GetCharacters, {});

  useEffect(() => {
    if (loading === false && data) {
      setCharacters([...characters, ...data.characters.results]);
      setInfo(data.characters.info);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (loading === false && data && info) {
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
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
