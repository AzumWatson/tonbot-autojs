let addr = "https://t.me/else_app_bot/start?startapp=ref=elsexcfmt2y1";
function taptap() {
  p = className("android.view.View").desc("Collect").findOne(1000);
  if (p) {
    p.click();
    p = className("android.widget.Button").textContains("Level").findOne(2000);
    if (!p) return;
    boundRect = p.bounds();
    p = className("android.view.View").desc("Collect").findOne(1000);
    if (p) {
      p.click();
      let reg = /\d+\/\d+/;
      for (i = 0; i < 2000; i++) {
        if (i % 60 == 0) {
          p = textMatches(reg).findOne(1000);
          if (p) {
            count = parseInt(p.text().split("/"));
            if (count < 20) {
              break;
            }
          }
        }
        press(boundRect.centerX(), boundRect.centerY(), 50);
        sleep(20);
      }
    }
  }
}
function fullEnergy() {
  p = className("android.widget.TextView").text("Boost").findOne(100);
  if (p) {
    p.click();
    p = className("android.widget.TextView")
      .text("Free daily boost")
      .findOne(1000);
    if (p) {
      boundRect = p.parent().bounds();
      p = boundsInside(
        boundRect.left,
        boundRect.top,
        boundRect.right,
        boundRect.bottom
      )
        .text("Start")
        .findOne(100);
      if (p) {
        p.click();
        p = className("android.widget.Button").text("Get").findOne(1000);
        if (p) {
          p.click();
          sleep(3000);
          taptap();
        }
      }
    }
  }
}
function daily() {
  p = className("android.view.View").desc("Tasks").findOne(1000);
  if (p) {
    p.click();
    p = text("Daily rewards").findOne(1000);
    if (p) {
      bounds = p.parent().bounds();
      p = text("Start")
        .boundsInside(bounds.left, bounds.top, bounds.right, bounds.bottom)
        .findOne(1000);
      if (p) {
        p.click();
        p = text("Claim").findOne(1000);
        if (p) p.click();
      }
      back();
    }
  }
}

function start() {
  app.openUrl(addr);
  let reg = /(.*rain.*)/;
  if (textMatches(reg).findOne(60 * 1000)) {
    p = text("Close").findOne(100);
    if (p) p.click();
    taptap();
    fullEnergy();
    daily();
  }
}
// utils = require("/sdcard/sc/utils.js");
// utils.checkWidget(0, 416, 480, 848);
module.exports = { start };
// start();
// p = className("android.widget.Button").findOne(100);
// log(p);
// start();
// taptap();
// fullEnergy();
// log(w.text());
