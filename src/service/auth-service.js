const getCurrentUser = () => {
  return localStorage.getItem("accessToken");
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

export default { getCurrentUser, logout };
