import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";

const CalculateLocation = () => {
  const location = useLocation().pathname.split("/").slice(1);
  const href = window.location.href.split("/").slice(3);
  const hrefUpper: string[] = [];

  for (let i = 0; i < location.length; i++) {
    hrefUpper.push(location[i].charAt(0).toUpperCase() + location[i].slice(1));
  }

  let temp: string;

  const urlsArray = location.map((url, index) => {
    if (index === 0) {
      temp = url;
      return url;
    } else {
      temp += `/${url}`;
      return temp;
    }
  });

  const elements = urlsArray.map((url, index) => (
    <>
      <div key={index} className="navigation--navigationText">
        <Link to={`/${url}`}>{hrefUpper[index]}</Link>
      </div>
      <RightArrow />
    </>
  ));

  return elements;
};

export default function Navigation() {
  const elements = CalculateLocation();
  return <div className="navigation--navigationContainer">{elements}</div>;
}
