import React from "react"
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg"
export default function Navigation() {
  const href = window.location.href.split("/").slice(3)

  for (let i = 0; i < href.length; i++) {
    href[i] = href[i].charAt(0).toUpperCase() + href[i].slice(1)
  }
  let temp: string
  return (
    <div className="navigationContainer">
      {href.map((item, index) => {
        for (let i = 0; i < href.length; i++) {
          if (href[i] === item) {
            temp = href.slice(0, i).join("/")
          }
        }
        return (
          <>
            <div key={index} className="navigationText">
              <a href={"/" + temp}>{item}</a>
            </div>
            <RightArrow />
          </>
        )
      })}
    </div>
  )
}
