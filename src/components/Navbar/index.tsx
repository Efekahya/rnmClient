import React, { ReactElement } from "react"
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
import { gql, useQuery } from "@apollo/client"
interface NavbarProps {
  Logo: ReactElement
}
export default function Navbar({ Logo }: NavbarProps) {
  const [searchValue, setSearchValue] = React.useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    refetch({
      filter: {
        name: e.target.value,
      },
    })
    if (data) {
      console.log(data.characters.info.count, data.characters.results)
    }
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
  type FilterCharacter = {
    name: String
  }
  const filter: FilterCharacter = {
    name: "rick",
  }
  const { loading, error, data, refetch } = useQuery(QUERY, {
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
          <input
            type="search"
            name="search"
            id="search"
            className="searchInput"
            placeholder="Search"
            onChange={handleSearch}
            defaultValue={searchValue}
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
        <input
          type="search"
          name="search"
          id="search"
          className="searchInputTwo"
          placeholder="Search"
          onChange={handleSearch}
          defaultValue={searchValue}
        />
      </div>
    </>
  )
}
