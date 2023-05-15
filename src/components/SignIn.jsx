import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 5
  },
  textInput: {
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: theme.colors.backgroundPrimary,
  }
})

const initialValues = {
  username: '',
  password: ''
};

const SignIn = ({onSubmit}) => {
  const SignInForm = ({onSubmit}) => {
    return (
      <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry style={styles.textInput} />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text color="invert">Sign In</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignIn;