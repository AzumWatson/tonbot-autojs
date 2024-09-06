const utils = require("/sdcard/sc/utils");
const addr = "https://t.me/hamster_kombat_Bot/start?startapp=kentId1000710062";

function taptap() {
  const button = className("android.widget.Button")
    .text("Hamster Kombat")
    .findOne(1000);
  sleep(2000);
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

  daily = className("android.widget.TextView")
    .text("Daily reward")
    .findOne(1000);
  if (daily.parent().child(2).bounds().width() > 20) {
    daily.parent().click();
    className("android.widget.Button").text("Claim").findOne(5000).click();
    sleep(6000);
  }
}
function refull() {
  text("Boost").findOne(1000).click();
  sleep(3000);
  className("android.widget.TextView")
    .text("Full energy")
    .findOne(5000)
    .parent()
    .click();
  p = className("android.widget.Button").text("Go ahead").findOne(5000);
  if (p) {
    p.click();
    sleep(3000);
    taptap();
  } else {
    className("android.widget.ImageView").desc("Go back").findOne(1000).click();
  }
}
function start() {
  app.openUrl(addr);
  p = textMatches("/d+.*/.*d+00/").findOne(60 * 1000);
  if (!p) {
    log("not wait");
    return;
  }
  sleep(3000);
  try {
    count = 0;
    reg = /(Claim)|(Close)|(Thank you.*)/;
    while (textMatches(reg).exists() && count < 10) {
      textMatches(reg).findOne().click();
      sleep(2000);
      count++;
    }
    taptap();
    refull();
    checkIn();
  } catch (e) {
    console.log(e);
  }
}

const key = ["---", "-.", "-.-.", "....", ".-", "..", "-."]; //ONCHAIN
function sendKey(key) {
  for (let i = 0; i < key.length; i++) {
    if (key[i] == ".") {
      utils.randomPress(255, 709, 20, 60);
    } else {
      utils.randomPress(255, 709, 20, 1000);
    }
    sleep(180);
  }
}
function cipher() {
  t = 350;
  for (let i = 0; i < key.length - 4; i++) {
    sendKey(key[i]);
    sleep(4000);
  }
}
// cipher();
// sendKey(key[3]);
module.exports = { start };
// start();


// cipher();
// utils.checkWidget(0, 465, 480, 854);
// taptap();
// refull();
// p = text("Full energy").findOne(1000);
// log(p);
// checkIn();
// p = className("android.widget.TextView").text("Full energy").findOne(1000);
// log(p);
