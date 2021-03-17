import React from 'react';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import deckFormValidationSchema from "./deckFormValidationSchema";
import useStyles from '../style';
import {DeckDto, DeckInputDto} from "../../../types/deck";

const tmpRandomCardsSet = [
    '605071e1754c340063b0228e',
];

// todo: props (inherit), onSubmit any
type DeckFormProps = {
    onSubmit: any,
    loading: boolean,
    initialValues?: DeckDto,
}

const DeckForm = ({onSubmit, loading, initialValues}: DeckFormProps) => {
    console.log('init vals', initialValues);

    const getInitialValues = (initVal: DeckDto): DeckInputDto => {
        if (initVal) {
            return {
                ...initVal,
                cards: initVal.cards.map(c => c._id)
            }
        }

        return {
            title: '',
            description: '',
            cards: tmpRandomCardsSet,
        };
    }

    const initVal = getInitialValues(initialValues);

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
