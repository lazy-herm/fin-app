import { getDatabase, onValue, ref } from "firebase/database";
import { Fragment, useEffect, useState } from "react";
import { app } from "./utils/firebaseConfig";
import Pagination from "./Pagination";
import "./css/ExpenseTable.css";

function ExpenseTable(props) {
  const [fields, setFields] = useState(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [trxPerPage, setTrxPerPage] = useState(5);
  const [pagedTrx, setPagedTrx] = useState(null);

  const trxPerPageHandler = (event) => {
    const value = event.target.value;
    if (value > 0 && value % 1 === 0) {
      setTrxPerPage(value);
    }
  };

  const pageHandler = (event) => {
    if (event.target.nodeName !== "INPUT") {
      //used when buttons clicked
      const btnValue = parseInt(event.target.attributes.page.value);
      if (btnValue > 0 && btnValue <= pages) {
        setPage(btnValue);
      }
    } else {
      //used when input field changed
      if (parseInt(event.target.value) > 0) {
        if (parseInt(event.target.value) <= pages) {
          setPage(parseInt(event.target.value));
        } else {
          setPage(pages);
        }
      }
    }
  };

  useEffect(() => {
    if (props.trxs && trxPerPage) {
      /* updates number of pages based on set trx per page and total number of props.trxs*/
      setPages(Math.ceil(Object.keys(props.trxs).length / trxPerPage));
    }

    if (props.trxs) {
      /*creates array of props.trxs pages*/
      let tempPage = 0;
      let tempTrx = [];
      let count = 0;
      for (const [key, value] of Object.entries(props.trxs)) {
        if (count % trxPerPage === 0 && count !== 0) {
          tempPage++;
        }
        if (tempTrx[tempPage]) {
          tempTrx[tempPage].push(value);
        } else {
          tempTrx[tempPage] = [value];
        }
        count++;
      }
      setPagedTrx(tempTrx);
    }
  }, [props.trxs, trxPerPage]);

  useEffect(() => {
    // pulls initial transaction data from firebase database
    if (localStorage.getItem("isLoggedIn")) {
      const db = getDatabase(app);

      onValue(ref(db, "fields/"), (snapshot) => {
        const fieldData = snapshot.val();
        setFields(fieldData);
      });
    }
  }, []);

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            {props.trxs &&
              fields &&
              fields.map((element) => (
                <th key={element}>{element.toUpperCase()}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {pagedTrx &&
            pagedTrx[page - 1].map((trx, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={index + field}>{trx[field] ? trx[field] : ""}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {pages > 1 && (
        <Pagination
          pages={pages}
          pageHandler={pageHandler}
          page={page}
        ></Pagination>
      )}
    </Fragment>
  );
}

export default ExpenseTable;
