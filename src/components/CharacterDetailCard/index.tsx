import React from "react";
import { ICharacterDetailCardProps } from "../../types/interfaces";

export default function CharacterDetailCard({
  title,
  content
}: ICharacterDetailCardProps) {
  return (
    <div className="characterDetailCard--container">
      <div className="characterDetailCard--title">{title}</div>
      <div className="characterDetailCard--content">{content}</div>
    </div>
  );
}
