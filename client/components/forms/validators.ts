import * as yup from "yup";

// todo: some global regex shared with backend
export const emailValidator = yup
    .string()
    .email('Enter a valid email')
    .required('Email is required');

export const passwordValidator = yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required');

export const stringRequiredValidator = yup
    .string()
    .required('Email is required');
