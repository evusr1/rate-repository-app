import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const returnData = await createUser({ variables: {username, password}});
    await signIn({username, password});
    
    return returnData.data;
  };
  
  return [signUp, result];
};

export default useSignUp;