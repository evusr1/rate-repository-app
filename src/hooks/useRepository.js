import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const [repository, setRepository] = useState();
    const { loading, data, refetch } = useQuery( GET_REPOSITORY, {
        variables: {
            id
        },
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if(!loading) 
            setRepository(data.repository);   
    }, [loading, data])

    return { repository, loading, refetch}
}
export default useRepository;