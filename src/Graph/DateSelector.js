import { Fragment } from "react";
import formatDate from '../utils/dates'

const DateSelector = (props) => {
  return (
    <div>
      {props.dates && (
        <Fragment>
          Period
          <input
            type="date"
            value={formatDate(props.dates[0])}
            name="startDate"
            onChange={(e) => props.dateChangeHandler(e)}
          ></input>
          to
          <input
            type="date"
            value={formatDate(props.dates[1])}
            name="endDate"
            onChange={(e) => props.dateChangeHandler(e)}
          ></input>
        </Fragment>
      )}
    </div>
  );
};

export default DateSelector;
