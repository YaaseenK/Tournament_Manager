const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'INSERT YOUR MONGODB CONNECTION', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
