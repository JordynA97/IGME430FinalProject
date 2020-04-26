const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getGames', mid.requiresLogin, controllers.Game.getGames);
    app.get('/getPosts', mid.requiresLogin);
    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.get('/profile', mid.requiresLogin,mid.requiresSecure, controllers.Account.profilePage);
    app.get('/public', mid.requiresLogin, mid.requiresSecure, controllers.Account.publicPage);
    app.get('/library', mid.requiresLogin, controllers.Game.libraryPage);
    app.post('/library', mid.requiresLogin, controllers.Game.make);
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;