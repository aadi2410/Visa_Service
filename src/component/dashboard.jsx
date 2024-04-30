import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip } from '@mui/material';
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
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
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
                        <Link to='/dashboard' className="sidebar_item active" >
                            <SwipeRightAltIcon />
                            <Typography>Dashboard</Typography>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/profilepage' className="sidebar_item" >
                            <SwipeRightAltIcon />
                            <Typography>Profile</Typography>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/dashboard' className="sidebar_item" >
                            <SwipeRightAltIcon />
                            <Typography>Documents</Typography>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/privacypolicy' className="sidebar_item" >
                            <SwipeRightAltIcon />
                            <Typography>Privacy Policy</Typography>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/dashboard' className="sidebar_item" >
                            <SwipeRightAltIcon />
                            <Typography>FAQ</Typography>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/dashboard' className="sidebar_item" >
                            <SwipeRightAltIcon />
                            <Typography>Logout</Typography>
                        </Link>
                    </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;
const navigate=useNavigate()
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
                            Dashboard
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open profile">
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
                                <MenuItem style={{ alignItems: 'baseline' }} onClick={()=>{localStorage.removeItem('loginData');
                navigate('/login')}}>
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
                <Box style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 30, marginTop: 10}}>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6'>Total Documents Need</Typography>
                        <Typography variant='h4' mt={3} style={{fontWeight: 900}}>10</Typography>
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6'>Total Documents Uploaded</Typography>
                        <Typography variant='h4' mt={3} style={{fontWeight: 900}}>8</Typography>
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6'>Varification </Typography>
                        <Typography variant='h4' mt={3} style={{fontWeight: 900, color: 'yellow'}}>Pending</Typography>
                    </Box>
                    <Box style={{padding: '10px 20px', minWidth: 290, border: '1px solid #dcdcdc', borderRadius: '8px', flex: 1}}>
                        <Typography variant='h6'>Visa Application</Typography>
                        <Typography variant='h4' mt={3} style={{fontWeight: 900, color: 'green'}}>Success</Typography>
                    </Box>
                </Box>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
