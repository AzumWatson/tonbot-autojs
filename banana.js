let utils = require("/sdcard/sc/utils.js");
function randomPress(x) {
  return x + Math.random() * 60 - 30;
}
let addr = "https://t.me/OfficialBananaBot/banana?startapp=referral=ET7BQT";
function taptap() {
  p = textMatches(/\d+\/\d+/).findOne(5000);
  if (p) {
    for (i = 0; i < 1000; i++) {
      if (i % 20 == 0) {
        p = textMatches(/\d+\/\d+/).findOne(100);
        txt = p.text().split("/");
        if (txt[0] == txt[1]) break;
      }
      press(randomPress(220), randomPress(550), 50);
      sleep(50);
    }
  }
  sleep(1000);
}

function havest() {
  p = className("android.widget.TextView")
    .text("Share Banana to get more")
    .findOne(1000);
  if (p) {
    h = p.parent().parent().findOne(textMatches(/\d+/));
    if (h) {
      number = parseInt(h.text());
      if (number > 0) {
        p.click();
        bound = utils.ocrBound("Get extra rewards", 5000);
        if (bound) {
          press(bound.centerX(), bound.centerY(), 50);
        }
        bound = utils.ocrBound("Share with friends", 23000);
        if (bound) {
          press(bound.centerX(), bound.centerY(), 50);
          p = className("android.widget.FrameLayout")
            .desc("Web tabs BANANA")
            .findOne(2000);
          if (p) {
            p.click();
            bound = utils.ocrBound("Put to bag", 5000);
            if (bound) {
              press(bound.centerX(), bound.centerY(), 50);
              sleep(1000);
            }
          }
        }
      }
    }
  }
}

function start() {
  app.openUrl(addr);
  p = textMatches(/\d+\/\d+/).findOne(40 * 1000);
  if (!p) {
    log("banana not found");
    return;
  }
  taptap();
  p = className("android.widget.TextView").text("Claim").findOne(100);
  if (p) {
    log("claim");
    p.click();
    sleep(3000);
  }
  p = textMatches(/\d+:\d+:\d+/).findOne(100);
  if (p) {
    txt = p.text().split(":");
    if (txt[0] > 4) {
      p = className("android.widget.TextView").text("BaBoost").findOne(3000);
      if (p) {
        p.click();
        p = className("android.widget.TextView").text("Yes").findOne(2000);
        if (p) {
          p.click();
          sleep(2000);
        }
      }
    }
  }

  havest();
}

module.exports = { start };
// start();
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }

// start();
// havest();
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }
// for (i = 0; i < 2; i++) {
//   havest();
// }
// bound = utils.ocrBound("Share with friends", 5000);
// log(bound);
// p = className("android.widget.TextView").text("Claim").findOne(100);
// p = className("android.view.View").text("Claim").findOne(1000);
// log(p);
