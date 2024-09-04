const utils = require("/sdcard/sc/utils");
const addr = "https://t.me/hamster_kombat_Bot/start?startapp=kentId1000710062";

function taptap() {
  const button = className("android.widget.Button")
    .text("Hamster Kombat")
    .findOne(1000);
  for (var i = 0; i < 2000; i++) {
    if (i % 50 == 0) {
      let p = textMatches(/\d+.*\/.*\d+00/)
        .findOne(100)
        .text();
      let count = parseInt(p.split("/")[0]);
      if (count < 20) {
        break;
      }
    }
    utils.randomPress(button.bounds().centerX(), button.bounds().centerY(), 20);
    sleep(50);
  }
}
function checkIn() {
  className("android.view.View").desc("Exchange").findOne(1000).click();
  className("android.widget.Image")
    .text("daily_reward")
    .findOne(5000)
    .parent()
    .parent()
    .click();
  className("android.widget.Image")
    .text("calendar")
    .findOne(5000)
    .parent()
    .parent()
    .click();
  className("android.widget.Button").text("Claim").findOne(5000).click();
  sleep(6000);
}
function refull() {
  text("Boost").findOne(1000).click();
  sleep(1000);
  className("android.widget.TextView")
    .text("Full energy")
    .findOne(5000)
    .parent()
    .click();
  className("android.widget.Button").text("Go ahead").findOne(5000).click();
  sleep(3000);
  taptap();
}
function start() {
  app.openUrl(addr);
  p = textContains("rain").findOne(60 * 1000);
  if (!p) {
    log("not wait");
    return;
  }
  try {
    taptap();
    refull();
    checkIn();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { start };
// start();
// utils.checkWidget(0, 465, 480, 854);
// taptap();
// refull();
// p = text("Full energy").findOne(1000);
// log(p);
// checkIn();
