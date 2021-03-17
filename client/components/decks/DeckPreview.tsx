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
                {deck.cards.map(c => (<li key={c.name}>{c.name}</li>))}
            </ul>
        </>
    );
};

export default DeckPreview;
