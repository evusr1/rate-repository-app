import { useParams } from 'react-router-native';


import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

import ItemSeparator from './ItemSeparator';
import ReviewList from './ReviewList';


const RepositoryInfo = ({ repository }) => {
    return (
        <>
            <RepositoryItem item={repository} showUrlButton={true} />
            <ItemSeparator/>
        </>
    )
};

const RepositoryView = () => {
    const id = useParams().id;
    const {repository, loading, fetchMore} = useRepository(id, 8);

    const onEndReach = () => {
        fetchMore();
    }

    if(loading || !repository)
        return <Text>Loading...</Text>

    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map(edge => edge.node)
        : [] ;
    
    return <ReviewList headerComponent={() => <RepositoryInfo repository={repository} />} reviewNodes={reviewNodes} onEndReach={onEndReach}/>
}

export default RepositoryView;