import { gql } from "@apollo/client";

export const GetEpisodes = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        name
      }
    }
  }
`;

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

export const NavbarSearch = gql`
  query Characters($filter: FilterCharacter!) {
    characters(filter: $filter) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;
