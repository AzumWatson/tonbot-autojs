let addr = "https://t.me/BlumCryptoBot/app?startapp=ref_V7Ystpy2Bm";
const utils = require("/sdcard/sc/utils.js");
function play() {
  p = textContains("Play").findOne(1000);
  if (p) {
    p.click();
    sleep(500);
  } else {
    return;
  }

  log("start play");
  let img, imgDest, rt;
  imgDest = images.read("/sdcard/Pictures/snow.png");
  for (let j = 0; j < 5000 * 100; j++) {
    img = captureScreen();
    rt = images.matchTemplate(img, imgDest, {
      threshold: 0.7,
      max: 8,
    });
    for (let i = 0; i < rt.matches.length; i++) {
      press(rt.matches[i].point.x + 20, rt.matches[i].point.y + 40, 10);
      // log(rt.matches[i].point.x + 20, rt.matches[i].point.y + 20, i);
    }
    if (j % 50 == 0) {
      p = textMatches(/(Share you win)|(Play)/).findOne(30);
      if (p) {
        log("exit", p.text());
        break;
      }
    } else {
      sleep(10);
    }
  }
  if (img) img.recycle();
  if (imgDest) imgDest.recycle();
  if (p && p.text() == "Share you win") {
    log("share");
    sleep(1000);
  }
}
function start() {
  app.openUrl(addr);
  p = className("android.widget.Button")
    .textMatches(/(.*Farming.*)|(.*Claim.*)|(.*Continue.*)|(.*Start.*)/)
    .findOne(30 * 1000);
  if (p) {
    count = 0;
    while (p && count < 10) {
      p.click();
      sleep(1000);
      p = className("android.widget.Button")
        .textMatches(/(.*Claim.*)|(.*Continue.*)|(.*Start.*)/)
        .findOne(5000);
      count++;
    }
    // play();
  }
}

module.exports = { start };
// start();
// text("Claim").click();
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }

// press(84, 360, 20);
