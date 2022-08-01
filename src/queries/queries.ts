import { gql } from "@apollo/client";

export const GetEpisode = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
        origin {
          name
        }
        location {
          name
          dimension
          type
        }
        species
      }
    }
  }
`;
