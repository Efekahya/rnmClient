import React, { useCallback } from "react"
import { useQuery } from "@apollo/client"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { FilterCharacter, INavbarProps } from "../../types/interfaces"
import SearchBar from "./_searchBar"
import { NAVBAR_SEARCH } from "../../schemas/queries"

export default function Navbar({ Logo }: INavbarProps) {
  const [searchValue, setSearchValue] = React.useState("")

  const handleSearch = (e: string) => {
    setSearchValue(e)
    refetch({
      filter: {
        name: e,
      },
    })
  }

  const debounce = (func: Function) => {
    let timer: NodeJS.Timeout | null
    return wrapper
    function wrapper(...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func(...args)
      }, 500)
    }
  }
  const debounceFn = useCallback(debounce(handleSearch), [])

  const filter: FilterCharacter = {
    name: "rick",
  }

  const { error, refetch } = useQuery(NAVBAR_SEARCH, {
    variables: {
      filter: filter,
    },
  })

  if (error) return <p>Error :(</p>

  return (
    <>
      <nav className="navbar--navbar">
        <div className="navbar--wrapper">
          <a href="/" className="navbar--brand">
            {Logo}
          </a>
          <SearchBar
            handleSearch={(e) => debounceFn(e.target.value)}
            searchValue={searchValue}
            classValue="searchInput"
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
          handleSearch={(e) => debounceFn(e.target.value)}
          searchValue={searchValue}
          classValue="searchInputTwo"
        />
      </div>
    </>
  )
}
