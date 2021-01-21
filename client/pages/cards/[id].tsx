import Head from 'next/head'
import {Box, Card as MuiCard, CardContent, CardHeader, CardMedia, makeStyles, Typography} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {initializeApollo} from '../../lib/apollo';
import {GET_CARD, GET_CARDS} from '../../apollo/queries';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		backgroundSize: 'contain'
	},
}));

// SSG, cards collection will not change
export default function Card({id}) {
	const {data} = useQuery(GET_CARD, {variables: {id}});
	const classes = useStyles();

	const card = data && data.card || [];

	return (
		<>
			<Head>
				<title>Cards | {card.title}</title>
			</Head>
			<section>
				<h2>Card</h2>
				<Box display="flex" flexWrap="wrap">
					<Box key={card._id} m={1}>
						<MuiCard className={classes.root}>
							<CardHeader
								title={card.name}
								subheader={card.flavor}
							/>
							<CardMedia
								className={classes.media}
								image={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`}
								title={card.name}
							/>
							<CardContent>
								<Typography variant="h5" component="h2" dangerouslySetInnerHTML={{__html: card.text}}/>
							</CardContent>
						</MuiCard>
					</Box>
				</Box>
			</section>
		</>
	)
}

export async function getStaticProps({params: {id}}) {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_CARD,
		variables: {id}
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
			id
		},
		revalidate: 1,
	}
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo()

	const {data: {cards}} = await apolloClient.query({
		query: GET_CARDS,
	})

	return {
		paths: cards.map(c => ({
			params: {id: c._id},
		})),
		fallback: false, // redirect to 404 when id not found
	};
}
