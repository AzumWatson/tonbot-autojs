let addr = "https://t.me/NotBoredPuppies_bot?start=r_1000710062";
function randomPress(x) {
  return x + Math.random() * 60 - 30;
}
function taptap() {
  p = className("android.view.View")
    .descMatches(/(Tap Tap)|(Tap glow Tap)/)
    .findOne(5000);
  if (p) {
    log("tap tap");
    p.click();
    cx = className("android.widget.FrameLayout")
      .findOne(100)
      .bounds()
      .centerX();
    cy = className("android.widget.FrameLayout")
      .findOne(100)
      .bounds()
      .centerY();
    for (i = 0; i < 1000; i++) {
      press(randomPress(cx), randomPress(cy), 50);
      sleep(50);
      if (i % 10 == 0) {
        p = textMatches(/\d+\//).findOne(100);
        if (!p) break;
        t = p.text().split("/");
        if (t[0] < 50) break;
      }
    }
  }
}
function spin() {
  let p = className("android.widget.Button").text("Spin").findOne(100);
  if (p) {
    p.click();
    p = className("android.widget.Button")
      .text("Activate bonus")
      .findOne(10000);
    if (p) {
      p.click();
      p = className("android.widget.Button")
        .clickable(true)
        .depth(6)
        .findOne(2000);
      if (p) p.click();
    }
  }
}
function start() {
  app.openUrl(addr);
  p = className("android.widget.Button")
    .textContains("Start Now")
    .visibleToUser(true)
    .findOne(10 * 1000);
  if (p) {
    p.click();
    sleep(2000);

    p = className("android.view.View")
      .desc("Airdrop Airdrop")
      .findOne(30 * 1000); //load
    if (p) {
      spin();
      log("air drop");
      press(220, 270, 20);
      p = className("android.widget.Button").depth(14).findOne(2000);
      if (p) {
        p.click();
      }
    } else {
      return;
    }
    taptap();

    p = className("android.view.View").desc("Boost Boost").findOne(100);
    if (p) {
      log("boost");
      p.click();
      p = className("android.view.View")
        .textContains("Full tank")
        .findOne(5000);
      if (p) {
        txt = p.text().split(" ");
        txt = txt[2].split("/");
        if (txt[0] != "0") {
          p.click();
        }
      }
      p = className("android.view.View")
        .textContains("Tapping guru")
        .findOne(5000);
      if (p) {
        txt = p.text().split(" ");
        txt = txt[2].split("/");
        if (txt[0] != "0") {
          p.click();
          p = text("Get it!").findOne(500);
          if (p) p.click();
        }
      }
      sleep(2000);
      taptap();
    }
  }
}

module.exports = { start };
start();
// spin();
