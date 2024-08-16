import * as Yup from 'yup';

export const userUpdateValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('First Name is required')
    .matches(/^[a-zA-Z\s-]+$/, 'First Name can only contain alphabets, spaces, and hyphens')
    .max(50, 'First Name must be at most 50 characters'),
  
  lastname: Yup.string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z\s-]+$/, 'Last Name can only contain alphabets, spaces, and hyphens')
    .max(50, 'Last Name must be at most 50 characters'),
  
  budget: Yup.number()
    .required('Budget is required')
    .min(1, 'Budget must be at least 1')
    .max(99999999, 'Budget must be at most 99,999,999')
    .typeError('Budget must be a number'),
});
