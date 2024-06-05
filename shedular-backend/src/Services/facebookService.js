require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fbPageId = '333162339878331';
let fbAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;
const appId = process.env.FACEBOOK_APP_ID;
const appSecret = process.env.FACEBOOK_APP_SECRET;
let tokenExpiryDate = new Date('2024-06-04T12:00:00Z'); 
async function refreshAccessToken() {
  if (new Date() > tokenExpiryDate) {
    try {
      const response = await axios.get(`https://graph.facebook.com/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: appId,
          client_secret: appSecret,
          fb_exchange_token: fbAccessToken
        }
      });
      fbAccessToken = response.data.access_token;
      // Set a new token expiry date, typically this is 60 days from now
      tokenExpiryDate = new Date();
      tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 60);
      console.log('Access token refreshed:', fbAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    }
  }
}

async function uploadMedia(filePath, isVideo = false) {
  await refreshAccessToken(); // Refresh token if necessary

  console.log('Uploading media file path:', filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const form = new FormData();
  form.append('access_token', fbAccessToken);
  form.append(isVideo ? 'file' : 'source', fs.createReadStream(filePath));

  const url = isVideo
    ? `https://graph-video.facebook.com/${fbPageId}/videos`
    : `https://graph.facebook.com/${fbPageId}/photos`;

  const response = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
    },
  });

  return response.data.id;
}

async function postToFacebook(postData) {
  await refreshAccessToken(); // Refresh token if necessary

  const url = `https://graph.facebook.com/${fbPageId}/feed`;
  const response = await axios.post(url, {
    ...postData,
    access_token: fbAccessToken,
  });

  return response.data;
}

module.exports = { uploadMedia, postToFacebook };
