import React, {useState} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logoutHandler: ()=>{},
  loginHandler: ()=>{}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoginState] = useState(false);
  const logoutHandler = () => {
    setLoginState(false);
    localStorage.removeItem('isLoggedIn')
  };
  const loginHandler = (uid) => {
    setLoginState(uid);
    localStorage.setItem('isLoggedIn', uid)
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logoutHandler: logoutHandler,
        loginHandler: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
