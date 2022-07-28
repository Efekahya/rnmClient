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
    <div className="container">
      <div className="title">{title}</div>
      <div className="count">{count}</div>
      <Arrow className="arrow" />
    </div>
  );
}
