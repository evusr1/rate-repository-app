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

const useRepositories = (order = "LATEST", search) => {
    const [repositories, setRepositories] = useState();
    const { loading, data, refetch } = useQuery( GET_REPOSITORIES, {
        variables: {
            ...SORT_BY[order],
            searchKeyword: search !=='' ? search : undefined
        },
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if(!loading) 
            setRepositories(data.repositories);
        
    }, [loading, data])
    
    return { repositories, loading, refetch}
}
export default useRepositories;