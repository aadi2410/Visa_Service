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
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function FaqPage(props) {
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
                    <Link to='/profilepage' className="sidebar_item">
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
                    <Link to='/faq' className="sidebar_item active">
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
                        Frequently Asked Questions (FAQ)
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
                <Typography paragraph>

                    <Typography variant='h6' mb={1} style={{ fontWeight: 700 }}>What is a visa?</Typography>

                    A visa is an official document or endorsement affixed within a traveler's passport, granted by a foreign country's government. It serves as permission for the passport holder to enter, leave, or stay in that country for a specified period and for a particular purpose, such as tourism, business, education, or employment. Essentially, a visa acts as a formal authorization for international travel, regulating the movement of individuals across borders in accordance with the immigration laws and policies of the destination country.

                    <Typography variant='h6' mb={1} style={{ fontWeight: 700, marginTop: 30 }}>Do I need a visa to travel?</Typography>


                    Whether you need a visa to travel depends on various factors, including your nationality, the destination country, the purpose of your visit, and the duration of your stay. Here's a breakdown:
                    <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Nationality:</b> Different countries have different visa requirements based on your citizenship or nationality. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Destination Country:</b> Visa policies vary between countries. Some countries have visa-free arrangements with certain nations, allowing travelers to enter without a visa for short stays. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Purpose of Visit:</b> The purpose of your visit also influences visa requirements. For example, tourism, business, study, work, or transit may each have different visa requirements. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Duration of Stay:</b> Some countries allow visa-free entry for short stays (typically tourism or business purposes) within a specified duration, while longer stays or specific activities may require a visa.

                    <Typography variant='h6' mb={1} style={{ fontWeight: 700, marginTop: 30 }}>How do I apply for a visa?</Typography>

                    Here's a step-by-step guide on how to apply for a visa:
                    <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Determine Visa Type:</b> Identify the type of visa you need based on your purpose of travel (tourism, business, study, work, etc.). <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Check Requirements:</b> Visit the official website of the embassy or consulate of the destination country to review the specific requirements for the visa type you're applying for. This typically includes documentation, forms, fees, and any additional requirements. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Complete Application Form:</b> Fill out the visa application form accurately and completely. Provide all required information, such as personal details, passport information, purpose of travel, and intended duration of stay. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Gather Required Documents:</b> Collect all necessary documents as per the visa requirements. Commonly required documents include:
                    <ul style={{marginLeft: 30}}>
                        <li>Valid passport</li>
                        <li>Passport-sized photos</li>
                        <li>Proof of travel arrangements (flight itinerary)</li>
                        <li>Proof of accommodation (hotel reservations)</li>
                        <li>Financial documents (bank statements, sponsorship letters, etc.)</li>
                        <li>Travel insurance</li>
                        <li>Letter of invitation (if applicable)</li>
                        <li>Any other specific documents requested by the embassy or consulate</li>
                    </ul>
                    <b style={{marginTop: 10, display: 'inline-block'}}>Schedule Appointment:</b> Some countries require applicants to schedule an appointment for visa submission at the embassy or consulate. Follow the instructions provided to book an appointment, if necessary. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Submit Application:</b> Attend the visa application appointment (if applicable) or submit your application and supporting documents to the embassy or consulate in person or through a visa application center. Ensure all documents are organized and presented according to the guidelines provided.
                    Pay Visa Fees: Pay the required visa application fees. Fees vary depending on the type of visa, processing time, and embassy or consulate location. Payment methods may include cash, credit/debit card, or bank transfer. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Attend Interview (if required):</b> Some countries may require applicants to attend an interview as part of the visa application process. Prepare for the interview by familiarizing yourself with the visa requirements and being ready to answer questions about your travel plans and personal circumstances. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Wait for Processing:</b> After submitting your visa application, wait for it to be processed. Processing times vary depending on the country and type of visa. You may be able to track the status of your application online or through the embassy or consulate. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Collect Visa:</b> Once your visa application is approved, collect your passport with the visa affixed to it from the embassy, consulate, or visa application center. Check the visa details for accuracy before traveling.

                    <Typography variant='h6' mb={1} style={{ fontWeight: 700, marginTop: 30 }}>How long does it take to process a visa?</Typography>


                    Visa processing times can vary significantly depending on several factors, including the type of visa, the country you're applying to, the volume of applications being processed, and the time of year. Here's some general information:
                    <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Standard Processing Time:</b> Standard processing times typically range from a few days to several weeks. For some countries, it may take longer during peak travel seasons or if additional processing is required, such as background checks or verification of documents. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Expedited Processing Options:</b> Some countries offer expedited or priority processing options for an additional fee. This can significantly reduce the processing time, often to just a few days or even the same day in some cases. However, expedited processing may not be available for all visa types or in all locations, so it's essential to check with the embassy or consulate for specific details. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Factors Affecting Processing Time:</b> Several factors can influence the processing time of a visa application, including the completeness and accuracy of the application, any additional processing required, the workload of the embassy or consulate, and external factors such as holidays or unforeseen circumstances. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Communication Channels:</b> Embassies or consulates often provide information about visa processing times on their websites or through customer service channels. It's advisable to check the official website or contact the embassy or consulate directly for the most up-to-date information regarding processing times for your specific visa application. <br />
                    <b style={{marginTop: 10, display: 'inline-block'}}>Plan Ahead:</b> To avoid any last-minute complications, it's advisable to start the visa application process well in advance of your intended travel dates. Consider factors such as processing times, potential delays, and any additional requirements, and plan accordingly to ensure you receive your visa in time for your trip.

                </Typography>
            </Box>
        </Box>
    );
}

FaqPage.propTypes = {
    window: PropTypes.func,
};

export default FaqPage;
