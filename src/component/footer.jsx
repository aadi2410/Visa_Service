import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer className='footer_box'>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Visa Apply
            </Typography>
            <Typography variant="body1" style={{maxWidth: 300}}>
              Your trusted partner for visa applications. Simplifying your travel experience.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body1">
              Home
            </Typography>
            <Typography variant="body1">
              About Us
            </Typography>
            <Typography variant="body1">
              Blogs
            </Typography>
            <Typography variant="body1">
              Privacy Policy
            </Typography>
            <Typography variant="body1">
              FAQ
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              Email: info@visaapply.com<br />
              Phone: +1 123-456-7890<br />
              Address: 123 Visa Street, City, Country
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" style={{ marginTop: 20, borderTop: '2px solid white', paddingTop: 20 }} align="center">
          &copy; {new Date().getFullYear()} Visa Apply. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
