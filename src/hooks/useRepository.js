import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
    const [repository, setRepository] = useState();
    const variables = {
        id,
        first
    }

    const { loading, data, refetch, fetchMore } = useQuery( GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if(!loading) 
            setRepository(data.repository);   
    }, [loading, data])

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if(!canFetchMore)
            return;
        
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            }
        })
    }

    return { repository, loading, refetch, fetchMore: handleFetchMore}
}
export default useRepository;