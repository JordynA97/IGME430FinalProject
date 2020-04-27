const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
    res.render('login', { csrfToken: req.csrfToken() });
};

//set up profile page
const profilePage = (req, res) => {
    res.render('profile', { username: req.session.account.username, premium: req.session.account.premium, 
        csrfToken: req.csrfToken() });
}

//set up public page
const publicPage = (req, res) => {
    res.render('public', { csrfToken: req.csrfToken() });
}
  
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

const login = (request, response) => {
    const req = request;
    const res = response;

    const username = `${req.body.username}`;
    const password = `${req.body.pass}`;

    if(!username || !password){
        return res.status(400).json({ error: 'Make sure all fields are filled!' });
    }

    return Account.AccountModel.authenticate(username, password, (err, account) => {
        if(err || !account){
            return res.status(401).json({ error:'Wrong username or password' });
        }

        req.session.account = Account.AccountModel.toAPI(account);

        return res.json({ redirect: '/library' });
    });
};

const signup = (request, response) => {
    const req = request;
    const res = response;

    req.body.username = `${req.body.username}`;
    req.body.pass = `${req.body.pass}`;
    req.body.pass2 = `${req.body.pass2}`;

    if(!req.body.username || !req.body.pass || !req.body.pass2){
        return res.status(400).json({ error: 'Make sure all fields are filled!' });
    }

    if(req.body.pass !== req.body.pass2) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
        const accountData = {
            username: req.body.username,
            salt,
            password: hash,
            premium: false,
        };

        const newAccount = new Account.AccountModel(accountData);
        const savePromise = newAccount.save();

        savePromise.then(() => {
            req.session.account = Account.AccountModel.toAPI(newAccount);
            res.json({ redirect: '/library' });
        });

        savePromise.catch((err) => {
            console.log(err);

            if(err.code === 11000) {
                return res.status(400).json({ error: 'Username already in use'});
            }

            return res.status(400).json({ error: 'an error occured'});
        });
    });
};

//get token
const getToken = (request, response) => {
    const req = request;
    const res = response;

    const csrfJSON = {
        csrfToken: req.csrfToken(),
    };

    res.json(csrfJSON);
};

//update premium to true
const upgrade = (request, response) => {
    const req = request;
    const res = response;

    const updatePromise = Account.AccountModel.updateOne({ _id: req.session.account._id }, { $set:{ premium: true }});
}

//change password page is displayed
const passwordPage = (req, res) => res.render('password', {username: req.session.account.username});

const changeUserPass = (request, response) => {
    const req = request;
    const res = response;

    //all fields filled
    if(!req.body.newPass || !req.body.newPass2){
        return res.status(400).json({ error: 'All fields required' });
    }

    //passwords must match
    if(req.body.newPass !== req.body.newPass2){
        return res.status(400).json({ error: 'Passwords must match'});
    }

    //create new password for that users account
    return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
        const updatePassword = Account.AccountModel.updateOne({ _id: req.session.account._id },
            {
                salt,
                password: hash,
            });

            //send user back to the library screen
            updatePassword.then(res.json({ redirect: '/library' }));
    });
};

module.exports.loginPage = loginPage;
module.exports.profilePage = profilePage;
module.exports.publicPage = publicPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.upgrade = upgrade;
module.exports.passwordPage = passwordPage;
module.exports.changeUserPass = changeUserPass;