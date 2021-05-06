export function timeSince(date) {
  const inputDate = Number(new Date(date));
  const now = Number(new Date());
  let seconds = Math.floor((now - inputDate) / 1000);

  let intervalType = 'minute';

  let interval = Math.floor(seconds / 31536000);
  if (typeof interval !== 'number') interval = 0;
  else if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hour';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'minute';
          } else {
            interval = 0;
            intervalType = 'minute';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType + ' ago';
}
