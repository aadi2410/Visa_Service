import * as React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import '../component/custom.css';
import Header_img from '../assets/header_img.png';
import About_img from '../assets/about.png';
import Apply from '../assets/apply-online.png';
import Pay from '../assets/pay.png';
import ETA from '../assets/eta.png';
import Checkpost from '../assets/checkpost.png';
import Blogcard from './card';
import HeaderNavbarLogin from './afterloginnavbar';

function LoginLandingPage() {

    return (
        <HeaderNavbarLogin>
            <Box>
                <img src={Header_img} className='hedaer_img' alt="" />
                <Container maxWidth="xl">
                    <Box>
                        <Typography variant='h4' mt={10} style={{ textAlign: 'center' }}>eVisa Application Process</Typography>
                        <Box className='process_box'>
                            <Box>
                                <img src={Apply} alt="" />
                                <Typography variant='h6'>Apply Online</Typography>
                                <Typography>Upload Photo & Passport Page</Typography>
                            </Box>
                            <Box>
                                <img src={Pay} alt="" />
                                <Typography variant='h6'>Pay eVisa Fee Online</Typography>
                                <Typography>Using Debit Card / Credit Card / Payment Wallet</Typography>
                            </Box>
                            <Box>
                                <img src={ETA} alt="" />
                                <Typography variant='h6'>Receive ETA Online</Typography>
                                <Typography>Electronic Travel Authorization/ETA will be sent to your e-mail</Typography>
                            </Box>
                            <Box>
                                <img src={Checkpost} alt="" />
                                <Typography variant='h6'>Fly</Typography>
                                <Typography>Print ETA and present at immigration check post where eVisa will be Stamped on passport</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Grid container spacing={5} mt={10}>
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
                    <Box mt={10}>
                        <Typography variant='h4' style={{ textAlign: 'center', marginBottom: 30 }}>Blogs</Typography>
                        <Box className='blog-card-box'>
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </HeaderNavbarLogin>

    );
}
export default LoginLandingPage;
