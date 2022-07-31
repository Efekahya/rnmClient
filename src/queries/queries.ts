import { gql } from "@apollo/client";

export const GetCharacter = gql`
  query GetCharacters($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;
