import { View, StyleSheet } from 'react-native';

import { useNavigate } from 'react-router-native'
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
})

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required')
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const SignInForm = ({onSubmit}) => {
    return (
      <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <Button onPress={onSubmit} label="Sign in"/>
      </View>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({handleSubmit}) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default SignIn;