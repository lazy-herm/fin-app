export const formatDate = (date) => {
  let tempDate = new Date(date);
  let day = tempDate.getDate();
  let month = tempDate.getMonth() + 1;
  if (String(day).length === 1) {
    day = ["0", day].join("");
  }
  if (String(month).length === 1) {
    month = ["0", month].join("");
  }

  return [tempDate.getFullYear(), month, day].join("-");
};




export default formatDate;