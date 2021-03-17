import React from 'react';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import deckFormValidationSchema from "./deckFormValidationSchema";
import useStyles from '../style';
import DeckType from "../../../types/deck";

// const tmpRandomCardsSet = [
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
//     `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
// ];

const tmpRandomCardsSet = [
    '6050662cd3dd14006413dca6',
    '6050662cd3dd14006413dcb5',
    '6050662cd3dd14006413dcca',
];

// todo: props (inherit), onSubmit any
type DeckFormProps = {
    onSubmit: any,
    loading: boolean,
    initialValues?: DeckType,
}

const DeckForm = ({onSubmit, loading, initialValues}: DeckFormProps) => {
    const initVal = initialValues ? initialValues : {
        title: '',
        description: '',
        cards: tmpRandomCardsSet,
    };

    const classes = useStyles();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initVal,
        validationSchema: deckFormValidationSchema,
        onSubmit,
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={classes.root}
        >
            <TextField
                required
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
            >
                {initialValues ? 'Edit deck' : 'Create deck'}
            </Button>
        </form>
    );
};

export default DeckForm;
