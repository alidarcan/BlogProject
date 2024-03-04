export function date() {
  let d = new Date();
  let dDay = dateConfig(d.getDate());
  let dMonth = dateConfig(d.getMonth() + 1);
  let dYear = d.getFullYear();
  let dHours = dateConfig(d.getHours());
  let dMinutes = dateConfig(d.getMinutes());
  return `${dDay}/${dMonth}/${dYear} ${dHours}:${dMinutes}`;
}

function dateConfig(data) {
  if (data < 10) {
    data = "0" + data;
    return data;
  } else {
    return data;
  }
}
