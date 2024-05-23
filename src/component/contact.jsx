import * as React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import '../component/custom.css';
import Contact_img from '../assets/contact.png';
import About_img from '../assets/about.png';
import Apply from '../assets/apply-online.png';
import Pay from '../assets/pay.png';
import ETA from '../assets/eta.png';
import Checkpost from '../assets/checkpost.png';
import Blogcard from './card';
import HeaderNavbar from './navbar';
import ContactUs from './contact-data';

function ContactPage() {

    return (
        <HeaderNavbar>
            <Box>
                <img src={Contact_img} className='contact_header_img' alt="" />
                <Container maxWidth="xl">
                    <Grid container spacing={5} mt={10} style={{alignItems: 'center'}}>
                        <Grid item xs={12} md={5}>
                            <img src={About_img} className='about_img' alt="" />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <ContactUs  />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </HeaderNavbar>
    );
}
export default ContactPage;
