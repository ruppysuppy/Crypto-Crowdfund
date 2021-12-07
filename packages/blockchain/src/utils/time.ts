const formatTime = (time: Date) => {
  return time.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export { formatTime };
