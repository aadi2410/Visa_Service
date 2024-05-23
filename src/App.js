import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; import './App.css';
import LandingPage from './component/landing-page';
import SignUp from './component/signup';
import Login from './component/login';
import Dashboard from './component/dashboard';
import AdminDashboard from './component/dashboard-admin';
import Privacypolicy from './component/privacypolicy';
import ProfilePage from './component/profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/privateRoute';
import ApplyVisa from './component/applyvisa';
import AppliedVisa from './component/applied-visa';
import DocumentUploaded from './component/document-uploaded';
import FaqPage from './component/faq';
import BlogPage from './component/blog';
import AboutPage from './component/about';
import ContactPage from './component/contact';

function App() {
  const isAuthenticated = localStorage.getItem('loginData') || null;



  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='admindashboard' element={<AdminDashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route exact path='/profilepage' element={<ProfilePage />} />
            <Route exact path='/privacypolicy' element={<Privacypolicy />} />
            <Route exact path='/faq' element={<FaqPage />} />
            <Route exact path='/applyvisa' element={<ApplyVisa />} />
            <Route exact path='/appliedvisa' element={<AppliedVisa />} />
            <Route exact path='/documentuploaded' element={<DocumentUploaded />} />
          </Route>
        </Routes>
      </Router>

    </>

  );
}

export default App;
