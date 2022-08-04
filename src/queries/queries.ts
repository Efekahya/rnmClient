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
    }
  }
`;
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
        species
        location {
          name
          dimension
          type
        }
      }
    }
  }
`;

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

export const GetCharacterEpisodes = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      image
      name
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;
