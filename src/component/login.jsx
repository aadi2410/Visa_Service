import React, { useState } from 'react';
import { TextField, Typography, Grid, Button, Box, styled } from '@mui/material';
import About_img from '../assets/about.png';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {  toast } from 'react-toastify';
import {axiosInstance} from '../api/apiconfig';

const CustomTabBox = styled(Box)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center'
  }
})

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
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   
    try {
      const response = await axiosInstance.post('login', formData);
      console.log(response,"testping10@gmail.comtestping10@gmail.com")
      localStorage.setItem('loginData',JSON.stringify(response));
      localStorage.setItem('user_id',JSON.stringify(response.userId));
      localStorage.setItem('token',JSON.stringify(response.token));

      toast.success("Successfull login");
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <Grid container spacing={5} style={{ background: '#1976d220' }}>
        <Link style={{ textDecoration: 'none', color: '#000', fontWeight: 600, position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 8 }} to='/'>
          <KeyboardBackspaceIcon />
          Back to Home</Link>
        <Grid item xs={12} sm={6}>
          <img src={About_img} className='' alt="" style={{ minHeight: '100vh', width: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={12} sm={6} style={{ alignSelf: 'center' }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} mb={5}>
            Login
          </Typography>
          <Box sx={{ width: '100%' }}>
            <CustomTabBox>
              <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Customer Login" {...a11yProps(0)} />
                <Tab label="Admin Login" {...a11yProps(1)} />
              </Tabs>
            </CustomTabBox>
            <CustomTabPanel value={value} index={0}>
              <form onSubmit={handleSubmit} style={{ maxWidth: 450, margin: 'auto', paddingInline: 12 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required

                    />
                  </Grid>
                </Grid>
                <Button variant='contained' sx={{ marginTop: 2 }} className='login_btn' type="submit">
                  Login
                </Button>
                <Typography style={{ textAlign: 'center' }} mt={4} mb={3}>OR</Typography>
                <Typography style={{ textAlign: 'center', paddingBottom: 50 }}>Don't have an Account <Link style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }} to='/signup'>Sign Up</Link></Typography>
              </form>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <form onSubmit={handleSubmit} style={{ maxWidth: 450, margin: 'auto', paddingInline: 12 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required

                    />
                  </Grid>
                </Grid>
                <Button variant='contained' sx={{ marginTop: 2 }} className='login_btn' type="submit">
                  Login
                </Button>
                <Typography style={{ textAlign: 'center' }} mt={4} mb={3}>OR</Typography>
                <Typography style={{ textAlign: 'center', paddingBottom: 50 }}>Don't have an Account <Link style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }} to='/signup'>Sign Up</Link></Typography>
              </form>
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
