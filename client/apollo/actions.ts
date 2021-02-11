import {useMutation, useQuery} from '@apollo/client';
import {CREATE_DECK, DELETE_DECK, GET_DECKS, UPDATE_DECK} from './queries';

// const onDeckCreated = (cache, {data: {createDeck}}) => {
// 	const {decks: cachedDecks} = cache.readQuery({query: GET_DECKS});
// 	const decks = [...cachedDecks, createDeck];
//
// 	cache.writeQuery({
// 		query: GET_DECKS,
// 		data: {decks},
// 	});
// }

const onDeckDeleted = (cache, {data: {deleteDeck}}) => {
	const {decks: cachedDecks} = cache.readQuery({query: GET_DECKS})
	const decks = cachedDecks.filter(p => p._id !== deleteDeck);

	cache.writeQuery({
		query: GET_DECKS,
		data: { decks }
	});
}

export const useGetDecks = () => useQuery(
	GET_DECKS,
	{
		// Setting this value to true will make the component rerender when
		// the "networkStatus" changes, so we are able to know if it is fetching
		// more data
		notifyOnNetworkStatusChange: true,
	}
);

export const useCreateDeck = () => useMutation(CREATE_DECK);

// todo: warning Cache data may be lost when replacing the decks field of a Query object
export const useDeleteDeck = () => useMutation(DELETE_DECK, {update: onDeckDeleted});

export const useUpdateDeck = () => useMutation(UPDATE_DECK);
