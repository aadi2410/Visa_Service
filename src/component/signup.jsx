import React, { useState } from 'react';
import { TextField, Typography, Grid, Button } from '@mui/material';
import About_img from '../assets/about.png';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const SignUp = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission logic here
  
   localStorage.setItem('userData',JSON.stringify(formData));
   navigate('/login')
  };

  return (
    <>
      <Grid container spacing={5} style={{background: '#1976d220'}}>
        <Link style={{textDecoration: 'none', color: '#000', fontWeight: 600, position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 8}} to='/'>
          <KeyboardBackspaceIcon />
          Back to Home</Link>
        <Grid item xs={12} sm={6}>
        <img src={About_img} className='' alt=""  style={{ minHeight: '100vh', width: '100%', objectFit: 'cover' }}/>
        </Grid>
        <Grid item xs={12} sm={6} style={{alignSelf: 'center'}}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} mb={5}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} style={{maxWidth: 450, margin: 'auto', paddingInline: 12}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required

                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required

                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required

                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button variant='contained' sx={{marginTop:2}} className='login_btn' type="submit">
              Sign Up
            </Button>
            <Typography style={{textAlign: 'center'}} mt={4} mb={3}>OR</Typography>
            <Typography style={{textAlign: 'center', paddingBottom: 50}}>Already have an Account <Link style={{textDecoration: 'none', color: '#1976d2', fontWeight: 600}} to='/login'>Login</Link></Typography>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
