import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Redirect } from "react-router-dom";

import { getCurrentUser } from "../../service/auth-service";

const Home = (props) => {
  const [adminToken, setAdminToken] = useState("");

  useEffect(() => {
    setAdminToken(getCurrentUser());
  }, []);

  if (adminToken === null) return <Redirect to="/login" />;
  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Home</title>
        <meta name="description" content="Admin Home" />
      </Helmet>
      <div> {adminToken}</div>
    </HelmetProvider>
  );
};

export default Home;
