import React from "react";
import { useQuery } from "@apollo/client";

import SearchBar from "./_searchBar";

import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { FilterCharacter, INavbarProps } from "../../types/interfaces";
import { NavbarSearch } from "../../queries/queries";

export default function Navbar({ Logo }: INavbarProps) {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = (e: string) => {
    setSearchValue(e);
    refetch({
      filter: {
        name: e
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

  const filter: FilterCharacter = {
    name: "rick"
  };

  const { error, refetch } = useQuery(NavbarSearch, {
    variables: {
      filter: filter
    }
  });

  if (error) return <p>Error :(</p>;

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
        />
      </div>
    </>
  );
}
