import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip, Grid, styled, Button, TextField, TextareaAutosize, Card, CardMedia, Input } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import { Link } from 'react-router-dom';
import PdfUploadAndViewer from './pdfUpload';

const CustomBox = styled(Box)({
    width: '100%',
    '& .file_name': {
        display: '-webkit-box',
        WebkitLineClamp: 1,
        '-webkit-box-orient': 'vertical',  
        overflow: 'hidden',
        height: '30px'
    }
})
const drawerWidth = 240;

function DocumentPage(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [imageUrl2, setImageUrl2] = React.useState(null);
    const [imageUrl3, setImageUrl3] = React.useState(null);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      setImageUrl(fileUrl);
    };
  
    const handleFileChange2 = (event) => {
      setSelectedFile2(event.target.files[0]);
      const fileUrl2 = URL.createObjectURL(event.target.files[0]);
      setImageUrl2(fileUrl2);
    };
  
    const handleFileChange3 = (event) => {
      setSelectedFile3(event.target.files[0]);
      const fileUrl3 = URL.createObjectURL(event.target.files[0]);
      setImageUrl3(fileUrl3);
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
                    <Link to='/profilepage' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Profile</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/document' className="sidebar_item active">
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
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PdfUploadAndViewer />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CustomBox>
                                <Input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    inputProps={{ accept: 'image/*' }}
                                    id="file-upload"
                                />
                                {selectedFile && <p className='file_name' style={{ paddingBottom: 10 }}>File Name: {selectedFile.name}</p>}
                                {imageUrl && (
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia style={{ height: '150px', objectFit: 'cover', width: '100%' }} component="img" image={imageUrl} />
                                    </Card>
                                )}
                                <label htmlFor="file-upload" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhhar Card Front Side</Typography>
                                    <Button variant="contained" component="span">
                                        Upload File
                                    </Button>
                                </label>
                            </CustomBox>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CustomBox>
                                <Input
                                    type="file"
                                    onChange={handleFileChange2}
                                    style={{ display: 'none' }}
                                    inputProps={{ accept: 'image/*' }}
                                    id="file-upload2"
                                />
                                {selectedFile2 && <p className='file_name' style={{ paddingBottom: 10 }}>File Name: {selectedFile2.name}</p>}
                                {imageUrl2 && (
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia style={{ height: '150px', objectFit: 'cover', width: '100%' }} component="img" image={imageUrl2} />
                                    </Card>
                                )}
                                <label htmlFor="file-upload2" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhhar Card Back Side</Typography>
                                    <Button variant="contained" component="span">
                                        Upload File
                                    </Button>
                                </label>
                            </CustomBox>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CustomBox>
                                <Input
                                    type="file"
                                    onChange={handleFileChange3}
                                    style={{ display: 'none' }}
                                    inputProps={{ accept: 'image/*' }}
                                    id="file-upload3"
                                />
                                {selectedFile3 && <p className='file_name' style={{ paddingBottom: 10 }}>File Name: {selectedFile3.name}</p>}
                                {imageUrl3 && (
                                    <Card sx={{ width: '100%' }}>
                                        <CardMedia style={{ height: '150px', objectFit: 'cover', width: '100%' }} component="img" image={imageUrl3} />
                                    </Card>
                                )}
                                <label htmlFor="file-upload3" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Passport</Typography>
                                    <Button variant="contained" component="span">
                                        Upload File
                                    </Button>
                                </label>
                            </CustomBox>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

DocumentPage.propTypes = {
    window: PropTypes.func,
};

export default DocumentPage;