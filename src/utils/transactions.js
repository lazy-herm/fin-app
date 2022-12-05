//create array of sequential dates from date A to date B
export const sequentialDates = (dateA, dateB) => {
  console.log("in function");
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
    if ((date.getDate() === 1 && date !== startDate) || date === endDate) {
      let startOfMonth = new Date(date)
      date === endDate && monthTracker++;
      startOfMonth.setDate(startOfMonth.getDate()-monthTracker);
      periodObj[startOfMonth.toDateString()]["monthSpan"] = monthTracker;
      monthTracker = 0;
      monthCount++;
      //check if it's also a new year
      if (date.getMonth() === 0) {
        let startOfYear = new Date(date)
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
  console.log('end of function');
  return periodObj;
};

export default sequentialDates;
