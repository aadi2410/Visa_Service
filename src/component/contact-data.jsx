import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
//   marginTop: '50px',
});

const ContactUs = () => {
  return (
    <StyledContainer maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          paddingTop: '0px',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
          Have any questions? We’d love to hear from you.
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default ContactUs;
