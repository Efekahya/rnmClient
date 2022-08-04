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
        id
        name
        air_date
        episode
}

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
