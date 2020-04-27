const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    //get token
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

    //load games
    app.get('/getGames', mid.requiresLogin, controllers.Game.getGames);

    //load posts
    app.get('/getPosts', mid.requiresLogin);

    //login page
    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

    //signup
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

    //logout
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);

    //profile page
    app.get('/profile', mid.requiresLogin,mid.requiresSecure, controllers.Account.profilePage);
    app.post('/profile', mid.requiresLogin, mid.requiresSecure, controllers.Account.upgrade);

    //public reviews page
    app.get('/public', mid.requiresLogin, mid.requiresSecure, controllers.Game.reviewPage);

    //library page
    app.get('/library', mid.requiresLogin, controllers.Game.libraryPage);
    app.post('/library', mid.requiresLogin, controllers.Game.make);

    //password page
    app.get('/password', mid.requiresLogin, controllers.Account.passwordPage);
    app.post('/password', mid.requiresLogin, controllers.Account.changeUserPass);

    //default
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;