import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Deletitem from './Deletitem';
import BannerOrder from './BannerOrder';
import PublishAds from './PublishAds';
import PublishNews from './PublishNews';
import Logginpage from './Logginpage';
import NavbarDisplay from './NavbarDisplay';
import PrivateRoute from './PrivateRoute'
import Logout from './Logout';



const MainRoute = () => {



  return (
    <Router>
      <NavbarDisplay />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Logginpage />} />
        <Route path="/Logout" element={<Logout/>} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Publish_news" element={<PublishNews />} />
          <Route path="/publish_ads" element={<PublishAds />} />
          <Route path="/SetBanner" element={<BannerOrder />} />
          <Route path="/DeleteItem" element={<Deletitem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRoute;
