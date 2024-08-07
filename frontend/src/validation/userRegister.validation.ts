import * as yup from 'yup';

// Define the validation schema using Yup
export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(50, 'First name must be at most 50 characters')
    .matches(/^[a-zA-Z\s-]+$/, 'First name can only contain alphabets, spaces, and hyphens'),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(50, 'Last name must be at most 50 characters')
    .matches(/^[a-zA-Z\s-]+$/, 'Last name can only contain alphabets, spaces, and hyphens'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain alphabets')
    .matches(/[0-9]/, 'Password must contain numbers')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special characters'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
    .required('Confirm password is required'),
  budget: yup
    .number()
    .typeError('Budget must be a number')
    .required('Budget is required')
    .min(1, 'Budget must be at least 1')
    .max(99999999, 'Budget must be at most 99999999'),
  avatar: yup
    .mixed<FileList>()
    .required('Avatar is required')
    .test('fileSize', 'File size is too large', value => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024; // 5MB max
    })
    .test('fileType', 'Unsupported file format', value => {
      return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
});

// Infer the type of the form data from the validation schema
export type SignUpFormData = yup.InferType<typeof signUpValidationSchema>;
