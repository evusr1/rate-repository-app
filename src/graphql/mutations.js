import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

export const AUTHENTICATE_USER = gql`
  mutation autheticateUser($username: String!, $password: String!) {
    authenticate(
      credentials: {
        username: $username,
        password: $password
      }
    ) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String!) {
    createReview(
      review: {
        ownerName: $ownerName,
        rating: $rating,
        repositoryName: $repositoryName,
        text: $text
      }
    ) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(
      user: {
        password: $password,
        username: $username
      }
    ) {
      id
      username
    } 
  }
`