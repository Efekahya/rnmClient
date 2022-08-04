import React from "react";
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
    <a className="counter--link" href={href}>
      <div className="counter--container">
        <div className="counter--title">{title}</div>
        <div className="counter--count">{count}</div>
        <Arrow className="counter--arrow" />
      </div>
    </a>
  );
}
