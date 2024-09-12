import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logginpage from './Logginpage';
import PublishNews from './Component/PublishNews';
import Publish_Ads from './Component/Publish_Ads';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logginpage />} />
        <Route path="/publish_news" element={<PublishNews />} /> 
        <Route path="/publish_ads" element={<Publish_Ads />} /> 
      </Routes>
    </Router>
  );
}

export default App;
