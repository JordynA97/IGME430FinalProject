const models = require('../models');
const Game = models.Game;

const libraryPage = (req, res) => {
    Game.GameModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured' });
        }

        return res.render('app', { csrfToken: req.csrfToken(), games: docs });
    });
};

const makeGame = (req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({ error: 'RAWR! Both name and age are required' });
    }

    const gameData = {
        name: req.body.name,
        status: req.body.status,
        rating: req.body.rating,
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

module.exports.libraryPage = libraryPage;
module.exports.getGames = getGames;
module.exports.make = makeGame;