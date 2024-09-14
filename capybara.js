const addr = "https://t.me/Capybara_TapTap_bot?start=XRDZ4ksMmi";
const x = (123 + 381) / 2;
const y = (485 + 743) / 2;
const utils = require("/sdcard/sc/utils.js");
function taptap() {
  sleep(5000);
  log("tap begin");
  for (let i = 0; i < 500; i++) {
    utils.randomPress(x, y, 40, 50);
    sleep(400);
    const reg = /\d+.\/\d+/;
    p = textMatches(reg).findOne(100);
    if (p) {
      let count = parseInt(p.text().split("/")[0]);
      if (count == 0) return;
    } else {
      return;
    }
  }
}
function start() {
  app.openUrl(addr);
  let p = className("android.widget.Button")
    .textContains("Play Now")
    .visibleToUser(true)
    .findOne(5 * 1000);
  if (p) {
    p.click();
    sleep(2000);

    p = className("android.widget.TextView")
      .text("Power")
      .findOne(15 * 1000);
    if (p) {
      taptap();
    } else {
      log("power not found");
      return false;
    }
  } else {
    log("not found");
    return false;
  }
}
module.exports = { start };
// start();
// const reg = /\d+.\/\d+/;
// p = textMatches(reg).findOne(100);
// log(p.text().split("/")[0]);
// taptap()
