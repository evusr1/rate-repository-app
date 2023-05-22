import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations";


const useRemoveReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);


  const removeReview = async (id) => {
    const returnData = await deleteReview({ variables: {id}});
    return returnData.data;
  };
  
  return [removeReview, result];
};

export default useRemoveReview;