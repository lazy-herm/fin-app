//create array of sequential dates from date A to date B
export const sequentialDates = (dateA, dateB) => {
  const startDate = new Date(dateA);
  const endDate = new Date(dateB);
  let periodObj = {};
  let monthTracker = 0;
  let yearTracker = 0;
  let monthCount = 0;
  let yearCount = 0;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    //intial entry
    periodObj[date.toDateString()] = {
      expense: 0,
      income: 0,
    };
    //check if it's a new month or the last date
    //change below to compare todatestring when checking if first date or not
    if (
      (date.getDate() === 1 && date !== startDate) ||
      date.toDateString() === endDate.toDateString()
    ) {
      let startOfMonth = new Date(date);
      startOfMonth.setDate(startOfMonth.getDate() - monthTracker);
      date.toDateString() === endDate.toDateString() && monthTracker++;
      periodObj[startOfMonth.toDateString()]["monthSpan"] = monthTracker;
      monthTracker = 0;
      monthCount++;
      //check if it's also a new year
      if (date.getMonth() === 0) {
        let startOfYear = new Date(date);
        startOfYear.setDate(startOfYear.getDate() - yearTracker);
        periodObj[startOfYear.toDateString()]["yearSpan"] = yearTracker;
        yearTracker = 0;
        yearCount++;
      }
    }

    monthTracker++;
    yearTracker++;
  }

  //if no new month or new year encountered then add tracker numbers to earliest dates.
  if (monthCount === 0) {
    periodObj[startDate.toDateString()]["monthSpan"] = monthTracker;
  }
  if (yearCount === 0) {
    periodObj[startDate.toDateString()]["yearSpan"] = yearTracker;
  }
  return periodObj;
};

export const sequentialMonths = (dateA, dateB) => {
  const startDate = new Date(dateA);
  const endDate = new Date(dateB);
  startDate.setDate(1);
  endDate.setDate(1);

  let periodObj = {};
  let yearTracker = 0;
  let yearCount = 0;

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setMonth(date.getMonth() + 1)
  ) {
    //intial entry
    periodObj[date.toDateString()] = {
      expense: 0,
      income: 0,
    };
    //check if it's a new year
    if (
      (date.getMonth() === 0 &&
        date.toDateString() !== startDate.toDateString()) ||
      date.toDateString() === endDate.toDateString()
    ) {
      let startOfYear = new Date(date);
      startOfYear.setMonth(startOfYear.getMonth() - yearTracker);
      date.toDateString() === endDate.toDateString() && yearTracker++;
      periodObj[startOfYear.toDateString()]["yearSpan"] = yearTracker;
      yearTracker = 0;
      yearCount++;
    }

    yearTracker++;
  }

  //if no new year encountered then add tracker numbers to earliest dates.
  if (yearCount === 0) {
    periodObj[startDate.toDateString()]["yearSpan"] = yearTracker;
  }
  return periodObj;
};

export const cummulativeDays = (dateObj, trxs, minDate, maxDate) => {
  trxs.forEach((trx) => {
    let trxDate = new Date(trx[1].date).toDateString();

    if (
      new Date(trxDate) >= new Date(minDate) &&
      new Date(trxDate) <= new Date(maxDate)
    ) {
      if (trx[1].amount < 0) {
        dateObj[trxDate]["expense"] =
          parseFloat(dateObj[trxDate]["expense"]) +
          Math.abs(parseFloat(trx[1].amount));
      } else {
        dateObj[trxDate]["income"] =
          parseFloat(dateObj[trxDate]["income"]) + parseFloat(trx[1].amount);
      }
    }
  });
  return dateObj;
};

export const cummulativeMonths = (dateObj, trxs, minDate, maxDate) => {
  const minMonth = new Date(minDate);
  minMonth.setDate(1);
  const maxMonth = new Date(maxDate);
  maxMonth.setDate(1);

  trxs.forEach((trx) => {
    let trxMonth = new Date(trx[1].date);
    trxMonth.setDate(1);
    if (
      new Date(trxMonth) >= new Date(minMonth) &&
      new Date(trxMonth) <= new Date(maxMonth)
    ) {
      if (trx[1].amount < 0) {
        console.log(trxMonth.toDateString());
        dateObj[trxMonth.toDateString()]["expense"] =
          parseFloat(dateObj[trxMonth.toDateString()]["expense"]) +
          Math.abs(parseFloat(trx[1].amount));
      } else {
        dateObj[trxMonth.toDateString()]["income"] =
          parseFloat(dateObj[trxMonth.toDateString()]["income"]) + parseFloat(trx[1].amount);
      }
    }
  });
  return dateObj;
};

export default sequentialDates;
