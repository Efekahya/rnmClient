import React from "react"
import { gql, useQuery } from "@apollo/client"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { FilterCharacter, INavbarProps } from "../../types/interfaces"
import SearchBar from "./_searchBar"

export default function Navbar({ Logo }: INavbarProps) {
  const [searchValue, setSearchValue] = React.useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    refetch({
      filter: {
        name: e.target.value,
      },
    })
  }
  const QUERY = gql`
    query Characters($filter: FilterCharacter!) {
      characters(filter: $filter) {
        info {
          count
        }
        results {
          name
        }
      }
    }
  `

  const filter: FilterCharacter = {
    name: "rick",
  }
  const { error, refetch } = useQuery(QUERY, {
    variables: {
      filter: filter,
    },
  })
  if (error) return <p>Error :(</p>
  return (
    <>
      <nav className="navbar">
        <div className="wrapper">
          <a href="/" className="brand">
            {Logo}
          </a>
          <SearchBar
            handleSearch={handleSearch}
            searchValue={searchValue}
            classValue={"searchInput"}
          />
          <div className="itemsContainer">
            <div className="items">
              <StarIcon />
              <span>Favorites</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="secondaryInput">
        <SearchBar
          handleSearch={handleSearch}
          searchValue={searchValue}
          classValue={"searchInputTwo"}
        />
      </div>
    </>
  )
}
