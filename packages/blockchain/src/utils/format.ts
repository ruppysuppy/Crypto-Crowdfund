const formatNumber = (number: number) => {
  return number.toLocaleString('en-US');
};

const formatTimeLong = (time: Date) => {
  return time.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
};

const formatTimeShort = (time: Date) => {
  return time.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export { formatNumber, formatTimeLong, formatTimeShort };
