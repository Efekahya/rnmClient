import React, { useContext, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import SearchBar from "./_searchBar";

import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ICharacter, INavbarProps, IEpisode } from "../../types/interfaces";
import { NavbarSearch } from "../../queries/queries";
import CharacterList from "../CharacterList";
import EpisodeCard from "../EpisodeCard";
import ShowCount from "../ShowCount";
import { FavoriteContext } from "../../context/favoriteContext";

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

  const favoritedItems = useContext(FavoriteContext);

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
          <Link to="/" className="navbar--brand">
            {Logo}
          </Link>
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
            <Link to="/favorites" className="navbar--items">
              <StarIcon />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="navbar--secondaryInput-psuedo">
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
      </div>
      {searchValue !== "" && (
        <div className="navbar-dropdown-psuedo">
          <div
            className={`navbar-dropdown-container ${
              isFocused && searchResultsNames.length > 0 ? "focus" : ""
            } `}
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
              <div className="navbar-search-characters">
                <CharacterList characters={characters} count={-1} />
              </div>
            </div>
          ) : (
            <div className="navbar-searchResult">
              <div className="navbar-no-result-text">
                No results found for "{searchValue}"
              </div>
            </div>
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
          <div className="navbar-searchResult">
            <div className="navbar-no-result-text">
              No results found for "{searchValue}""
            </div>
          </div>
        ))}
    </>
  );
}
