import { useEffect, useState } from "react";
import "./css/Pagination.css";

function Pagination(props) {
  const [inputValue, setInputValue] = useState(props.page);
  useEffect(() => {
    setInputValue(props.page);
  }, [props.page]);
  const inputValueHandler = (event) => {
    if (event.type === "focus") {
      setInputValue("");
    }
  };

  return (
    <div className="newPagination">
      <button onClick={props.pageHandler} page={1}>
        &lt;&lt;
      </button>
      <button onClick={props.pageHandler} page={props.page - 1}>
        &lt;
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={props.pageHandler}
        onFocus={inputValueHandler}
      ></input>
      <div>of</div>
      <input type="text" disabled value={props.pages}></input>
      <button onClick={props.pageHandler} page={props.page + 1}>
        &gt;
      </button>
      <button onClick={props.pageHandler} page={props.pages}>
        &gt;&gt;
      </button>
    </div>
  );
}

export default Pagination;
