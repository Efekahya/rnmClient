import { gql } from "@apollo/client"

export const NAVBAR_SEARCH = gql`
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
`
