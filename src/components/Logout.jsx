import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-native";
import { useEffect } from "react"

import { useAuthStorage } from "../hooks/useAuthStorage";
import Text from "./Text"

const Logout = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const navigate = useNavigate();

    const doLogout = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/signin');
    }

    useEffect(()=> {
        doLogout();
    }, []);

    return (
        <Text>
            Logging out...
        </Text>
    )
}

export default Logout;