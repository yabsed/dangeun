import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import MyCarrot from './pages/MyCarrot';
import NeighborhoodMap from './pages/NeighborhoodMap';
import './styles/common.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/dangun/login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dangun/jobs');
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    navigate('/dangun/jobs');
  };

  // Hide NavBar on login/signup pages
  const hideNav = location.pathname === '/dangun/login' || location.pathname === '/dangun/signup';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {!hideNav && <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <div style={{ 
        paddingTop: !hideNav ? '64px' : '0',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dangun/jobs" replace />} />
          <Route path="/dangun/jobs" element={<Home/>}/>
          <Route path="/dangun/map" element={<NeighborhoodMap/>}/>
          <Route path="/dangun/posts/:id" element={<PostDetail/>}/>
          <Route path="/dangun/chat" element={<ChatList />} />
          <Route path="/dangun/chat/:chatId" element={<ChatRoom />} />
          <Route path="/dangun/my" element={<MyCarrot />} />
          
          <Route path="/dangun/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dangun/signup" element={<Signup onSignup={handleSignup} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
