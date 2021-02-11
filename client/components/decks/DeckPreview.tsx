import React from 'react';
import DeckType from "../../types/deck";

type DeckPreviewProps = {
    deck: DeckType
}

const DeckPreview = ({deck}: DeckPreviewProps) => {
    return (
        <>
            <p>{deck.description}</p>
            <ul>
                {deck.cardsId.map(c => (<li key={c}>{c}</li>))}
            </ul>
        </>
    );
};

export default DeckPreview;
