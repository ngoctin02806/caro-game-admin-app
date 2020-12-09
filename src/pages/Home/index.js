import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Redirect } from "react-router-dom";

import GameDashboard from "../GameDashboard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import AuthService from "../../service/auth-service";

const Home = (props) => {
  if (AuthService.getCurrentUser() === null) return <Redirect to="/login" />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Home</title>
        <meta name="description" content="Admin Home" />
      </Helmet>
      <div>
        <Header />
        <GameDashboard />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Home;
