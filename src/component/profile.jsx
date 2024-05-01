import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip, Grid, styled, Button, TextField, TextareaAutosize } from '@mui/material';
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

const drawerWidth = 240;

function ProfilePage(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
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
                    <Link to='/document' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Documents</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link target="_blank" to='/' className="sidebar_item" >
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
                         <form style={{display: 'flex', gap: 20, flexWrap: 'wrap'}}>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>First Name</label>
                            <TextField placeholder='Enter your name' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Last Name</label>
                            <TextField placeholder='Enter your name' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Email Address</label>
                            <TextField placeholder='Enter your email' type="email" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Phone Number</label>
                            <TextField placeholder='Enter your number' type="number" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Pan Number</label>
                            <TextField placeholder='Enter your PAN' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Passport</label>
                            <TextField placeholder='Enter your passport no' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Aadhar Number</label>
                            <TextField placeholder='Enter your name' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Country</label>
                            <TextField placeholder='Enter your Aadhar' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Pin Code</label>
                            <TextField placeholder='Enter your pincode' type="number" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Address Line 1</label>
                            <TextField placeholder='Enter your address' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Address Line 2</label>
                            <TextField placeholder='Enter your address' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Address Line 3</label>
                            <TextField placeholder='Enter your address' type="text" variant='outlined' />
                         </Box>
                         <Box style={{flex: 1, minWidth: '45%', display: 'flex', flexDirection: 'column', gap: 5}}>
                            <label>Present Address</label>
                            <TextareaAutosize minRows={4} type="text" variant='outlined' />
                         </Box>
                         </form>
                         <Box style={{textAlign: 'center', marginTop: 20}}>
                         <Button variant='contained' style={{minWidth: 200, minHeight: 48}}>Submit</Button>
                         </Box>
                    </Grid>
                    <Grid item xs={12} md={5} lg={3}>
                        <Box style={{ textAlign: 'left', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', width: '100%', borderRadius: 12, display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign:  'center' }}>
                            <Box style={{ position: 'relative' }}>
                                <img src={ProfileImage} alt="" style={{ maxWidth: 250, width: '100%', borderRadius: '50%', objectFit: 'cover', background: 'lightgray' }} />
                                <EditIcon style={{ cursor: 'pointer', position: 'absolute', right: 20, bottom: 20, boxShadow: '0px 0px 10px #dcdcdc', color: '#1976d2', background: 'white', padding: 8, borderRadius: '50%', fontSize: 40 }} />
                            </Box>
                            <Box style={{textAlign: 'center', marginTop: 20}}>
                            <Typography style={{textAlign: 'center', marginTop: 5}}><b>Name:</b> Jash Jeff</Typography> 
                            <Typography style={{textAlign: 'center', marginTop: 5}}><b>Email:</b> asdfg@gmail.com </Typography>
                            <Typography style={{textAlign: 'center', marginTop: 5}}><b>Number:</b> 9876543210</Typography>
                            <Typography style={{textAlign: 'center', marginTop: 5}}><b>Address:</b> asdefrgtyh, zsws, India (123456)</Typography>
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
