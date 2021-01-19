import Card from '../../../db/models/card'

const cardQueries = {
	card: (root, {id}) => Card.findById(id),
	cards: () => Card.find({}).limit(10),
};

export default cardQueries;
