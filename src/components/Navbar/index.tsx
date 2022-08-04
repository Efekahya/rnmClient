import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import SearchBar from "./_searchBar";

import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ICharacter, INavbarProps, IEpisode } from "../../types/interfaces";
import { NavbarSearch } from "../../queries/queries";
import CharacterList from "../CharacterList";
import EpisodeCard from "../EpisodeCard";
import ShowCount from "../ShowCount";

export default function Navbar({ Logo }: INavbarProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [episodes, setEpisodes] = React.useState<IEpisode[]>([]);
  const [episodeArray, setEpisodeArray] = React.useState<JSX.Element[]>();
  const [isCharacter, setIsCharacter] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [searchResultsNames, setSearchResultsNames] = React.useState<
    JSX.Element[]
  >([]);

  const handleSearch = (e: string) => {
    setSearchValue(e);
    search({
      variables: {
        filterCharacter: {
          name: e
        },
        filterEpisode: {
          name: e
        }
      }
    });
  };

  const debounce = (func: (...args: string[]) => void) => {
    let timer: NodeJS.Timeout | null;
    return wrapper;
    function wrapper(...args: string[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, 500);
    }
  };

  const debounceFn = debounce(handleSearch);

  const [search, { loading, data, error }] = useLazyQuery(NavbarSearch);

  useEffect(() => {
    if (loading === false && data) {
      setCharacters(data.characters.results);
      setEpisodes(data.episodes.results);
      if (
        data.characters.info.count > data.episodes.info.count ||
        data.episodes.info.count === null
      ) {
        setIsCharacter(true);
      } else {
        setIsCharacter(false);
      }
      setSearchResultsNames(prevState => {
        prevState = data.characters.results.map(
          ({ name }: ICharacter, index: number) => {
            if (index < 10) {
              setSearchResultsNames(prevState => [
                ...prevState,
                <button
                  className="navbar-dropdown-item"
                  onClick={() => {
                    setSearchValue(name);
                    setSearchResultsNames([]);
                  }}
                >
                  {name}
                </button>
              ]);
            }
          }
        );
        return prevState;
      });
    }
  }, [loading, data]);

  useEffect(() => {
    if (isCharacter === false) {
      setEpisodeArray(episodeArray => {
        episodeArray = episodes.map(
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ({ id, name, air_date, episode }: IEpisode) => {
            return (
              <>
                <div className="navbar-episodes-item">
                  <EpisodeCard
                    key={id}
                    id={id}
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
  }, [episodes, isCharacter]);

  if (error) return <p>Error :(</p>;

  if (loading === false && data) {
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + document.documentElement.scrollTop + 40 >
        document.documentElement.offsetHeight
      ) {
        search({
          variables: {
            filterCharacter: {
              name: searchValue
            },
            filterEpisode: {
              name: searchValue
            }
          }
        });
      }
    };
  }

  return (
    <>
      <nav className="navbar--navbar">
        <div className="navbar--wrapper">
          <a href="/" className="navbar--brand">
            {Logo}
          </a>
          <SearchBar
            handleSearch={e => debounceFn(e.target.value)}
            searchValue={searchValue}
            classValue="navbar--searchInput"
            onFocus={focus =>
              setTimeout(() => {
                setIsFocused(focus);
              }, 50)
            }
          />
          <div className="navbar--itemsContainer">
            <div className="navbar--items">
              <StarIcon />
              <span>Favorites</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar--secondaryInput">
        <SearchBar
          handleSearch={e => debounceFn(e.target.value)}
          searchValue={searchValue}
          classValue="navbar--searchInputTwo"
          onFocus={focus =>
            setTimeout(() => {
              setIsFocused(focus);
            }, 50)
          }
        />
      </div>
      {searchValue !== "" && (
        <div className="navbar-dropdown-psuedo">
          <div
            className={`navbar-dropdown-container ${isFocused ? "focus" : ""} `}
          >
            <div className="navbar-dropdown-wrapper" id="dropwdown-wrapper">
              {searchResultsNames}
            </div>
          </div>
        </div>
      )}

      {searchValue.length > 0 &&
        (isCharacter ? (
          characters.length > 0 ? (
            <div className="navbar-searchResult">
              <div className="navbar-count">
                <div className="navbar-search-header">Search Results</div>
                <ShowCount
                  count={characters.length}
                  title="Characters"
                  href="#"
                />
              </div>
              <CharacterList characters={characters} count={-1} />
            </div>
          ) : (
            <p>No Results</p>
          )
        ) : episodes.length > 0 ? (
          <div className="navbar-searchResult">
            <div className="navbar-count">
              <div className="navbar-search-header">Search Results</div>
              <ShowCount count={episodes.length} title="Episodes" href="#" />
            </div>
            <div className="navbar-search-episodes">{episodeArray}</div>
          </div>
        ) : (
          <p>No Results</p>
        ))}
    </>
  );
}
