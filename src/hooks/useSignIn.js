import { useMutation } from "@apollo/client"
import { AUTHENTICATE_USER } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client"
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const [autheticateUser, result] = useMutation(AUTHENTICATE_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const returnData = await autheticateUser({ variables: {username, password}});
    await authStorage.setAccessToken(returnData.data.authenticate.accessToken);

    apolloClient.resetStore();

    return returnData;
  };
  
  return [signIn, result];
};

export default useSignIn;