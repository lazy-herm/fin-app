import { Fragment } from "react";

const YearFields = (props) => {
  return (
    <Fragment>
      {props.periods &&
        Object.entries(props.periods).map((entry, index) => {
          if (entry[1].yearSpan) {
            return (
              <td colSpan={entry[1].yearSpan} key={'year'+index}>
                {new Date(entry[0]).getFullYear()}
              </td>
            );
          } else {
            return <Fragment></Fragment>;
          }
        })}
    </Fragment>
  );
};

export default YearFields;
