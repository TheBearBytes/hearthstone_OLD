import React from 'react';
import {Form, Formik, Field, ErrorMessage, FieldArray} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import deckFormValidationSchema from "./deckFormValidationSchema";
import useStyles from '../style';
import {DeckDto, DeckInputDto} from "../../../types/deck";
import {useQuery} from "@apollo/client";
import {GET_CARDS} from "../../../apollo/queries";
import CardsList from "../../cards/CardsList";
import {ArrayHelpers} from "formik/dist/FieldArray";

// todo: props (inherit), onSubmit any
type DeckFormProps = {
    onSubmit: any,
    loading: boolean,
    initialValues?: DeckDto,
}

const DeckForm = ({onSubmit, loading, initialValues}: DeckFormProps) => {
        const {data} = useQuery(GET_CARDS);
        const classes = useStyles();

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

        return (
            <>
                <Formik
                    enableReinitialize={true}
                    validateOnChange={true}
                    validationSchema={deckFormValidationSchema}
                    initialValues={getInitialValues(initialValues)}
                    onSubmit={onSubmit}
                >
                    {({values, errors, isSubmitting}) => (
                        <Form>
                            <Field
                                placeholder="title"
                                name="title"
                                type="input"
                                as={TextField}
                            />
                            <ErrorMessage name="title"/>
                            <Field
                                placeholder="description"
                                name="description"
                                type="input"
                                as={TextField}
                            />
                            <ErrorMessage name="description"/>
                            <FieldArray name="cards">
                                {(arrayHelpers: ArrayHelpers) => (
                                    <div>
                                        {values.cards.map((c, i) => (
                                            <div key={c}>{c} <Button onClick={() => arrayHelpers.remove(i)}>X</Button></div>
                                        ))}
                                        <CardsList cards={cards} onCardClick={card => {
                                            arrayHelpers.push(card._id)
                                        }}/>
                                    </div>
                                )}
                            </FieldArray>
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
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
;

export default DeckForm;
