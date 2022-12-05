import { useContext } from "react";
import AuthContext from "./AuthContext";
import "./css/Header.css";

function Header(props) {
  const ctx = useContext(AuthContext);

  return (
    <div className="Header">
      <ul className="pages">
        <li onClick={props.pageSelectHandler} value='categorytable'>Category Table</li>
        <li onClick={props.pageSelectHandler} value='transactiontable'>Transaction Table</li>
        <li onClick={props.pageSelectHandler} value='graph'>Graph</li>
      </ul>
      <ul className="account">
        {localStorage.getItem("isLoggedIn") ? (
          <li key="1" onClick={ctx.logoutHandler}>
            Logout
          </li>
        ) : (
          <li key="1">Login</li>
        )}
        {localStorage.getItem("isLoggedIn") && (
          <li key="2" onClick={props.uploadStateShowHandler}>
            Upload
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
