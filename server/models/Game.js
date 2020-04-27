const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let GameModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },

    status: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        min: 0,
        required: false,
    },

    review: {
        type: String,
        required: false,
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    createdData: {
        type: Date,
        default: Date.now,
    },
});

GameSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    status: doc.status,
    rating: doc.rating,
    review: doc.review,
});

GameSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return GameModel.find(search).select('name status rating review').lean().exec(callback);
};

GameSchema.statics.findAll = (callback) => GameModel.find().select('name status rating review').lean().exec(callback);

GameModel = mongoose.model('Game', GameSchema);

module.exports.GameModel = GameModel;
module.exports.GameSchema = GameSchema;