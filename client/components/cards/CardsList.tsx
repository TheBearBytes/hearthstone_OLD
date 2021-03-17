import React from 'react';
import CardDto from "../../types/card";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

type CardsListProps = {
    cards: CardDto[],
    onCardClick: (card: CardDto) => void,
}

const CardsList = ({cards, onCardClick}: CardsListProps) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Attack</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>CardClass</TableCell>
                        <TableCell>Rarity</TableCell>
                        <TableCell>Set</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((card) => (
                        <TableRow
                            key={card._id}
                            onClick={() => onCardClick(card)}
                        >
                            <TableCell component="th" scope="row">
                                {card.name}
                            </TableCell>
                            <TableCell>{card.attack}</TableCell>
                            <TableCell>{card.cost}</TableCell>
                            <TableCell>{card.cardClass}</TableCell>
                            <TableCell>{card.rarity}</TableCell>
                            <TableCell>{card.set}</TableCell>
                            <TableCell>{card.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CardsList;
