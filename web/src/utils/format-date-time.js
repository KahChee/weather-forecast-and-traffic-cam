const padStartZero = (value) => {
  return value.toString().padStart(2, '0');
};

// Format dateTime into string with format yyyy-MM-dd[T]hh:mm:ss
const formatDateTime = (dateTime) => {
  if (dateTime instanceof Date) {
    const dateTimeString =
      `${dateTime.getFullYear()}-` +
      `${padStartZero(dateTime.getMonth() + 1)}-` +
      `${padStartZero(dateTime.getDate())}T` +
      `${padStartZero(dateTime.getHours())}:` +
      `${padStartZero(dateTime.getMinutes())}:` +
      `${padStartZero(dateTime.getSeconds())}`;
    
    return dateTimeString;
  }

  return dateTime;
};

export default formatDateTime;
