const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const createdDate = req.body.createdDate;
    const newUser = new User({username, password, createdDate});

    newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
    User.findOne({username:req.params.username})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signin').get((req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;
         
        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            console.log(req.body.password, isMatch); // -&gt; Password123: true
        });
         
        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -&gt; 123Password: false
        });
        
    }).then(res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;