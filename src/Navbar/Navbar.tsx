import React, { ReactElement } from "react"
import styles from "./Navbar.module.css"
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg"
import { ReactComponent as StarIcon } from "../../assets/star.svg"
interface NavbarProps {
  Logo: ReactElement
}
export const Navbar = ({ Logo }: NavbarProps) => {
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <a href="/" className={styles.brand}>
          {Logo}
        </a>
        <input
          type="search"
          name="search"
          id="search"
          className={styles.searchInput}
          placeholder="Search"
          onChange={(event) => {
            setSearchValue(event.target.value)
          }}
          defaultValue={searchValue}
        />
        <div className={styles.itemsContainer}>
          <div className={styles.items}>
            <StarIcon />
            <span>Favorites</span>
          </div>
          <div className={styles.items}>
            <ProfileIcon />
            <span>Sign In</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
