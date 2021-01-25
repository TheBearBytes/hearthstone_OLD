import Card from '../../db/models/card'

const cardQueries = {
	card: (root, {id}) => Card.findById(id),
	cards: () => Card.find({}).skip(1).limit(30),
};

export default cardQueries;
