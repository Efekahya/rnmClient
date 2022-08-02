import { gql } from "@apollo/client";

export const GetCharacters = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        origin {
          name
        }
        image
      }
    }
  }
`;

export const GetEpisodes = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
          name
        }
      }
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
