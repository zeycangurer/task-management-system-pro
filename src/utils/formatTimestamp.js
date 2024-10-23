export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  let date;
  
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    date = timestamp.toDate();
  } else if (typeof timestamp === 'object' && timestamp.seconds && timestamp.nanoseconds) {
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    return 'N/A';
  }
  
  if (isNaN(date.getTime())) {
    return 'N/A';
  }
  
  return date.toLocaleString();
};
