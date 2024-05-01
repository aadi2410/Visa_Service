import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; import './App.css';
import LandingPage from './component/landing-page';
import SignUp from './component/signup';
import Login from './component/login';
import Dashboard from './component/dashboard';
import Privacypolicy from './component/privacypolicy';
import ProfilePage from './component/profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/privateRoute';
import { useEffect } from 'react';
import DocumentPage from './component/document';

function App() {
  const isAuthenticated = localStorage.getItem('loginData')||null;



  return (
    <>
            <ToastContainer />
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />

        <Route exact path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route  path='dashboard' element={<Dashboard/>}/>
            <Route exact path='/profilepage' element={<ProfilePage/>}/>
            <Route exact path='/privacypolicy' element={<Privacypolicy/>}/>
            <Route exact path='/document' element={<DocumentPage/>}/>

          </Route>
      
      </Routes>

      </Router>

    </>
     
  );
}

export default App;
