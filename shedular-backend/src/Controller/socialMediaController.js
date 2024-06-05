const OAuth = require('oauth');
const crypto = require('crypto');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
require('dotenv').config();
const FormData = require('form-data');
const { postToFacebook, uploadMedia } = require('../Services/facebookService');
// const { postToTwitter, uploadMediatwi } = require('../Services/twitterServices');
 const consumerKey= process.env.CONSUMER_KEY;
  const consumerSecret=process.env.CONSUMER_SECRET;
  const accessToken=process.env.ACCESS_TOKEN;
  const accessTokenSecret=process.env.ACCESS_TOKEN_SECRET;
const postToFacebookHandler = async (req, res) => {
    const { text } = req.body;
    const media = req.file;
  
    try {
      let mediaId = null;
      if (media) {
        const filePath = path.resolve(__dirname, '..', '..', 'uploads', media.filename);
  
        console.log('Media file path:', filePath);
  
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }
  
        if (media.mimetype.startsWith('image')) {
          const newFilePath = `${filePath}-modified.jpg`;
          await sharp(filePath)
            .resize(800, 800, { fit: 'inside' })
            .toFile(newFilePath);
  
          console.log('Modified image file path:', newFilePath);
  
          if (fs.existsSync(newFilePath)) {
            mediaId = await uploadMedia(newFilePath);
            fs.unlinkSync(newFilePath); 
          } else {
            throw new Error(`Modified file not found: ${newFilePath}`);
          }
        } else {
          mediaId = await uploadMedia(filePath, media.mimetype.startsWith('video'));
        }
  
        fs.unlinkSync(filePath); 
      }
  
      const postData = {
        message: text || '', // Ensure text is included, or provide an empty string if it's not provided
      };
  
      if (mediaId) {
        postData.attachments = [{
          media: {
            media_type: media.mimetype.startsWith('image') ? 'IMAGE' : 'VIDEO',
            media_url: mediaId
          }
        }];
      }
  
      const response = await postToFacebook(postData);
      res.json({ message: 'Successfully posted to Facebook', data: response });
    } catch (error) {
      console.error('Error posting to Facebook:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  };
  
  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumerKey,
    consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  
  const postToTwitter = (req, res) => {
    const { text } = req.body;
  
    oauth.post(
      'https://api.twitter.com/2/tweets',
      accessToken,
      accessTokenSecret,
      JSON.stringify({ text }),
      'application/json',
      (error, data) => {
        if (error) {
          console.error('Error posting to Twitter:', error);
          res.status(500).json({ error: error });
        } else {
          res.json(JSON.parse(data));
        }
      }
    );
  };
  

module.exports = { postToFacebookHandler ,postToTwitter};
