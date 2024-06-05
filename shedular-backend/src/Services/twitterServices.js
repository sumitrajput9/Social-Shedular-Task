const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const FormData = require('form-data');
const fs = require('fs');
// const path = require('path');
const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumerKey,
    consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  
  async function uploadMediatwi(filePath) {
    const form = new FormData();
    form.append('media', fs.createReadStream(filePath));
  
    const url = 'https://upload.twitter.com/1.1/media/upload.json';
    const authHeader = oauth.toHeader(
      oauth.authorize({ url, method: 'POST' }, { key: accessToken, secret: accessTokenSecret })
    );
  
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
        ...authHeader,
      },
    });
  
    return response.data.media_id_string;
  }
  
//   async function postToTwitter(postContent, mediaKeys = []) {
//     const url = 'https://api.twitter.com/2/tweets';
//     const authHeader = oauth.toHeader(
//       oauth.authorize({ url, method: 'POST' }, { key: accessToken, secret: accessTokenSecret })
//     );
  
//     const requestBody = {
//       text: postContent,
//     };
  
//     if (mediaKeys.length > 0) {
//       requestBody.media_keys = mediaKeys;
//     }
  
//     try {
//       const response = await axios.post(url, requestBody, {
//         headers: {
//           ...authHeader,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       console.log('Posted to Twitter:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error posting to Twitter:', error.response.data);
//       throw error;
//     }
//   }
  
  

module.exports = { uploadMediatwi, postToTwitter };
