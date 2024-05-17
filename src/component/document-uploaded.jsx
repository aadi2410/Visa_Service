import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip, Grid, styled, Button, Card, CardMedia, Input, Tab, Tabs, FormControl, InputLabel, Select } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileImage from '../assets/profile.png';
import Logo from '../assets/logo.png';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import { Link } from 'react-router-dom';
import PdfUploadAndViewer from './pdfUpload';
import CustomizedSteppers from './stepper';
import EnhancedTable from './applied-data-table';

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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function DocumentUploaded(props) {
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
    const [value, setValue] = React.useState(0);
    const [age, setAge] = React.useState('');
    const [isClick, setIsClick] = useState(false);

    const handlePersonCountChange = (event) => {
      setAge(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem('profileData')) || null)
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('profileData')) || {
        profilePicture: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        passport: '',
        country: '',
        pinCode: '',
        temporaryAddress: '',
        presentAddress: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const {
            profilePicture = '',
            firstName = '',
            lastName = '',
            email = '',
            phoneNumber = '',
            passport = '',
            country = '',
            pinCode = '',
            temporaryAddress = '',
            presentAddress = ''
        } = formData || {};

        localStorage.setItem('profileData', JSON.stringify(formData));
        setFormData({
            profilePicture: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            passport: '',
            country: '',
            pinCode: '',
            temporaryAddress: '',
            presentAddress: ''
        });
        setIsClick(!isClick)
    };

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem('profileData')) || null;
        setProfileData(data);
    }, [formData]);
    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem('profileData')) || null;
        setFormData(data)
    }, [isClick]);
    const {
        profilePicture = '',
        firstName = '',
        lastName = '',
        email = '',
        phoneNumber = '',
        passport = '',
        country = '',
        pinCode = '',
        temporaryAddress = '',
        presentAddress = ''
    } = profileData || {};

    React.useEffect(() => {
        const adharimage1 = localStorage.getItem('adharimage1');
        const adharimage2 = localStorage.getItem('adharimage2');
        const adharimagename1 = localStorage.getItem('adharimage1_name');

        const adharimagename2 = localStorage.getItem('adharimage2_name');

        if (adharimage1) {
            setSelectedFile({name:adharimagename1});
            setImageUrl(adharimage1);
        }
        if (adharimage2) {
            setSelectedFile2({name:adharimagename2});

            setImageUrl2(adharimage2);
        }
        
      }, []);
      console.log(selectedFile)
    const handleFileChange = (event) => {
    const file = event.target.files[0];

        setSelectedFile(event.target.files[0]);
        const fileUrl = URL.createObjectURL(event.target.files[0]);
        const reader = new FileReader();
        localStorage.setItem('adharimage1_name',file.name);

        reader.addEventListener('load', ()=>{
            localStorage.setItem('adharimage1',reader.result);

        })
        reader.readAsDataURL(file);

        setImageUrl(fileUrl);
    };

    const handleFileChange2 = (event) => {
        const file = event.target.files[0];

        setSelectedFile2(event.target.files[0]);
        const fileUrl2 = URL.createObjectURL(event.target.files[0]);
        const reader = new FileReader();
        localStorage.setItem('adharimage2_name',file.name);

        reader.addEventListener('load', ()=>{
            localStorage.setItem('adharimage2',reader.result);

        })
        reader.readAsDataURL(file);
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
                    <Link to='/admindashboard' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Admin Dashboard</Typography>
                    </Link>
                </ListItem>
                {/* <ListItem disablePadding>
                    <Link to='/profilepage' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Profile</Typography>
                    </Link>
                </ListItem> */}
                <ListItem disablePadding>
                    <Link to='/appliedvisa' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Applied Visa</Typography>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to='/documentuploaded' className="sidebar_item active">
                        <SwipeRightAltIcon />
                        <Typography>Documents</Typography>
                    </Link>
                </ListItem>
                {/* <ListItem disablePadding>
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
                </ListItem> */}
                <ListItem disablePadding>
                    <Link to='/login' className="sidebar_item">
                        <SwipeRightAltIcon />
                        <Typography>Logout</Typography>
                    </Link>
                </ListItem>
            </List>
        </div>
    );

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
                    <Grid item xs={12} md={6}>
                    <Box style={{ padding: 20, boxShadow: '0px 0px 10px #dcdcdc', width: '100%', borderRadius: 12, display: 'flex', gap: 20, alignItems: 'center' }}>
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
                                            aspectRatio: 1/1,
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
                                            aspectRatio: 1/1,
                                        }}
                                    />
                                )}
                            </Box>
                            <Box style={{marginTop: 20 }}>
                                <Typography style={{marginTop: 5 }}><b>Name:</b> {firstName}</Typography>
                                <Typography style={{marginTop: 5 }}><b>Email:</b> {email} </Typography>
                                <Typography style={{marginTop: 5 }}><b>Number:</b> {phoneNumber}</Typography>
                                <Typography style={{marginTop: 5 }}><b>Address:</b> {presentAddress}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Box style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 30}}>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6' style={{textAlign: 'center', marginBottom: 10}}>Profile </Typography>
                        <img src="" style={{minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', minHeight: 200}} alt="" />
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6' style={{textAlign: 'center', marginBottom: 10}}>Passport </Typography>
                        <img src="" style={{minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', minHeight: 200}} alt="" />
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6' style={{textAlign: 'center', marginBottom: 10}}>Address Proof </Typography>
                        <img src="" style={{minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', minHeight: 200}} alt="" />
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6' style={{textAlign: 'center', marginBottom: 10}}>Passport </Typography>
                        <img src="" style={{minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', minHeight: 200}} alt="" />
                    </Box>
                </Box>
                    </Grid>
                </Grid>
                <Box style={{display: 'flex', gap: 20, justifyContent: 'end'}}>
                    <Button variant='contained' color='error'>Reject</Button>
                    <Button variant='contained' color='primary'>Varified</Button>
                </Box>
            </Box>
        </Box>
    );
}

DocumentUploaded.propTypes = {
    window: PropTypes.func,
};

export default DocumentUploaded;