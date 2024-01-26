function timeSince(date: Date) {
 const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

 let interval = seconds / 31536000;

 if (interval == 1) {
  return Math.floor(interval) + " year ago";
 }

 if (interval > 1) {
  return Math.floor(interval) + " years ago";
 }

 interval = seconds / 2592000;

 if (interval == 1) {
  return "1 month ago";
 }

 if (interval > 1) {
  return Math.floor(interval) + " months ago";
 }

 interval = seconds / 86400;

 if (interval > 0 && interval <= 2) {
  return "1 day ago";
 }

 if (interval > 1) {
  return Math.floor(interval) + " days ago";
 }

 interval = seconds / 3600;

 if (interval === 1) {
  return Math.floor(interval) + " hour ago";
 }

 if (interval > 1) {
  return Math.floor(interval) + " hours ago";
 }

 interval = seconds / 60;

 if (interval === 1) {
  return Math.floor(interval) + " minute ago";
 }

 if (interval > 1) {
  return Math.floor(interval) + " minutes ago";
 }

 return Math.floor(seconds) + " seconds ago";
}

export default timeSince;
