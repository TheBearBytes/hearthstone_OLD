import * as yup from "yup";
import {emailValidator, passwordValidator} from "../validators";

const registerFormValidationSchema = yup.object({
    email: emailValidator,
    password: passwordValidator,
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default registerFormValidationSchema;
