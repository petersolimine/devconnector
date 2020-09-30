const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const Profile = require ('../../../models/Profile');
const User = require ('../../../models/User');

// @route   GET api/profile/me
// @desc    get current user's profile
// @access  Public
router.get('/me', async (req, res) => {
    try {
        const profile = await profile.findOne({ user: req.user.id}).populate('user',
        ['name', 'avatar']);

        if (!profile){
            return res.status(400).json({msg: 'There is no profile for this user'}
            );
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   Post api/profile
// @desc    create or update a user's profile
// @access  Private

router.post('/', [auth, 
    [
check('status', 'status is required')
.not()
.isEmpty(), 
check('skills')
.not()
.isEmpty()
]
 ],
 async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
     }
});


// @route   GET api/profile
// @desc    get all profiles
// @access  Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).sendStatus('server error');
    }
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
     }
});

// @route   GET api/profile/user/:user_id
// @desc    get profile by user id
// @access  Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({msg: 'Profile not found'});
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        if(err.kind=='ObjectId'){
            if(!profile) return res.status(400).json({msg: 'Profile not found'});

        }
        res.status(500).sendStatus('server error');
    }
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
     }
});

module.exports = router;



