import { createContext } from "react";
import authService from "../service/auth-service";

const authContext = createContext({
  isLoggedIn: false,
  accessToken: null,
  profile: {},
  login: () => {},
  logout: () => {},
});

export default authContext;
