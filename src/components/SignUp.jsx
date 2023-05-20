import { useNavigate } from 'react-router-native'
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import Container from './Container';
import useSignUp from '../hooks/useSignUp';



const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, "Username must be between 1 and 30")
    .max(30, "Username must be between 1 and 30"),
    password: yup
    .string()
    .required('Password is required')
    .min(5, "Password must be between 5 and 50")
    .max(50, "Password must be between 5 and 50"),
  passwordConfirm: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null],"Passwords do not match")
});

export const SignUpContainer = ({onSubmit}) => {
  const SignUpForm = ({onSubmit}) => {
    return (
      <Container>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <FormikTextInput name="passwordConfirm" placeholder="Confirm Password" secureTextEntry />
        <Button onPress={onSubmit} label="Sign up"/>
      </Container>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit}/>}
    </Formik>
  );
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };


  return <SignUpContainer onSubmit={onSubmit}/>
};

export default SignUp;