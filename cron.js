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
            .findOne(60 * 1000);
          if (p) {
            let img, imgDest, rt;
            imgDest = images.read("/mnt/windows/Pictures/snow.png");
            img = captureScreen();
            rt = images.matchTemplate(img, imgDest, {
              threshold: 0.7,
              max: 1,
            });
            if (rt && rt.matches.length > 0) {
              press(rt.matches[0].point.x + 40, rt.matches[0].point.y + 40, 10);
            }
          }
        }
      }
    }
  }
}

function start() {
  // app.openUrl(addr);
  p = className("android.widget.TextView")
    .text("MAIN")
    .findOne(60 * 1000);
  if (p) {
    p.click();
    sleep(1000);
  }
  p = className("android.widget.Button")
    .textContains("COLLECT YOUR EARNED")
    .findOne(1000);
  if (p) {
    p.click();
    p = className("android.widget.Button")
      .textContains("EARN $CORNIO")
      .findOne(5000);
    if (p) p.click();
    p = className("android.widget.Button").text("CLOSE").findOne(3000);
    if (p) p.click();
  }

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
  fight();
  checkIn();
}
module.exports = { start };
// start();
// start();
// fight();
