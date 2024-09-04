let addr = "https://t.me/BlumCryptoBot/app?startapp=ref_V7Ystpy2Bm";
function play() {
  p = className("android.widget.TextView").text("Play").findOne(1000);
  if (p) {
    p.click();
    sleep(500);
  } else {
    return;
  }

  let img, imgDest, rt;
  imgDest = images.read("/mnt/windows/Pictures/snow.png");
  for (let j = 0; j < 1000; j++) {
    img = captureScreen();
    rt = images.matchTemplate(img, imgDest, {
      threshold: 0.7,
      max: 5,
    });
    for (let i = 0; i < rt.matches.length; i++) {
      press(rt.matches[i].point.x + 20, rt.matches[i].point.y + 40, 10);
      // log(rt.matches[i].point.x + 20, rt.matches[i].point.y + 20, i);
    }
    if (j % 10 == 0) {
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
    p = className("android.widget.ImageView").desc("Go back").findOne(30);
    if (p) {
      log(p.bounds());
      p.click();
      sleep(1000);
    }
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
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }

// play();
// press(84, 360, 20);
