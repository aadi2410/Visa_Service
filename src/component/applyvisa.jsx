import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, MenuItem, Menu, Avatar, Tooltip, Grid, styled, Button, Card, CardMedia, Input, Tab, Tabs, FormControl, InputLabel, Select, Modal } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.png';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import { Link } from 'react-router-dom';
import SuccessIcon from '../assets/success.png';
import PdfUploadAndViewer from './pdfUpload';
import CustomizedSteppers from './stepper';
import { axiosAuthorized } from '../api/apiconfig';

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

function ApplyVisa(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [imageUrl2, setImageUrl2] = React.useState(null);
    const [value, setValue] = React.useState(0);
    const [personCount, setPersonCount] = React.useState(1);
    const [modalopen, setModalOpen] = React.useState(false);
    const [images, setImages] = useState([])
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [msg, setMsg] = useState({ title: "", subtile: "" })
    const [activeStep, setActiveStep] = useState(0);
    const [isUpload, setIsUpload] = useState(false);
    const [lastStep, setLastStep] = useState(null);
    const [groupImageUrl, setGroupImageUrl] = useState([]);
    const [groupActiveStep, setGroupActiveStep] = useState(0);
    const handlePersonCountChange = (event) => {
        setPersonCount(event.target.value);
        let arr = []
        Array.from({ length: event.target.value }).map((i, idx) => {
            let item = {};
            item.id = idx + 1;
            item.groupVisaApplyAdharFront = "";
            item.groupVisaApplyAdharBack = "";
            item.groupVisaApplyDocument = "";
            arr.push(item)

        });
        setGroupImageUrl(arr)
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        setSelectedFile(event.target.files[0]);
        const fileUrl = URL.createObjectURL(event.target.files[0]);

        setImageUrl(fileUrl);
        setImages({ ...images, singleVisaApplyAdharFront: file })

    };
    const handleGroupFileChange = (event, img, type) => {
        console.log(img)
        let cpy = [...groupImageUrl];
        if (event === 'cancel') {
            cpy.map((i) => {
                if (i?.id === img?.id) {
                    i[type] = "";
                    i.fileName = ""
                }
            })
        } else {

            const file = event.target.files[0];
            // const fileUrl = URL.createObjectURL(event.target.files[0]);
            console.log(cpy)
            cpy.map((i) => {
                if (i?.id === img?.id) {

                    i[type] = file;
                    i.fileName = file
                }
            })
        }
        setGroupImageUrl(cpy);
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];

        setSelectedFile2(event.target.files[0]);
        const fileUrl2 = URL.createObjectURL(event.target.files[0]);

        setImageUrl2(fileUrl2);
        setImages({ ...images, singleVisaApplyAdharBack: file })

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
                    <Link to='/applyvisa' className="sidebar_item active">
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
                    <Link to='/login' className="sidebar_item" onClick={() => { localStorage.clear() }}>
                        <SwipeRightAltIcon />
                        <Typography>Logout</Typography>
                    </Link>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const getDocumentData = async () => {
        try {
            let userId = localStorage.getItem('user_id') || null;
            if (userId) {

                const response = await axiosAuthorized.get(`singleVisaUploadUser/${JSON.parse(localStorage.getItem('user_id'))}`);
                if (response.status === 200 ) {
                    if (response.data.document.isVerified) {

                        setActiveStep(3);
                        setLastStep(response.data.document.reason);
                    } else {
                        if(!response.data.document.singleVisaApplyAdharBack){
                            setIsUpload(false);
                            setActiveStep(0);
                        }else{
                            setIsUpload(true);
                            setActiveStep(2);
                        }
                      
                    }
                    setImages({ singleVisaApplyAdharBack: response.data.document.singleVisaApplyAdharBack, singleVisaApplyAdharFront: response.data.document.singleVisaApplyAdharFront, singleVisaApplyDocument: response.data.document.singleVisaApplyDocument })

                } else {
                    setActiveStep(1);

                    setIsUpload(false);
                }
            }

        } catch (error) {
            console.log(error)
        }
    };
    console.log({images})
    const getGroupDocumentData = async () => {
        try {
            let userId = localStorage.getItem('user_id') || null;
            if (userId) {
                const response = await axiosAuthorized.get(`groupVisaUpload/${JSON.parse(localStorage.getItem('user_id'))}`);

                if (response.status == 200) {
                    if (response.data.document) {
                        let arr = []
                        response.data.document.arrayData.map((i, idx) => {
                            let item = {};
                            i.items.map((itm) => {
                                item.id = idx + 1;
                                item[itm.key.split('[')[0]] = itm.value

                            });
                            arr.push(item);
                            setPersonCount(arr.length)
                            setGroupImageUrl(arr);
                            setGroupActiveStep(2)

                        });

                    } else {
                        setIsUpload(false);

                    }
                } else {
                    setGroupActiveStep(0);
                }

            }

        } catch (error) {
            console.log(error)
        }
    };
    React.useEffect(() => {
        getDocumentData();
        getGroupDocumentData();
    }, []);
    const handleSubmit = async () => {
        try {
            if (Object.values(images).length === 3) {
                let userId = localStorage.getItem('user_id') || null;
                if (userId) {
                    const formDataToSend = new FormData();

                    formDataToSend.append('singleVisaApplyAdharFront', images.singleVisaApplyAdharFront);
                    formDataToSend.append('singleVisaApplyAdharBack', images.singleVisaApplyAdharBack);
                    formDataToSend.append('singleVisaApplyDocument', images.singleVisaApplyDocument);

                    const response = await axiosAuthorized.post(`/singleVisaUpload/${JSON.parse(localStorage.getItem('user_id'))}`, formDataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }

                    });
                    console.log({response})
                    if (response.data.message) {
                        setMsg({ title: response.data.message, subtile: "Thank you for completing your document information. Your details have been successfully saved." })
                    }
                    setActiveStep(1)
                    handleModalOpen();
                }
            }

        } catch (error) {
            console.log({ error })
            // toast.error("Something went wrong");
        }
    };
    const handleGroupSubmit = async () => {
        try {

            let userId = localStorage.getItem('user_id') || null;
            if (userId) {
                const formData = new FormData();

                groupImageUrl.forEach((item, index) => {
                    formData.append(`groupVisaApplyAdharFront[${index}]`, item.groupVisaApplyAdharFront);
                    formData.append(`groupVisaApplyAdharBack[${index}]`, item.groupVisaApplyAdharBack);
                    formData.append(`groupVisaApplyDocument[${index}]`, item.groupVisaApplyDocument);
                });

                const response = await axiosAuthorized.post(`/groupVisaUpload/${JSON.parse(localStorage.getItem('user_id'))}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }

                });
                if(response.status==201){
                    handleModalOpen();
                    let arr = [];
                    response.data.document.arrayData.map((i, idx) => {
                        let item = {};
                        i.items.map((itm) => {
                            item.id = idx + 1;
                            item[itm.key.split('[')[0]] = itm.value

                        });
                        arr.push(item);
                        setPersonCount(arr.length)
                        setGroupImageUrl(arr);
                        setGroupActiveStep(2)

                    });
                    if (response.data.message) {
                        setMsg({ title: response.data.message, subtile: "Thank you for completing your document information. Your details have been successfully saved." })
                    }
                }
               
            }

        } catch (error) {
            console.log({ error })
            // toast.error("Something went wrong");
        }
    };
    const handleCancel = (type) => {
        const { [type]: _, ...rest } = images;
        setImages(rest); setSelectedFile(null)
    };
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
                                    <Link style={{ textDecoration: 'none', color: 'black', textAlign: 'left' }} to='/login'>Logout</Link>
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
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Single Visa Apply" {...a11yProps(0)} />
                            <Tab label="Group Visa Apply" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box style={{ paddingTop: 20, paddingBottom: 40 }}>
                            <Typography style={{ marginBottom: 12 }}>Single Visa Application Progress</Typography>
                            <CustomizedSteppers activeStep={activeStep} setActiveStep={setActiveStep} images={images} />
                        </Box>

                        {lastStep ? <Box textAlign={'center'} display={'flex'} alignItems={"center"} flexDirection={"column"}><img src={SuccessIcon} width={120} /> <Typography variant='body' textAlign={'center'}>{lastStep}</Typography> </Box> :

                            <>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <PdfUploadAndViewer images={images} setImages={setImages} isUpload={isUpload} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>

                                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CustomBox>
                                                <Input
                                                    type="file"
                                                    onChange={(event) => { handleFileChange(event) }}
                                                    style={{ display: 'none' }}
                                                    inputProps={{ accept: 'image/*' }}
                                                    id="file-upload"
                                                />
                                                {selectedFile && !isUpload && <p className='file_name' style={{ paddingBottom: 10 }}>File Name: {selectedFile.name}</p>}
                                                {images.singleVisaApplyAdharFront && (
                                                    <Card sx={{ width: '100%' }}>
                                                        <CardMedia style={{ height: '250px', objectFit: 'cover', width: '100%' }} component="img" image={images.singleVisaApplyAdharFront instanceof File ? URL.createObjectURL(images.singleVisaApplyAdharFront) : images.singleVisaApplyAdharFront} />
                                                    </Card>
                                                )}
                                                {!isUpload && <>
                                                    <label htmlFor="file-upload" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                                        <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhar Card Front Side</Typography>
                                                        <Box style={{justifyContent: 'center', display: 'flex'}}>
                                                            <Button variant="contained" component="span">
                                                                Upload Image
                                                            </Button>
                                                        </Box>

                                                    </label>
                                                    {/* <Button variant="contained" component="span" onClick={() => handleCancel("singleVisaApplyAdharFront")}>
                                                        Cancel Image
                                                    </Button> */}
                                                </>}
                                            </CustomBox>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Box style={{ width: '100%', borderRadius: 12, minHeight: '315px', padding: 20, boxShadow: '0px 0px 10px #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CustomBox>
                                                <Input
                                                    type="file"
                                                    onChange={(event) => { handleFileChange2(event) }}
                                                    style={{ display: 'none' }}
                                                    inputProps={{ accept: 'image/*' }}
                                                    id="file-upload2"
                                                />
                                                {selectedFile2 && !isUpload && <p className='file_name' style={{ paddingBottom: 10 }}>File Name: {selectedFile2.name}</p>}

                                                {images.singleVisaApplyAdharBack && (
                                                    <Card sx={{ width: '100%' }}>
                                                        <CardMedia style={{ height: '250px', objectFit: 'cover', width: '100%' }} component="img" image={images.singleVisaApplyAdharBack instanceof File ? URL.createObjectURL(images.singleVisaApplyAdharBack) : images.singleVisaApplyAdharBack} />
                                                    </Card>
                                                )}
                                                {!isUpload && <>
                                                    <label htmlFor="file-upload2" style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                                        <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhhar Card Back Side</Typography>
                                                        <Box style={{justifyContent: 'center', display: 'flex'}}>
                                                        <Button variant="contained" component="span">
                                                            Upload File
                                                        </Button>

                                                        </Box>

                                                    </label>
                                                    {/* <Button variant="contained" component="span" onClick={() => handleCancel("singleVisaApplyAdharBack")}>
                                                        Cancel File
                                                    </Button> */}
                                                </>}
                                            </CustomBox>
                                        </Box>
                                    </Grid>
                                </Grid>
                                {/* {!imageUrl2 && !imageUrl && !selectedFile && <Box style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
                            <Button variant='contained' style={{ minWidth: 200, paddingBlock: 10 }} onClick={handleSubmit}>Submit</Button>
                        </Box>} */}
                                {!isUpload && <Button variant='contained' style={{ minWidth: 200, paddingBlock: 10 }} onClick={handleSubmit}>Submit</Button>
                                }
                            </>}
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
                                    Documents Successfully Uploaded
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                                    Thank you for uploading your documents. Please wait for the verification.
                                </Typography>
                                <Box style={{ textAlign: 'center', marginTop: 10 }}>
                                    <Button onClick={() => {
                                        handleModalClose();
                                        getDocumentData()
                                    }} variant="contained" color="primary">Ok</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box style={{ paddingTop: 20, paddingBottom: 40 }}>
                            <Typography style={{ marginBottom: 12 }}>Group Visa Application Progress</Typography>
                            <CustomizedSteppers
                                activeStep={groupActiveStep}
                            />
                        </Box>
                        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 50 }}>
                            <label>Number of Person</label>
                            <Select
                                style={{ maxWidth: 150 }}
                                value={personCount}
                                onChange={handlePersonCountChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={4}>Four</MenuItem>
                                <MenuItem value={5}>Five</MenuItem>
                                <MenuItem value={6}>Six</MenuItem>
                                <MenuItem value={7}>Seven</MenuItem>
                                <MenuItem value={8}>Eight</MenuItem>
                                <MenuItem value={9}>Nine</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                            </Select>
                        </Box>
                        {groupImageUrl.map((img, index) => (
                            <Grid container spacing={3} key={img.id}>
                                {img.id}
                                <Grid item xs={12} sm={6} md={4} lg={3} key={`uploadViewer-${index}`}>
                                    <Box
                                        style={{
                                            width: '100%',
                                            borderRadius: 12,
                                            minHeight: '315px',
                                            padding: 20,
                                            boxShadow: '0px 0px 10px #dcdcdc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <PdfUploadAndViewer
                                            value={value}
                                            images={img}
                                            setImages={setImages}
                                            isUpload={   (groupActiveStep==2||groupActiveStep==3)??isUpload}
                                            key={img.id}
                                            handleGroupFileChange={handleGroupFileChange}
                                         
                                            groupActiveStep={groupActiveStep}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3} key={`adharFront-${index}`}>
                                    <Box
                                        style={{
                                            width: '100%',
                                            borderRadius: 12,
                                            minHeight: '315px',
                                            padding: 20,
                                            boxShadow: '0px 0px 10px #dcdcdc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CustomBox>
                                            <Input
                                                type="file"
                                                name={img.id}
                                                onChange={(event) => {
                                                    handleGroupFileChange(event, img, "groupVisaApplyAdharFront");
                                                }}
                                                style={{ display: 'none' }}
                                                inputProps={{ accept: 'image/*' }}
                                                id={`file-upload-${img.id}`}
                                            />
                                            {(img.groupVisaApplyAdharFront && (groupActiveStep != 2 && groupActiveStep != 3)) && (
                                                <p className="file_name" style={{ paddingBottom: 10 }}>
                                                    File Name: {img.groupVisaApplyAdharFront.name}
                                                </p>
                                            )}
                                            {img.groupVisaApplyAdharFront && (
                                                <Card sx={{ width: '100%' }}>
                                                    <CardMedia
                                                        style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                                        component="img"
                                                        image={
                                                            img.groupVisaApplyAdharFront instanceof File
                                                                ? URL.createObjectURL(img.groupVisaApplyAdharFront)
                                                                : img.groupVisaApplyAdharFront
                                                        }
                                                    />
                                                </Card>
                                            )}

                                            {(groupActiveStep != 2 && groupActiveStep != 3) && <>
                                                <label htmlFor={`file-upload-${img.id}`} style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhar Card Front Side</Typography>
                                                    <Box>
                                                        <Button variant="contained" component="span">
                                                            Upload Image
                                                        </Button>
                                                    </Box>
                                                </label>
                                               {img.groupVisaApplyAdharFront&& <Button
                                                    variant="contained"
                                                    component="span"
                                                    onClick={() => handleGroupFileChange("cancel", img, "groupVisaApplyAdharFront")}
                                                >
                                                    Cancel Image
                                                </Button>}
                                            </>}

                                        </CustomBox>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3} key={`adharBack-${index}`}>
                                    <Box
                                        style={{
                                            width: '100%',
                                            borderRadius: 12,
                                            minHeight: '315px',
                                            padding: 20,
                                            boxShadow: '0px 0px 10px #dcdcdc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CustomBox>
                                            <Input
                                                type="file"
                                                onChange={(event) => handleGroupFileChange(event, img, "groupVisaApplyAdharBack")
                                                }

                                                style={{ display: 'none' }}
                                                inputProps={{ accept: 'image/*' }}
                                                id={`file-upload2-${img.id}`}
                                            />
                                            {img.groupVisaApplyAdharBack &&(groupActiveStep!=2&&groupActiveStep!=3)&& (
                                                <p className="file_name" style={{ paddingBottom: 10 }}>
                                                    File Name: {img.groupVisaApplyAdharBack.name}
                                                </p>
                                            )}
                                            {img.groupVisaApplyAdharBack && (
                                                <Card sx={{ width: '100%' }}>
                                                    <CardMedia
                                                        style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                                        component="img"
                                                        image={
                                                            img.groupVisaApplyAdharBack instanceof File
                                                                ? URL.createObjectURL(img.groupVisaApplyAdharBack)
                                                                : img.groupVisaApplyAdharBack
                                                        }
                                                    />
                                                </Card>
                                            )}
                                          {(groupActiveStep!=2&&groupActiveStep!=3)&&
                                            <>
                                                <label htmlFor={`file-upload2-${img.id}`} style={{ textAlign: 'center', display: 'block', marginTop: 15 }}>
                                                    <Typography style={{ textAlign: 'center', marginBottom: 10 }}>Aadhar Card Back Side</Typography>
                                                    <Button variant="contained" component="span">
                                                        Upload File
                                                    </Button>
                                                </label>
                                            </>}
                                            {!img.groupVisaApplyAdharBack&& <Button
                                                    variant="contained"
                                                    component="span"
                                                    onClick={() => handleGroupFileChange("cancel", img, "groupVisaApplyAdharBack")}
                                                >
                                                    Cancel Image
                                                </Button>}
                                          
                                        </CustomBox>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))}
                       
                       {(groupActiveStep!=2&&groupActiveStep!=3)&& <Button variant='contained' onClick={handleGroupSubmit}>Submit</Button>}
                       
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
                    </CustomTabPanel>
                </Box>
            </Box>
        </Box>
    );
}

ApplyVisa.propTypes = {
    window: PropTypes.func,
};

export default ApplyVisa;