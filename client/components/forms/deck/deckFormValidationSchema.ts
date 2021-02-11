import * as yup from "yup";
import {stringRequiredValidator} from "../validators";

const deckFormValidationSchema = yup.object({
    title: stringRequiredValidator,
    description: stringRequiredValidator,
});

export default deckFormValidationSchema;
