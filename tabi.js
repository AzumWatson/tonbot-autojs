utils = require("/sdcard/sc/utils.js");
function checkIn() {
  p = className("android.widget.TextView").text("Task").findOne(5000);
  if (p) {
    p.parent().click();
    p = className("android.widget.TextView").text("Daily Reward").findOne(5000);
    if (p) {
      p = p.parent().findOne(textContains("link"));
      if (p) {
        p.click();
        p = className("android.widget.TextView")
          .textMatches(/Claim\d+.*/)
          .findOne(5000);
        if (p) {
          p.click();
          p = className("android.widget.TextView")
            .text("Come Back Tomorrow")
            .findOne(5000);
          if (p) {
            p = className("android.widget.Image")
              .text("AAAAAElFTkSuQmCC")
              .findOne(1000);
            if (p) {
              p.click();
            }
          }
        }
      }
    }
  }
}

// utils.checkWidget(0, 190, 86, 295);
function start() {
  app.openUrl("https://t.me/tabizoobot/tabizoo?startapp=1000710062");
  p = className("android.widget.TextView")
    .textContains("Shiro")
    .findOne(30 * 1000);
  if (!p) {
    log("tabi not found");
    return;
  }
  p.click();
  sleep(2000);

  p = className("android.widget.TextView").text("Claim").findOne(100);
  if (p) {
    p.click();
    sleep(1000);
    press(239, 740, 50);
  }
  sleep(2000);

  checkIn();
  sleep(2000);
}
module.exports = { start };
// start();
