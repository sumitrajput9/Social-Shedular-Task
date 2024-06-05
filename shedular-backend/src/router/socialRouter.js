const express = require('express');
const upload = require('../MiddileWare/upload');
const { postToFacebookHandler, postToTwitter } = require('../Controller/socialMediaController');


const router = express.Router();

router.post('/post-fb', upload.single('media'), postToFacebookHandler);
router.post('/post-twitter', postToTwitter);
module.exports = router;
