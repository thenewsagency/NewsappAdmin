import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage, { Username, Password, Submit, Title, Logo } from '@react-login-page/page6';
import { useAuth } from './AuthContext'; // Import useAuth from AuthContext

const styles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const Logginpage = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); // Use AuthContext

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = async () => {
    
    try {
      const isLoggedIn = await login(userName, userPassword);
      if (isLoggedIn) {
        navigate('/Publish_news'); // Navigate to the protected route
      }
       } catch (error) {
      setErrorMessage('Invalid username or password');
    }

    // Clear the input fields
    setUserName('');
    setUserPassword('');
  };

  return (
    <div style={styles}>
      <LoginPage>
        <Username 
          name="userName" 
          value={userName} 
          onChange={handleUsernameChange} 
          placeholder="Enter your username"
        />
        <Password 
          placeholder="Enter your password" 
          name="userPassword" 
          value={userPassword} 
          onChange={handlePasswordChange} 
        />
        <Submit onClick={handleSubmit}>Submit</Submit>
        
        <Title />
        <Logo>⚛️</Logo>
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </LoginPage>
    </div>
  );
};

export default Logginpage;
