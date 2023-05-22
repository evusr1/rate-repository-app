import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS, PAGE_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $searchKeyword: String,
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $first: Int,
    $after: String
  ) {
    repositories(
      searchKeyword:$searchKeyword,
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first,
      after: $after
    ) {
        edges {
          node {
            ...RepositoryDetails
          }
          cursor
        }
        pageInfo {
          ...PageDetails
        }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_DETAILS}

`;

export const GET_REPOSITORY = gql`
  query getRepository(
    $id: ID!
    $first: Int,
    $after: String
  ) {
    repository(id: $id) {
      ...RepositoryDetails
      url
      reviews (
        first: $first,
        after: $after 
      ) {
          edges {
            node {
              ...ReviewDetails
            }
            cursor
          }
          pageInfo {
            ...PageDetails
          }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
  ${PAGE_DETAILS}
`

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
          edges {
            node {
              ...ReviewDetails
            }
          }
        }
      }
  }
  ${REVIEW_DETAILS}
`;