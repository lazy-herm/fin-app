import "./css/Upload.css";
import { getDatabase, ref, update, push, child } from "firebase/database";
import app from "./utils/firebaseConfig";

function Upload(props) {
  const firebaseUpload = (csvArray) => {
    const db = getDatabase(app);

    for (let i = 0; i <= csvArray.length; i++) {
      let newTrxKey = push(
        child(ref(db), "transactions/" + localStorage.getItem("isLoggedIn"))
      ).key;
      let updates = {};
      updates[
        "transactions/" + localStorage.getItem("isLoggedIn") + "/" + newTrxKey
      ] = csvArray[i];
      update(ref(db), updates)
        .then(() => {
          // Data saved successfully!
          console.log("success");
        })
        .catch((error) => {
          console.log(error);
          // The write failed...
        });
    }
  };

  const processCSV_cryptoCard = async (text, delim = ",") => {
    const headers = text.slice(0, text.indexOf("\n")).split(delim); // creates an array of the headers.
    const rows = text.slice(text.indexOf("\n") + 1).split("\n"); //creates an array of rows.
    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const obj = headers.reduce((tempObj, header, index) => {
        tempObj[header] = values[index];
        return tempObj;
      }, {});
      const newObj = {
        date: obj["Timestamp (UTC)"],
        amount: obj["Amount"],
        currency: obj["Currency"],
        description: obj["Transaction Description"],
        source: "crypto.com card csv",
        account: "Crypto.com Card",
        category: "",
      };
      return newObj;
    });
    firebaseUpload(newArray);
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (evt) => {
      const text = evt.target.result;
      processCSV_cryptoCard(text);
    };
  };

  return (
    <div className={props.className}>
      <div className="form">
        <button onClick={props.uploadStateHideHandler}>X</button>
        <form>
          <input type="file" onChange={fileHandler}></input>
          <button type="submit">UPLOAD</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
