import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarLink from './AppBarLink';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppbar,
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarLink to="/" label="Repositories"/>
            <AppBarLink to="/signin" label="Sign In"/>
        </ScrollView>
    </View>
  );
};

export default AppBar;