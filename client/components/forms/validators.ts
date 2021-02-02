import * as yup from "yup";

// todo: some global regex shared with backend
export const emailValidator = yup
    .string()
    .email('Enter a valid email')
    .required('Email is required');

export const passwordValidator = yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required');
