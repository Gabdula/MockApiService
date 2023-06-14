export const formatDate = (date) => {
  let fullDate;
  fullDate = date.slice(8, 10);
  switch (date.slice(5, 7)) {
    case "01":
      fullDate += " January ";
      break;
    case "02":
      fullDate += " February ";
      break;
    case "03":
      fullDate += " March ";
      break;
    case "04":
      fullDate += " April ";
      break;
    case "05":
      fullDate += " May ";
      break;
    case "06":
      fullDate += " June ";
      break;
    case "07":
      fullDate += " July ";
      break;
    case "08":
      fullDate += " August ";
      break;
    case "09":
      fullDate += " September ";
      break;
    case "10":
      fullDate += " October ";
      break;
    case "11":
      fullDate += " November ";
      break;
    case "12":
      fullDate += " December ";
      break;
  }
  fullDate += date.slice(0, 4) + "y.";
  return fullDate;
};
