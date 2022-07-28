import React from "react";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

export default function ShowCount({
  title,
  count
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="counter--container">
      <div className="counter--title">{title}</div>
      <div className="counter--count">{count}</div>
      <Arrow className="counter--arrow" />
    </div>
  );
}
