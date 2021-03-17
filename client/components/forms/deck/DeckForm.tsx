import React, {useState} from 'react';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import deckFormValidationSchema from "./deckFormValidationSchema";
import useStyles from '../style';
import {DeckDto, DeckInputDto} from "../../../types/deck";
import {useQuery} from "@apollo/client";
import {GET_CARDS} from "../../../apollo/queries";
import CardsList from "../../cards/CardsList";
import CardDto from "../../../types/card";

// todo: props (inherit), onSubmit any
type DeckFormProps = {
    onSubmit: any,
    loading: boolean,
    initialValues?: DeckDto,
}

const DeckForm = ({onSubmit, loading, initialValues}: DeckFormProps) => {
    const {data} = useQuery(GET_CARDS);
    const classes = useStyles();
    const [deckCards, setDeckCards] = useState<CardDto[]>([]);

    const cards = data && data.cards || [];

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
            cards: [],
        };
    }

    const initVal = getInitialValues(initialValues);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initVal,
        validationSchema: deckFormValidationSchema,
        onSubmit,
    });

    const renderSelectedCards = () => {
        return (<>{
            deckCards.map(c => (<p key={c._id}>{c.name}</p>))
        }</>)
    };

    return (
        <>
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

            {renderSelectedCards()}
            <CardsList cards={cards} onCardClick={card => {
                setDeckCards(prevState => [...prevState, card])
            }}/>
        </>
    );
};

export default DeckForm;
