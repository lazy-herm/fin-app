import "./css/Body.css";
import ExpenseTable from "./ExpenseTable";
import Graph from "./Graph/Graph";
import CategoryTable from "./CategoryTable";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "./utils/firebaseConfig";

function Body(props) {
  const [trxs, setTrxs] = useState(null);

  useEffect(() => {
    // pulls initial transaction data from firebase database
    if (localStorage.getItem("isLoggedIn")) {
      const db = getDatabase(app);

      onValue(
        ref(db, "transactions/" + localStorage.getItem("isLoggedIn")),
        (snapshot) => {
          const data = snapshot.val();
          setTrxs(data);
        }
      );
    }
  }, []);
  return (
    <div className="Body">
      {props.pageSelect === "transactiontable" && <ExpenseTable trxs={trxs}></ExpenseTable>}
      {props.pageSelect === "graph" && <Graph trxs={trxs}></Graph>}
      {props.pageSelect === "categorytable" && <CategoryTable trxs={trxs}></CategoryTable>}
    </div>
  );
}

export default Body;
