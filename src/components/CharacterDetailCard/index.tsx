import React from "react";
import { ICharacterDetailCardProps } from "../../types/interfaces";
import "./styles.scss";
export default function CharacterDetailCard({
  title,
  content
}: ICharacterDetailCardProps) {
  return (
    <div className="container">
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  );
}
