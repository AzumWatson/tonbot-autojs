let addr = "https://t.me/theFreeDogs_bot/app?startapp=ref_VPjawpe1";
const utils = require("/sdcard/sc/utils.js");

function checkIn() {
  try {
    text("Daily\nCheck-in").findOne(1000).click();
    textContains("Day").enabled(true).findOne(5000).click();
    sleep(20);
  } catch (e) {
    log(e);
  }
}
function taptap() {
  const tabButton = text("Global").findOne(1000).parent().child(3);
  for (let i = 0; i < 1000; i++) {
    if (i % 10 == 0) {
      let p = textMatches(/\d+ \/ \d+/)
        .findOne(1000)
        .text();
      log(p.split("/")[0]);
      count = parseInt(p.split("/")[0]);
      if (count < 10) break;
    }
    utils.randomPress(
      tabButton.bounds().centerX(),
      tabButton.bounds().centerY()
    );
    sleep(100);
  }
}
function start() {
    app.openUrl(addr);
  if (
    className("android.widget.TextView")
      .text("Petition")
      .findOne(30 * 1000)
  ) {
    try {
      taptap();
    } catch (e) {
      log(e);
    }
  } else {
    log("not wait");
  }
}
module.exports = { start };
// start();
// checkIn();
// a = textMatches(/\d+ \/ \d+/)
//   .findOne(1000)
//   .text()
//   .split("/")[0];
// log(a);
// log(parseInt(a));
