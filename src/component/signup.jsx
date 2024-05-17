import React, { useState } from 'react';
import { TextField, Typography, Grid, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Modal, Box } from '@mui/material';
import About_img from '../assets/about.png';
import SuccessIcon from '../assets/success.png';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { axiosInstance } from '../api/apiconfig';
import { toast } from 'react-toastify';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  py: 2,
  px: 4,
};
const SignUp = () => {
  const navigate = useNavigate();

  const [modalopen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_no: '',
    email: '',
    password: '',
    type: ""
  });
  const [msg,setMsg]=useState({title:"",subtile:""})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, mobile_no, email, password, type } = formData;
    if(!full_name || !mobile_no || !email || !password || !type){
      handleModalOpen();
      setMsg({title:"All fields are mandatory",subtile:"Please select user type"})
      return;
    }
    try {
      
      const response = await axiosInstance.post('register', formData);
      localStorage.setItem('userData', JSON.stringify(response));
      setMsg({title:"Successfully Registered",subtile:"Please login for further process."})

      handleModalOpen()
      navigate('/login');
    } catch (error) {
      toast.error("Something went wrong");
    }

  };

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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} style={{ maxWidth: 450, margin: 'auto', paddingInline: 12 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  name="full_name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required

                  fullWidth
                  label="Mobile No."
                  name="mobile_no"
                  value={formData.mobile_no}
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
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Are you want to signup as a:</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    
                    name="radio-buttons-group"
                    style={{ display: 'flex', gap: 20, flexDirection: 'row' }}
                    onClick={(e) => { setFormData({ ...formData, type: e.target.value }) }}
                  >
                    <FormControlLabel value="user" control={<Radio />} label="User" />
                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button variant='contained' sx={{ marginTop: 2 }} className='login_btn' type="submit">
              Sign Up
            </Button>
            <Modal
              open={modalopen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
                  <img src={SuccessIcon} width={120} />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, fontWeight: 900, textAlign: 'center' }}>
                  {msg.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  {msg.subtile}
                </Typography>
                <Box style={{ textAlign: 'center', marginTop: 10 }}>
                  <Button onClick={handleModalClose} variant="contained" color="primary">Ok</Button>
                </Box>
              </Box>
            </Modal>
            <Typography style={{ textAlign: 'center' }} mt={4} mb={3}>OR</Typography>
            <Typography style={{ textAlign: 'center', paddingBottom: 50 }}>Already have an Account <Link style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 600 }} to='/login'>Login</Link></Typography>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
