import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

export default function ShowCount({
  title,
  count,
  href
}: {
  title: string;
  count: number;
  href: string;
}) {
  return (
    <Link className="counter--link" to={href}>
      <div className="counter--container">
        <div className="counter--title">{title}</div>
        <div className="counter--count">{count}</div>
        <Arrow className="counter--arrow" />
      </div>
    </Link>
  );
}
