
// worker is counting number of seconds since last click

var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",1000);
}

timedCount();