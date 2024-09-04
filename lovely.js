let addr = "https://t.me/LovelyLegends_bot/start?startapp=kentId1000710062";
function taptap() {
  p = className("android.view.View").desc("Clicker").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    for (i = 0; i < 1000; i++) {
      if (i % 20 == 0) {
        p = className("android.widget.TextView").text("Boost").findOne(1000);
        if (p) {
          p = p.parent().parent();
          p = p.findOne(textMatches(/\d+/));
          if (p.text() < 20) {
            break;
          }
        } else {
          break;
        }
      }
      press(250, 630, 20);
      sleep(30);
    }
  }
}
function checkIn() {
  p = className("android.widget.TextView").text("Earn").findOne(100);
  if (p) {
    p.click();
    p = className("android.widget.TextView").text("DAILY").findOne(1000);
    if (p) {
      p.click();
      p = className("android.widget.Button").text("Claim reward").findOne(100);
      if (p) {
        p.click();
      }
    }
  }
}
function fullEnergy() {
  p = className("android.widget.TextView").text("Boost").findOne(100);
  if (p) {
    p.click();
    p = className("android.widget.TextView").text("Full Energy").findOne(2000);
    if (p) {
      p.click();
      p = className("android.widget.Button")
        .textContains("Activate")
        .findOne(2000);
      if (p) {
        p.click();
        sleep(1000);
        p = className("android.widget.TextView").text("rain").findOne(1000);
        if (p) {
          p.click();
          sleep(1000);
          taptap();
        }
      }
    }
  }
}
function start() {
  app.openUrl(addr);
  let p = className("android.widget.TextView")
    .textContains("rain")
    .findOne(60 * 1000);
  if (!p) return;
  //check in
  taptap();
  fullEnergy();
  checkIn();
}

module.exports = { start };
// start();
// fullEnergy();
// taptap();
//   var target = child.findOne(className("android.view.View").desc("Clicker"));
//   target.;
//   });

// .parent()
// .findOne(textMatches(/\d+/));
