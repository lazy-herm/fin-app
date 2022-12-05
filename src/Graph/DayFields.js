import { Fragment } from "react";

const DayFields = (props) => {
  return (
    <Fragment>
      {props.periods &&
        Object.entries(props.periods).map((entry, index) => {
          return (
            <td className="barContainer" key={'days'+index}>{new Date(entry[0]).getDate()}</td>
          );
        })}
    </Fragment>
  );
};

export default DayFields;
