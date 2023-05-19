import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';

import theme from "../theme";
import AppBar from './AppBar';
import SignIn from './SignIn';
import Logout from './Logout';
import RepositoryView from './RepositoryView';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar title="Repositories"/>
      <Routes>
        <Route path="/" element={<RepositoryList/>} exact />
        <Route path="/signin" element={<SignIn/>} exact />     
        <Route path="/logout" element={<Logout/>} exact />   
        <Route path="/repo/:id" element={<RepositoryView/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;