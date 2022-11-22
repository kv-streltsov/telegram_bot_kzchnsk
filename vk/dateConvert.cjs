function dateConverter(unix_time) {
  let date = new Date(unix_time * 1000);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let year = date.getUTCFullYear();

  let formattedTime = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes.substr(-2);
  return formattedTime;
}

module.exports = dateConverter;