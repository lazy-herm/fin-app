import { useEffect, useState } from "react";
import "../css/Graph.css";
import YearFields from "./YearFields";
import MonthFields from "./MonthFields";
import DayFields from "./DayFields";
import DropDown from "./DropDown";
import BarContainers from "./BarContainers";
import DateSelector from "./DateSelector";
import { sequentialDates, cummulativeDays, sequentialMonths, cummulativeMonths } from "../utils/transactions";

const Graph = (props) => {
  const [detail, detDetail] = useState("daily");
  const [periods, setPeriods] = useState(null);
  const [dates, setDates] = useState(null);
  const [sortedTrxs, setSortedTrxs] = useState(
    Object.entries(props.trxs).sort((a, b) => {
      return new Date(a[1].date) - new Date(b[1].date);
    })
  );
  const detailOptions = ["daily", "weekly", "monthly", "yearly"];

  const dateChangeHandler = (event) => {
    const inputDate = new Date(event.target.valueAsDate);
    const earliestDate = new Date(sortedTrxs[0][1].date);
    const latestDate = new Date(sortedTrxs[sortedTrxs.length - 1][1].date);
    const name = event.target.attributes.name.value;
    if (inputDate <= latestDate && inputDate >= earliestDate) {
      if (name === "startDate") {
        setDates((prevState) => {
          return [inputDate.toDateString(), prevState[1]];
        });
      } else {
        setDates((prevState) => {
          return [prevState[0], inputDate.toDateString()];
        });
      }
    } 
  };

  useEffect(() => {
    setDates([
      new Date(sortedTrxs[0][1].date).toDateString(),
      new Date(sortedTrxs[sortedTrxs.length - 1][1].date).toDateString(),
    ]);
  }, [sortedTrxs]);

  useEffect(() => {
    let dObj = {};
    //create array of all dates from earliest to latest date
    if (dates) {
      // dObj = sequentialDates(dates[0], dates[1]);
      dObj = sequentialMonths(dates[0], dates[1]);
      // console.log(test);
      // const testTrx = cummulativeMonths(test, sortedTrxs, dates[0], dates[1]);
      // console.log(testTrx);
    }

    //set cummulative expense and income for each date
    if (Object.keys(dObj).length > 0) {
      // setPeriods(cummulativeDays(dObj, sortedTrxs, dates[0], dates[1]));
      setPeriods(cummulativeMonths(dObj, sortedTrxs, dates[0], dates[1]));

    }
  }, [dates, sortedTrxs]);

  return (
    <div>
      <DropDown name="detail" options={detailOptions}></DropDown>
      <DateSelector
        dates={dates}
        dateChangeHandler={dateChangeHandler}
      ></DateSelector>
      <div className="graphContainer">
        <table>
          <tbody>
            <tr>
              <BarContainers periods={periods}></BarContainers>
            </tr>
            <tr>
              <DayFields periods={periods}></DayFields>
            </tr>
            <tr>
              <MonthFields periods={periods}></MonthFields>
            </tr>
            <tr>
              <YearFields periods={periods}></YearFields>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Graph;
