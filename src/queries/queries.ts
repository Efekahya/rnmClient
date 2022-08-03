import { gql } from "@apollo/client";

export const NavbarSearch = gql`
  query Characters(
    $filterCharacter: FilterCharacter!
    $filterEpisode: FilterEpisode!
  ) {
    characters(filter: $filterCharacter) {
      info {
        count
        pages
        next
        prev
      }
      results {
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
        created
      }
    }
    episodes(filter: $filterEpisode) {
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
    }
  }
`;
