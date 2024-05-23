import * as React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import '../component/custom.css';
import About_img_bg from '../assets/aboutbg.png';
import About_img from '../assets/about.png';
import Apply from '../assets/apply-online.png';
import Pay from '../assets/pay.png';
import ETA from '../assets/eta.png';
import Checkpost from '../assets/checkpost.png';
import Blogcard from './card';
import HeaderNavbar from './navbar';

function AboutPage() {

    return (
        <HeaderNavbar>
            <Box>
                <img src={About_img_bg} className='about_header_img' alt="" />
                <Container maxWidth="xl">
                    <Grid container spacing={5} mt={10} mb={10}>
                        <Grid item xs={12} md={7}>
                            <Typography variant="h4" align="center" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Visa Apply is dedicated to making the visa application process as smooth and hassle-free as possible for travelers around the world.
                                Our team of experienced professionals is committed to providing reliable visa assistance and guidance, ensuring that your travel plans
                                are executed seamlessly.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Whether you're planning a leisure trip, business travel, or visiting family abroad, Visa Apply is your trusted partner every step of the way.
                                We understand the complexities of visa applications and strive to simplify the process, saving you time and effort.
                            </Typography>
                            <Typography variant="body1">
                                At Visa Apply, customer satisfaction is our top priority. We are here to address your concerns, answer your questions, and provide personalized
                                support to meet your specific travel needs. Trust Visa Apply for all your visa application requirements and embark on your journey with confidence.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <img src={About_img} className='about_img' alt="" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </HeaderNavbar>
    );
}
export default AboutPage;
