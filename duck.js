const addr = "https://t.me/duckscoop_bot/app?startapp=A9tkeRQY1u";
const utils = require("/sdcard/sc/utils.js");
function checkIn() {
  p = textMatches(/Check-in/).findOne(1000);
  if (p) {
    p.click();
    sleep(2000);
    p = className("android.widget.Button")
      .boundsInside(10, 860, 480, 960)
      .text("Check-in")
      .findOne(2000);
    if (p) {
      p.click();
      sleep(2000);
      closePopup();
    }
  }
}
function closePopup() {
  let count = 0;
  do {
    p = utils.findWidgetInSize("android.widget.Button", 20, 22, 5000);
    if (p) {
      p.click();
      sleep(1000);
    }
    count++;
  } while (p && count < 5);
}

function start() {
  app.openUrl(addr);
  p = textContains("Check-in").findOne(30 * 1000);
  if (!p) return;

  closePopup();
  log("closePopup");
  checkIn();
  log("checkIn");
}
function taskGo() {
  if (className("android.widget.Button").text("Go").exists()) {
    p = className("android.widget.Button").text("Go").click();
    log(p.length);
  }
}
module.exports = { start };
// start();
