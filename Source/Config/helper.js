export const ChangeDateMode = date => {
  let dateArray = date.split('-');

  console.log(dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]);
  return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
};
