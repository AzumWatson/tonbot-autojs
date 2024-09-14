let addr = "https://t.me/major/start?startapp=1000710062";
let utils = require("/sdcard/sc/utils.js");
function holdCoin() {
  let p = utils.findWidgetInSize("android.view.View", 383, 382, 5000);
  if (p) {
    press(p.bounds().centerX(), p.bounds().centerY(), 65 * 1000);
    p = utils.findWidgetInSize("android.view.View", 39, 39, 10 * 1000);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function roulette() {
  log("roulette");
  let p = text("Tap To Spin").findOne(5000);
  log(p);
  if (p) {
    p.click();
    sleep(5000);
    p = utils.findWidgetInSize("android.view.View", 39, 39, 10 * 1000);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function swipeCoin() {
  let start = Date.now();
  let p = utils.findWidgetInSize("android.view.View", 480, 430, 10 * 1000);
  log(Date.now() - start);

  if (p) {
    let boundRect = p.bounds();
    let step = 100;
    let speed = 550;
    let start = Date.now();
    while (Date.now() - start < 62 * 1000) {
      for (let i = boundRect.top + step / 2; i < boundRect.bottom; i += step) {
        swipe(step / 2, i, boundRect.width() - step / 2, i, speed);
        sleep(20);
      }
    }
    p = utils.findWidgetInSize("android.view.View", 39, 39, 10 * 1000);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function playGame(gamename) {
  let p = className("android.widget.TextView").text("Games").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    p = text(gamename).findOne(1000);
    if (p) {
      p = p.parent().children().findOne(text("Play"));
      if (p) {
        p.click();
        sleep(3000);
        if (textMatches(/(Remind me)|(Don't remind me)/).findOne(1000)) {
          p = utils.findWidgetInSize("android.view.View", 39, 39, 1000);
          if (p) {
            p.click();
          }
          sleep(1000);
          return;
        } else {
          switch (gamename) {
            case "Hold coin":
              holdCoin();
              break;
            case "Roulette":
              roulette();
              break;
            case "Swipe Coin":
              swipeCoin();
              break;
          }
        }
      }
    }
  }
}

function start() {
  app.openUrl(addr);
  let reg = /(Take Bonus.*)/;
  if (!textMatches(reg).findOne(50 * 1000)) {
    log("no wait");
    return false;
  }
  p = textContains("Take Bonus").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
  }
  playGame("Hold coin");
  playGame("Roulette");
  playGame("Swipe Coin");

  return true;
}
module.exports = { start };
// start();
// log(text("Games").findOne(1000).classname());
// utils.checkWidget(20, 210, 470, 630);
// playGame("Swipe Coin");
// roulette();
// utils.checkWidget(0, 100, 480, 670);
// swipeCoin();
