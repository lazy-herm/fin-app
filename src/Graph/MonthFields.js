import { Fragment } from "react";

const MonthFields = (props) => {
  return (
    <Fragment>
      {props.periods &&
        Object.entries(props.periods).map((entry, index) => {
          if (entry[1].monthSpan) {
            return (
              <td colSpan={entry[1].monthSpan} key={'month'+index}>
                {new Date(entry[0]).toLocaleString("default", {
                  month: "long",
                })}
              </td>
            );
          } else {
            return <Fragment key={'month'+index}></Fragment>;
          }
        })}
    </Fragment>
  );
};

export default MonthFields;
