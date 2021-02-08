module.exports = {
    env: {
        // expose .env variables to client (don't expose sensitive vars!)
        URL: process.env.URL,
    },
};
