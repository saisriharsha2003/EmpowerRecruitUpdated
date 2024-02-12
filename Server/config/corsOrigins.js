const whitelist = require('./whitelist');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1)
            callback(null, true);
        else
            callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
