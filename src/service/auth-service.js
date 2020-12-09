const getCurrentUser = () => {
  return localStorage.getItem("accessToken");
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

export { getCurrentUser, logout };
