import "../css/DropDown.css";

const DropDown = (props) => {
  return (
    <div className="dropdownContainer">
      <div className="label">{props.name}:</div>
      <select className="select" onChange={props.detailHandler}>
        {props.options &&
          props.options.map((option) => {
            return (
              <option key={option} className="option" value={option}>
                {option}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default DropDown;
