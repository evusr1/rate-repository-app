import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries';

export const SORT_BY = {
    LATEST: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
    },
    HIGHEST_RATING: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
    },
    LOWEST_RATING: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
    },
};

const useRepositories = (order = "LATEST", search, first) => {
    const [repositories, setRepositories] = useState();
    const variables = {
        ...SORT_BY[order],
        first,
        searchKeyword: search !=='' ? search : undefined,
    }


    const { loading, data, refetch, fetchMore } = useQuery( GET_REPOSITORIES, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if(!canFetchMore)
            return;

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            }
        })
    }

    useEffect(() => {
        if(!loading) 
            setRepositories(data.repositories);
        
    }, [loading, data])
    
    return { repositories, loading, fetchMore: handleFetchMore, refetch}
}
export default useRepositories;