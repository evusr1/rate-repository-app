import useMe from "../hooks/useMe";
import Text from "./Text";

import ReviewList from './ReviewList';



const MyReviewView = () => {
    const {me, loading, refetch} = useMe(true);

    if(loading || !me)
        return <Text>Loading...</Text>

    const reviewNodes = me.reviews
        ? me.reviews.edges.map(edge => edge.node)
        : [] ;
    
    return <ReviewList reviewNodes={reviewNodes} reloadReviews={async () => {await refetch()}} myReview={true}/>
}

export default MyReviewView;