import * as React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import '../component/custom.css';
import Blog_img from '../assets/blog.png';
import About_img from '../assets/about.png';
import Apply from '../assets/apply-online.png';
import Pay from '../assets/pay.png';
import ETA from '../assets/eta.png';
import Checkpost from '../assets/checkpost.png';
import Blogcard from './card';
import HeaderNavbar from './navbar';

function BlogPage() {

    return (
        <HeaderNavbar>
            <Box>
                <img src={Blog_img} className='blog_header_img' alt="" />
                <Container maxWidth="xl">
                    <Box mt={10} mb={10}>
                        <Typography variant='h4' style={{ textAlign: 'center', marginBottom: 50 }}>Blogs</Typography>
                        <Box className='blog-card-box'>
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                        </Box>
                        <Box className='blog-card-box' mt={3}>
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                        </Box>
                        <Box className='blog-card-box' mt={3}>
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                            <Blogcard />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </HeaderNavbar>
    );
}
export default BlogPage;
