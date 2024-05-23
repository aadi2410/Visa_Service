import * as React from 'react';
import {AppBar,Drawer,List, Box, Toolbar,ListItem,ListItemButton,ListItemIcon,ListItemText, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material';
import Logo from '../assets/logo.png';
import '../component/custom.css';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Footer from './footer';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Home', 'Apply for Visa', 'Blog', 'About Us', 'Contact Us'];
const pageslink = [{name:"Home",path:"/"},{name:"Apply for Visa",path:"/applyvisa"},{name:"Blog",path:"/blog"},{name:"About Us",path:"/about"},{name:"Contact Us",path:"/contact"}];


function HeaderNavbar({children}) {
  const navigate=useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [isLogin,setIsLogin]=React.useState(false)
  React.useEffect(()=>{
   let login= localStorage.getItem('loginData')||null;
  if(login){

    setIsLogin(true);
  }else{
    setIsLogin(false)
  }

  },[])
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {pageslink.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
<>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{position: 'relative', justifyContent: 'space-between'}}>
          <img className='logo_img' src={Logo} alt=""/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
              style={{paddingLeft: 0}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img className='logo_img_mobile' src={Logo} alt=""/>
          <Box sx={{ flexGrow: 1, gap: '15px', display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pageslink.map((page) => (
              <Button
              className='navbar_items'
                key={page}
                onClick={()=>{handleCloseNavMenu();navigate(page.path)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            
            {isLogin?<><Tooltip title="Open settings">
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
            <MenuItem style={{alignItems: 'baseline'}} onClick={handleCloseUserMenu}>
              <Link to='/dashboard' style={{textDecoration: 'none', color: 'black', textAlign: 'left'}}>Dashboard</Link>
            </MenuItem>
            <MenuItem style={{alignItems: 'baseline'}} onClick={()=>
              {
                localStorage.removeItem('loginData');
                navigate('/login')

              }}>
Logout         </MenuItem>
            </Menu></>:<Link to='/signup' className='login-btn'>Login / Sign Up</Link>}
          </Box>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
    {children}
    <Footer/>
    </>
  );
}
export default HeaderNavbar;
