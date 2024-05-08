import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip, Grid, styled, Button, TextField, TextareaAutosize, Input, Card, CardMedia } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ProfileImage from '../assets/profile.png';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { axiosAuthorized } from '../api/apiconfig';

const ProfileGrid = styled(Grid)({
    '@media(max-width: 767px)': {
        '& .profile_left_box': {
            order: 1,
        },
        '& .profile_left_box  form': {
            flexDirection: 'column'
        },
    }
})
const CustomBox = styled(Box)({
    width: '100%',
    '& .file_name': {
        display: '-webkit-box',
        WebkitLineClamp: 1,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        height: '30px',
    }
})

const drawerWidth = 240;

function ProfilePage(props) {
    const { window } = props;
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('profileData')) || {
        profilePicture: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile_no: '',
        passport: '',
        country: '',
        pinCode: '',
        temporaryAddress: '',
        presentAddress: ''
    });
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem('profileData')) || null)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [isClick, setIsClick] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const fileUrl = URL.createObjectURL(event.target.files[0]);
        setImageUrl(fileUrl);
        setFormData({...formData,profilePicture:event.target.files[0]});
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const getProfileData = async () => {
        try {
            let userId = localStorage.getItem('user_id') || null;
            if (userId) {

                const response = await axiosAuthorized.get(`getProfile/${JSON.parse(localStorage.getItem('user_id'))}`);
                const { user } = response.data;
                setFormData({
                    ...formData, firstName: user.firstName, lastName: user.lastName, mobile_no: user.mobile_no, email: user.email, passport: user.passport,
                    country: user.country,
                    pinCode: user.pinCode,
                    presentAddress: user.presentAddress,
                    temporaryAddress: user.temporaryAddress

                })
                setProfileData({ ...profileData, firstName: user.firstName, lastName: user.lastName, mobile_no: user.mobile_no, email: user.email });
                setImageUrl(user.profilePicture);

            }

        } catch (error) {
            // toast.error("Something went wrong");
        }
    }
    console.log(formData)
    const updateProfileData = async () => {
        try {
            let userId = localStorage.getItem('user_id') || null;
            if (userId) {
                const formDataToSend = new FormData();
                formDataToSend.append('firstName', formData.firstName);
                formDataToSend.append('profilePicture', formData.profilePicture);
        console.log(formDataToSend)
                const response = await axiosAuthorized.put(`getProfile/${JSON.parse(localStorage.getItem('user_id'))}`,formDataToSend,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                
                });
                const { user } = response.data;
                setFormData({ ...formData, firstName: user.firstName, lastName: user.lastName, mobile_no: user.mobile_no, email: user.email })
                setProfileData({ ...profileData, firstName: user.firstName, lastName: user.lastName, mobile_no: user.mobile_no, email: user.email, presentAddress: user.presentAddress });
                console.log(user,user.profilePicture)
                setImageUrl(user.profilePicture);
            }

        } catch (error) {
            // toast.error("Something went wrong");
        }
    }
    console.log(imageUrl)
    React.useEffect(() => {
        getProfileData()
    }, [])
    const drawer = (
        <div>
            <Toolbar>
                <img style={{ width: 120, objectFit: 'cover' }} src={Logo} alt="" />
            </Toolbar>
            <Divider />
            <List style={{ padding: 0 }}>
                <ListItem disablePadding>
                    <Link to='/dashboard' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Dashboard</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/profilepage' className="sidebar_item active">
                        <SwipeRightAltIcon />
                        <Typography>Profile</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/applyvisa' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Apply for Visa</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/privacypolicy' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Privacy Policy</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/faq' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>FAQ</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/login' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Logout</Typography>
                    </Link>
                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
        updateProfileData()
    };

    const {
        profilePicture = '',
        firstName = '',
        lastName = '',
        email = '',
        mobile_no = '',
        passport = '',
        country = '',
        pinCode = '',
        temporaryAddress = '',
        presentAddress = ''
    } = profileData || {};
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6" noWrap component="div">
                            Profile
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Aditya" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem style={{ alignItems: 'baseline' }} onClick={handleCloseUserMenu}>
                                    <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'left' }} to='/'>Home</Link>
                                </MenuItem>
                                <MenuItem style={{ alignItems: 'baseline' }} onClick={handleCloseUserMenu}>
                                    <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'left' }} to='/'>About Us</Link>
                                </MenuItem>
                                <MenuItem style={{ alignItems: 'baseline' }} onClick={handleCloseUserMenu}>
                                    <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'left' }} to='/'>Contact Us</Link>
                                </MenuItem>
                                <MenuItem style={{ alignItems: 'baseline' }} onClick={handleCloseUserMenu}>
                                    <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'left' }} to='/'>Logout</Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <ProfileGrid container spacing={5}>
                    <Grid className='profile_left_box' item xs={12} md={7} lg={9}>
                        <form style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            <Box style={{ flex: 1, minWidth: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Upload your profile picture</label>
                                <TextField
                                    name="profilePicture"
                                    type="file"
                                    onChange={handleFileChange}
                                    inputProps={{ accept: 'image/*' }}
                                    id="file-upload"
                                    variant="outlined"
                                    required
                                />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>First Name</label>
                                <TextField
                                    value={formData.firstName}
                                    required name="firstName" onChange={handleInputChange} placeholder='Enter your name' type="text" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Last Name</label>
                                <TextField
                                    value={formData.lastName}

                                    required name="lastName" onChange={handleInputChange} placeholder='Enter your name' type="text" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Email Address</label>
                                <TextField
                                    value={formData.email}

                                    required name="email" onChange={handleInputChange} placeholder='Enter your email' type="email" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Phone Number</label>
                                <TextField
                                    value={formData.mobile_no}

                                    required name="mobile_no" onChange={handleInputChange} placeholder='Enter your number' type="number" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Passport</label>
                                <TextField
                                    value={formData.passport}
                                    required name="passport" onChange={handleInputChange} placeholder='Enter your passport no' type="text" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Country</label>
                                <TextField
                                    value={formData.country}
                                    required name="country" onChange={handleInputChange} placeholder='Enter your Country' type="text" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Pin Code</label>
                                <TextField
                                    value={formData.pinCode}
                                    required name="pincode" onChange={handleInputChange} placeholder='Enter your pincode' type="number" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Temporary address</label>
                                <TextareaAutosize
                                    value={formData.temporaryAddress}
                                    required name="temporaryAddress" onChange={handleInputChange} minRows={4} type="text" variant='outlined' />
                            </Box>
                            <Box style={{ flex: 1, minWidth: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                <label>Present Address</label>
                                <TextareaAutosize
                                    value={formData.presentAddress}
                                    required name="presentAddress" onChange={handleInputChange} minRows={4} type="text" variant='outlined' />
                            </Box>
                            <Box style={{ textAlign: 'center', marginTop: 20, flex: 1, minWidth: '100%' }} onClick={handleSubmit}>
                                <Button variant='contained' style={{ minWidth: 200, minHeight: 48 }}>Submit</Button>
                            </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={5} lg={3}>
                        <Box style={{ textAlign: 'left', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', width: '100%', borderRadius: 12, display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                            <Box className='profile_div' style={{ position: 'relative' }}>
                                {imageUrl == null ? (
                                    <img
                                        src={ProfileImage}
                                        alt=""
                                        style={{
                                            maxWidth: 250,
                                            width: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            background: 'lightgray',
                                            marginTop: 16,
                                            aspectRatio: 1 / 1,
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={imageUrl}
                                        alt=""
                                        style={{
                                            maxWidth: 250,
                                            width: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            background: 'lightgray',
                                            marginTop: 16,
                                            aspectRatio: 1 / 1,
                                        }}
                                    />
                                )}
                            </Box>
                            <Box style={{ textAlign: 'center', marginTop: 20 }}>
                                <Typography style={{ textAlign: 'center', marginTop: 5 }}><b>Name:</b> {firstName}</Typography>
                                <Typography style={{ textAlign: 'center', marginTop: 5 }}><b>Email:</b> {email} </Typography>
                                <Typography style={{ textAlign: 'center', marginTop: 5 }}><b>Number:</b> {mobile_no}</Typography>
                                <Typography style={{ textAlign: 'center', marginTop: 5 }}><b>Address:</b> {presentAddress}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </ProfileGrid>
            </Box>
        </Box>
    );
}

ProfilePage.propTypes = {
    window: PropTypes.func,
};

export default ProfilePage;
