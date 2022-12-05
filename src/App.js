import "./css/App.css";
import Login from "./Login";
import Home from "./Home";
import { useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

function App() {
  const ctx = useContext(AuthContext);
useEffect(()=>{
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  if(storedIsLoggedIn){
    ctx.loginHandler(storedIsLoggedIn)
  }
},[]);
  return (
      <div className="App">
        {ctx.isLoggedIn ? <Home /> : <Login />}
        {/*youre in the html body*/}
      </div>
  );
}

export default App;
