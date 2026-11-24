const mongoose = require('mongoose');

const watchLaterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    }]
});

module.exports = mongoose.model('WatchLater', watchLaterSchema);