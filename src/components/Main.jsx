import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';

import theme from "../theme";
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {
  const handleLogin = (values) => {
    console.log(values)
  };

  return (
    <View style={styles.container}>
      <AppBar title="Repositories"/>
      <Routes>
        <Route path="/" element={<RepositoryList/>} exact />
        <Route path="/signin" element={<SignIn onSubmit={handleLogin}/>} exact />        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;