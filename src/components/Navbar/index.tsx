import React, { ReactElement } from "react"
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
interface NavbarProps {
  Logo: ReactElement
}
export default function Navbar({ Logo }: NavbarProps) {
  const [searchValue, setSearchValue] = React.useState("")

  return (
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
          onChange={(event) => {
            setSearchValue(event.target.value)
          }}
          defaultValue={searchValue}
        />
        <div className="itemsContainer">
          <div className="items">
            <StarIcon />
            <span>Favorites</span>
          </div>
          <div className="items">
            <ProfileIcon />
            <span>Sign In</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
