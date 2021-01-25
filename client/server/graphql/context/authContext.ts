const authenticateUser = ({email, password}) => {
	console.log('authenticateUser', email, password);
}

const authContext = () => ({
	authenticate: (options) => authenticateUser(options)
});

export default authContext;
