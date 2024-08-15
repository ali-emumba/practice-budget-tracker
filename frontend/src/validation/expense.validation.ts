import * as yup from 'yup';

export const expenseValidationSchema = yup.object().shape({
  title: yup.string()
    .required('Title is required')
    .max(30, 'Title must be up to 30 characters')
    .matches(/^[a-zA-Z\s-]+$/, 'Title must only contain alphabets, spaces, and hyphens'),
  category: yup.string()
    .required('Category is required')
    .max(30, 'Category must be up to 30 characters')
    .matches(/^[a-zA-Z\s-]+$/, 'Category must only contain alphabets, spaces, and hyphens'),
  price: yup.number()
    .required('Price is required')
    .typeError('Price must be a number')
    .min(0, 'Price must be at least 0')
    .max(1000000, 'Price must be max 1,000,000'),
  date: yup.string()
    .required('Date is required')
    .matches(/^\d{4}\-\d{2}\-\d{2}$/, 'Date must be in the format DD/MM/YYYY'),
});
