export const timestampToString = (timestamp) => {
  let date = (new Date(timestamp*1000));
  return date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+" "+date.getDate()+"."+date.getMonth()+"."+date.getFullYear();
}
