import { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Paper, Snackbar } from '@mui/material';

export function TwitterPost() {
    const [postContent, setPostContent] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/social-media/post-twitter', { text: postContent }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Posted to Twitter:', response.data);
            setAlertMessage('Posted to Twitter successfully');
            setAlertOpen(true);
            setPostContent('');
        } catch (error) {
            console.error('Error posting to Twitter:', error);
            setAlertMessage('Error posting to Twitter');
            setAlertOpen(true);
        }
    };

    return (
        <Grid container justifyContent="center" mt={4}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>Post to Twitter</Typography>
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
