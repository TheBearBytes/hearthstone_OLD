import React from 'react';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import newDeckFormValidationSchema from "./newDeckFormValidationSchema";
import useStyles from '../style';

const tmpRandomCardsSet = [
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
    `AT_0${Math.floor(Math.random() * (99 - 10 + 1)) + 10}`,
];

const NewDeckForm = ({onSubmit, loading}) => {
    const classes = useStyles();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            description: '',
            cardsId: tmpRandomCardsSet,
        },
        validationSchema: newDeckFormValidationSchema,
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
                Create deck
            </Button>
        </form>
    );
};

export default NewDeckForm;
