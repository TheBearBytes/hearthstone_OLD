import * as yup from "yup";
import {emailValidator, passwordValidator} from "../validators";

const loginFormValidationSchema = yup.object({
    email: emailValidator,
    password: passwordValidator,
});

export default loginFormValidationSchema;
