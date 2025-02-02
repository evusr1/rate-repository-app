import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'

import { ME } from '../graphql/queries';

const useMe = (includeReviews = false) => {
    const [ me, setMe] = useState();
    const { loading, data, refetch } = useQuery( ME, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews
        }
    });

    useEffect(() => {
        if(!loading) 
            setMe(data.me);
    }, [loading, data])

    return { me, loading, refetch}
}
export default useMe;