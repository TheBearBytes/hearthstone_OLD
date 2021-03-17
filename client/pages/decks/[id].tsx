import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {GET_DECK} from '../../apollo/queries';
import {initializeApollo} from '../../lib/apollo';
import {DeckDto} from '../../types/deck';
import DeckPreview from "../../components/decks/DeckPreview";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {useUpdateDeck} from "../../apollo/actions";
import DeckForm from "../../components/forms/deck/DeckForm";
import useToast from "../../hooks/useToast";

export default function Deck({id}) {
    const {data} = useQuery(GET_DECK, {variables: {id}});
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updateDeck] = useUpdateDeck();
    const showToast = useToast();

    const deck: DeckDto = data && data.deck || {};

    const handleUpdateDeck = async (val: DeckDto) => {
        try {
            const {data} = await updateDeck({variables: {id: deck._id, ...val}});
            showToast({
                severity: "success",
                message: `DECK_UPDATED_SUCCESSFULLY ${data.updateDeck.title}`,
            })
        } catch (e) {
            showToast({
                severity: "error",
                message: e.message,
            })
        }

        setEditMode(false);
    }

    const onEditMode = () => {
        setEditMode(prevState => !prevState)
    }

    return (
        <>
            <Head>
                <title>Decks | {deck.title}</title>
            </Head>
            <section>
                <h1>{deck.title}</h1>
                {editMode
                    ? <DeckForm
                        onSubmit={handleUpdateDeck}
                        loading={false}
                        initialValues={deck}
                    />
                    : <DeckPreview deck={deck}/>
                }
                <Button color="primary" onClick={onEditMode}>{editMode ? 'Cancel' : 'Edit'}</Button>
            </section>
        </>
    )
}

export async function getServerSideProps({params: {id}}) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: GET_DECK,
        variables: {id}
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
            id
        }
    }
}
