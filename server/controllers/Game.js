const models = require('../models');
const Game = models.Game;

//game library page
const libraryPage = (req, res) => {

    Game.GameModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured' });
        }

        return res.render('app', {games: docs, premium: req.session.account.premium });
    });
};

//post new game
const makeGame = (req, res) => {
    if (!req.body.name || !req.body.status || !req.body.rating || !req.body.review) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const gameData = {
        name: req.body.name,
        status: req.body.status,
        rating: req.body.rating,
        review: req.body.review,
        owner: req.session.account._id,
    };

    const newGame = new Game.GameModel(gameData);
    const gamePromise = newGame.save();

    gamePromise.then(() => res.json({ redirect: '/library' }));

    gamePromise.catch((err) => {
        console.log(err);

        if(err.code === 11000){
            return res.status(400).json({ error: 'Game entered already exists' });
        }

        return res.status(400).json({ error: 'An error occured' });
    });

    return gamePromise;
}

//get games for user
const getGames = (request, response) => {
    const req = request;
    const res = response;

    return Game.GameModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }

        return res.json({ games: docs });
    });
};

//shows all reviews
const reviewPage = (request, response) => {
    Game.GameModel.findAll((err, docs) => {
        if(err){
            return response.status(400).json({ error: 'An error occured' });
        }

        //only show game logs with reviews
        let filteredDocs = [];
        for(let i = 0; i < docs.lengths; i++) {
            if (docs[i].review) {
                filteredDocs.push(docs[i]);
            }
        }

        return response.render('public', {games: filteredDocs})
    });
}

//redirect
const pageNotFound = (req, res) => {
    res.redirect('/');
}

module.exports.libraryPage = libraryPage;
module.exports.getGames = getGames;
module.exports.make = makeGame;
module.exports.reviewPage = reviewPage;
module.exports.pageNotFound = pageNotFound;