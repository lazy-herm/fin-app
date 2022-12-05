import { useEffect, useState } from "react";
import "../css/Graph.css";
import YearFields from "./YearFields";
import MonthFields from "./MonthFields";
import DayFields from "./DayFields";
import DropDown from "./DropDown";
import BarContainers from "./BarContainers";
import DateSelector from "./DateSelector";
import sequentialDates from '../utils/transactions';

const Graph = (props) => {
  const [detail, detDetail] = useState("daily");
  const [periods, setPeriods] = useState(null);
  const [dates, setDates] = useState(null);
  const [sortedTrxs, setSortedTrxs] = useState(
    Object.entries(props.trxs).sort((a, b) => {
      return new Date(a[1].date) - new Date(b[1].date);
    })
  );
  const [dateSpan, setDateSpan] = useState(null);
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
    } else {
      if (name === "startDate") {
        setDates((prevState) => {
          return [earliestDate.toDateString(), prevState[1]];
        });
      } else {
        setDates((prevState) => {
          return [prevState[0], latestDate.toDateString()];
        });
      }
    }
  };

  useEffect(() => {
    if (dates) {
      setDateSpan(
        (new Date(new Date(dates[1]).toDateString()) -
          new Date(new Date(dates[0]).toDateString())) /
          86400000
      );
    }
  }, [dates]);

  useEffect(() => {
    setDates([
      new Date(sortedTrxs[0][1].date).toDateString(),
      new Date(sortedTrxs[sortedTrxs.length - 1][1].date).toDateString(),
    ]);
  }, [sortedTrxs]);

  useEffect(() => {
    let dObj = {};
    let monthTracker = 0;
    let yearTracker = 0;
    let yearCount = 0;
    //create array of all dates from earliest to latest date
    //get date span
    
    if (dates){dObj = sequentialDates(dates[0], dates[1]);console.log(dObj);}
    //get cummulative expense and income for each date
    if (Object.keys(dObj).length > 0) {
      sortedTrxs.forEach((trx) => {
        let date = new Date(trx[1].date).toDateString();

        if (
          new Date(date) >= new Date(dates[0]) &&
          new Date(date) <= new Date(dates[1])
        ) {
          if (trx[1].amount < 0) {
            dObj[date]["expense"] =
              parseFloat(dObj[date]["expense"]) +
              Math.abs(parseFloat(trx[1].amount));
          } else {
            dObj[date]["income"] =
              parseFloat(dObj[date]["income"]) + parseFloat(trx[1].amount);
          }
        }
      });
      setPeriods(dObj);
    }
  }, [dateSpan]);

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
