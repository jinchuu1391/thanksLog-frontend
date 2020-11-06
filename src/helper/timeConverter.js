const timeConverter = (time) => {
  const convertedTime = `${time.substring(0, 4)}년 ${time.substring(
    5,
    7
  )}월 ${time.substring(8, 10)}일 ${time.substring(11, 13)}시 ${time.substring(
    14,
    16
  )}분`;
  return convertedTime;
};
export default timeConverter;
