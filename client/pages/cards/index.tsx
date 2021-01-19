import Head from 'next/head'
import {Box, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {initializeApollo} from '../../lib/apollo';
import {GET_CARDS} from '../../apollo/queries';

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
export default function Cards() {
	const {data} = useQuery(GET_CARDS);
	const classes = useStyles();

	const cards = data && data.cards || [];

	return (
		<>
			<Head>
				<title>Cards</title>
			</Head>
			<section>
				<h2>Cards</h2>
				<Box display="flex" flexWrap="wrap">
					{cards.map(card => (
						<Box key={card._id} m={1}>
							<Card className={classes.root}>
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
									<Typography variant="h5" component="h2" dangerouslySetInnerHTML={{__html: card.text}} />
								</CardContent>
							</Card>
						</Box>
					))}
				</Box>
			</section>
		</>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_CARDS,
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}
