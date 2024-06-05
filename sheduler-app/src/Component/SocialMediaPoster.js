import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Paper, Snackbar } from '@mui/material';


export function SocialMediaApp() {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post to Facebook
      const fbFormData = new FormData();
      fbFormData.append('text', postContent);
      if (media) {
        fbFormData.append('media', media);
      }
      await axios.post('http://localhost:5000/social-media/post-fb', fbFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Post to Twitter
      if (media) {
        await axios.post('http://localhost:5000/social-media/post-twitter', { text: postContent }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post('http://localhost:5000/social-media/post-twitter', { text: postContent });
      }

      console.log('Posted to Facebook and Twitter');
      setAlertMessage('Posted to Facebook and Twitter successfully');
      setAlertOpen(true);
      setPostContent('');
      setMedia(null);
    } catch (error) {
      console.error('Error posting to Facebook and Twitter:', error);
      setAlertMessage('Error posting to Facebook and Twitter');
      setAlertOpen(true);
    }
  };

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Post to Social Media</Typography>
          <form onSubmit={handlePostSubmit}>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={postContent}
              onChange={handlePostChange}
              label="What's on your mind?"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <input
              type="file"
              onChange={handleMediaChange}
              accept="image/*, video/*"
              style={{ display: 'none' }}
              id="media-input"
            />
            <label htmlFor="media-input">
              <Button variant="contained" component="span">Add Media</Button>
            </label>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>{media ? media.name : 'No media selected'}</Typography>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Post</Button>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message={alertMessage}
      />
    </Grid>
  );
}
