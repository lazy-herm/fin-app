import { Fragment } from "react";
import Bar from "./Bar";

const BarContainers = (props) => {
  return (
    <Fragment>
      {props.periods &&
        Object.entries(props.periods).map((entry, index) => {
          return (
            <td className="barContainer" key={'bar'+index}>
              <Bar
                className={"incomeBar bar"}
                height={entry[1]["income"]}
              ></Bar>
              <Bar
                className={"expenseBar bar"}
                height={entry[1]["expense"]}
              ></Bar>
            </td>
          );
        })}
    </Fragment>
  );
};

export default BarContainers;
