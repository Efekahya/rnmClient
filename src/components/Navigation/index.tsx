import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";

const href = window.location.href.split("/").slice(3);
const hrefUpper: string[] = [];

for (let i = 0; i < href.length; i++) {
  hrefUpper.push(href[i].charAt(0).toUpperCase() + href[i].slice(1));
}

let temp: string;

const urlsArray = href.map((url, index) => {
  if (index === 0) {
    temp = url;
    return url;
  } else {
    temp += `/ ${url}`;
    return temp;
  }
});

const elements = urlsArray.map((url, index) => (
  <>
    <div key={index} className="navigation--navigationText">
      <Link to={`/ ${url}`}>{hrefUpper[index]}</Link>
    </div>
    <RightArrow />
  </>
));

export default function Navigation() {
  return <div className="navigation--navigationContainer">{elements}</div>;
}
