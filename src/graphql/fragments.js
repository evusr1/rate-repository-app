import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id,
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount,
        ownerAvatarUrl        
    }
`

export const REVIEW_DETAILS = gql`
    fragment ReviewDetails on Review {
        id
        text
        rating
        createdAt
        user {
            id
            username
        }
        repositoryId
    }
`
export const PAGE_DETAILS = gql`
    fragment PageDetails on PageInfo {
        endCursor,
        startCursor
        hasNextPage
    }
`