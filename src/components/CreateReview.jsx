import { useNavigate } from 'react-router-native'
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import Container from './Container';
import usePostReview from '../hooks/usePostReview';

const initialValues = {
  text: '',
  rating: '',
  repositoryName: '',
  ownerName: ''
};

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .required("Review is required"),
  repositoryName: yup
    .string()
    .required("Repository name is required"),
  ownerName: yup
    .string()
    .required("Repository owner name is required"),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required("Rating is required")
    .integer()
    .max(100, "Please enter a rating between 0 and 100")
    .min(0, "Please enter a rating between 0 and 100"),
});

export const CreateReviewContainer = ({onSubmit}) => {
  const CreateReviewForm = ({onSubmit}) => {
    return (
      <Container>
        <FormikTextInput name="ownerName" placeholder="Repository Owner Name" />
        <FormikTextInput name="repositoryName" placeholder="Repository Name" />
        <FormikTextInput name="rating" placeholder="Rating between 100 and 0" />
        <FormikTextInput name="text" placeholder="Review" multiline={true} />
        <Button onPress={onSubmit} label="Create a Review"/>
      </Container>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({handleSubmit}) => <CreateReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
}

const CreateReview = () => {
  const [postReview] = usePostReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {text, repositoryName, ownerName, rating} = values;
    try {
      const returnedData = await postReview({text, repositoryName, ownerName, rating: Number(rating)});
      navigate(`/repo/${returnedData.repositoryId}`);
    } catch(e) {
      console.log(e);
    }
  };


  return <CreateReviewContainer onSubmit={onSubmit}/>
};

export default CreateReview;