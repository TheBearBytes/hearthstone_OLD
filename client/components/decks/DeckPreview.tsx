import React from 'react';
import {DeckDto} from "../../types/deck";

type DeckPreviewProps = {
    deck: DeckDto
}

const DeckPreview = ({deck}: DeckPreviewProps) => {
    return (
        <>
            <p>{deck.description}</p>
            <ul>
                {deck.cards.map(c => (<li key={c.name}>{c.name}</li>))}
            </ul>
        </>
    );
};

export default DeckPreview;
