const express = require('express');
const request = require('request');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const Profile = require ('../../models/Profile');
const User = require ('../../models/User');
const { profileEnd } = require('console');

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
});

// @route   Delete api/profile/
// @desc    delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({_id: req.user.id });
        res.json({msg: 'user deleted successfully'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  Private
router.put('/experience', [ auth, [
    check('title', 'Title is required')
        .not()
        .isEmpty(),
    check('company', 'company is required')
        .not()
        .isEmpty(),
    check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const Profile = await Profile.findOne({user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.experience
            .map(item > item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   PUT api/profile/education
// @desc    add profile education
// @access  Private
router.put('/education', [ auth, [
    check('school', 'school is required')
        .not()
        .isEmpty(),
    check('degree', 'degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const Profile = await Profile.findOne({user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});

// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.education
            .map(item > item.id)
            .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})
// @route   GET api/profile/github/:username
// @desc    get user repos from github
// @access  Public

router.get('/github/:username',  async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&cient_id=${config.get('githubClientID')}&cient_secret=${config.get('githubSecret')}`,
            method:GET,
            headers: {'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200){
                return res.status(404).json({ msg: 'no github profile found' });
            }

            res.json(JSON.parse(body));
        })
    } catch (err) {
        consoe.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

module.exports = router;



