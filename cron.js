let addr = "https://t.me/Corn/PlayCornBattles?startapp=1000710062";
function checkIn() {
  p = className("android.widget.Image").text("Leaderboard icon").findOne(1000);
  if (p) {
    p.parent().click();
    p = className("android.widget.Button").text("GO").findOne(1000);
    if (p) {
      p.click();
      p = className("android.widget.TextView").text("CLAIM").findOne(1000);
      if (p) {
        p.click();
        p = className("android.widget.Button").text("CLOSE").findOne(5000);
        if (p) {
          p.click();
          sleep(1000);
        }
      }
    }
  }
}

function earn() {
  className("android.widget.Image").text("Main").findOne(1000).parent().click();
  sleep(1000);
  let reg = /(.*COLLECT YOUR EARNED.*)|(.*EARN \$CORNIO.*)/;
  do {
    p = className("android.widget.Button").textMatches(reg).findOne(1000);
    if (p) {
      p.click();
      sleep(1000);
    }
  } while (p);
  p = className("android.widget.Button").text("CLOSE").findOne(3000);
  if (p) p.click();

  p = className("android.widget.TextView").text("COLLECT").findOne(2000);
  if (p) {
    p.click();
    sleep(1000);
    p = className("android.widget.Button").text("CLOSE").findOne(3000);
    if (p) p.click();
    sleep(1000);
  }

  p = className("android.widget.TextView").text("OPEN").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    press(250, 626, 20);
    sleep(1000);
  }
}
function fight() {
  p = className("android.widget.TextView").text("MAIN").findOne(5000);
  if (p) {
    p.click();
    p = text("EMPTY SLOT").findOne(1000);
    if (p) {
      p = className("android.widget.Image").text("Fight icon").findOne(1000);
      if (p) {
        p.parent().click();
        p = className("android.widget.Button").text("START").findOne(10000);
        if (p) {
          p.click();
          p = className("android.widget.Button")
            .text("FIGHT")
            .findOne(2 * 60 * 1000);
          if (p) {
            let img, imgDest, rt;
            for (let i = 0; i < 60; i++) {
              imgDest = images.read("/sdcard/Pictures/back.png");
              img = captureScreen();
              rt = images.matchTemplate(img, imgDest, {
                threshold: 0.7,
                max: 1,
              });
              if (rt && rt.matches.length > 0) {
                break;
              }
              sleep(1000);
            }
            if (rt && rt.matches.length > 0) {
              log("found back");
              press(rt.matches[0].point.x + 40, rt.matches[0].point.y + 40, 10);
            } else {
              log("not found back");
            }
          }
        }
      }
    }
  }
}

function start() {
  app.openUrl(addr);
  p = className("android.widget.TextView")
    .text("MAIN")
    .findOne(60 * 1000);
  if (!p) {
    log("no wait");
    return;
  }
  try {
    earn();
    fight();
    checkIn();
  } catch (e) {
    console.log(e);
  }
}
module.exports = { start };
// start();
// start();
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }
// fight();

// earn();

// p = className("android.widget.Button").textMatches(reg).findOne(1000);
// p = className("android.widget.Button")
//   .text("EARN $CORNIO FARM FOR 3 HOURS")
//   .findOne(1000);
// log(p);
