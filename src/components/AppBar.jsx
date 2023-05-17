import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarLink from './AppBarLink';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppbar,
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { me, loading} = useMe();
  
  const user = !loading
    ? me
    ? me.username
    : null
    : null

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarLink to="/" label="Repositories"/>
            {!user && <AppBarLink to="/signin" label="Sign In"/>}
            {user && <AppBarLink to="/logout" label="Logout"/>}
        </ScrollView>
    </View>
  );
};

export default AppBar;