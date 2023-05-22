import { useNavigate } from 'react-router-native'
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import Container from './Container';



const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required'),
});

export const SignInContainer = ({onSubmit}) => {
  const SignInForm = ({onSubmit}) => {
    return (
      <Container>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <Button onPress={onSubmit} label="Sign in"/>
      </Container>
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
}

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


  return <SignInContainer onSubmit={onSubmit}/>
};

export default SignIn;