import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; import './App.css';
import LandingPage from './component/landing-page';
import SignUp from './component/signup';
import Login from './component/login';
import Dashboard from './component/dashboard';
import LoginLandingPage from './component/afterloginlanding';
import Privacypolicy from './component/privacypolicy.';
import ProfilePage from './component/profile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/homeloginpage" element={<LoginLandingPage/>} />
          <Route path="/privacypolicy" element={<Privacypolicy/>} />
          <Route path="/profilepage" element={<ProfilePage/>} />
        </Routes>
      </Router>
     
  );
}

export default App;
