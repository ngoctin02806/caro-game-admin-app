const getCurrentUser = () => {
  return localStorage.getItem("accessToken");
};

const getExpired = () => {
  return localStorage.getItem("expiredTokenDate");
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiredTokenDate");
};

const authHeader = () => {
  return { "x-auth-token": localStorage.getItem("accessToken") };
};

export default { getCurrentUser, getExpired, logout, authHeader };
