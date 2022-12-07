import { useEffect, useRef, useState } from "react";
import "../css/Graph.css";
import YearFields from "./YearFields";
import MonthFields from "./MonthFields";
import DayFields from "./DayFields";
import DropDown from "./DropDown";
import BarContainers from "./BarContainers";
import DateSelector from "./DateSelector";
import {
  sequentialDates,
  cummulativeDays,
  sequentialMonths,
  cummulativeMonths,
} from "../utils/transactions";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = (props) => {
  const [detail, setDetail] = useState("daily");
  const [periods, setPeriods] = useState(null);
  const [rechartData, setRechartData] = useState(null);
  const [dates, setDates] = useState(null);
  const [sortedTrxs, setSortedTrxs] = useState(
    Object.entries(props.trxs).sort((a, b) => {
      return new Date(a[1].date) - new Date(b[1].date);
    })
  );
  const detailOptions = ["daily", "weekly", "monthly", "yearly"];

  const detailHandler = (event) => {
    setDetail(event.target.value);
  };

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

    //create array of all dates from earliest to latest date and get cummulative expense and income
    if (dates) {
      if (detail === "daily") {
        dObj = sequentialDates(dates[0], dates[1]);
        setPeriods(cummulativeDays(dObj, sortedTrxs, dates[0], dates[1]));
      } else if (detail === "monthly") {
        dObj = sequentialMonths(dates[0], dates[1]);
        setPeriods(cummulativeMonths(dObj, sortedTrxs, dates[0], dates[1]));
      }
      const test = Object.entries(dObj).map((entry) => {
        return {
          date: entry[0],
          expense: entry[1]["expense"],
          income: entry[1]["income"],
        };
      });
      console.log(test);
      setRechartData(
        Object.entries(dObj).map((entry) => {
          return {
            date: entry[0],
            expense: entry[1]["expense"],
            income: entry[1]["income"],
          };
        })
      );
      console.log(rechartData);
    }
  }, [dates, sortedTrxs, detail]);

  return (
    <div>
      <DropDown
        name="detail"
        options={detailOptions}
        detailHandler={detailHandler}
      ></DropDown>
      <DateSelector
        dates={dates}
        dateChangeHandler={dateChangeHandler}
      ></DateSelector>
      <div className="graphContainer">
        {rechartData && (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={rechartData} height={400} width={400}>
              <CartesianGrid />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="expense" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Graph;
