import * as yup from "yup";
import {stringRequiredValidator} from "../validators";

const newDeckFormValidationSchema = yup.object({
    title: stringRequiredValidator,
    description: stringRequiredValidator,
});

export default newDeckFormValidationSchema;
