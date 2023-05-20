import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations";

const usePostReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const postReview = async ({ ownerName, rating, repositoryName, text }) => {
    const returnData = await createReview({ 
        variables: {
            ownerName,
            rating,
            repositoryName,
            text
        }
    });

    return returnData.data.createReview;
  };
  
  return [postReview, result];
};

export default usePostReview;