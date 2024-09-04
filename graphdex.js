let addr = "https://t.me/graph_dex_bot?start=1000710062";

function floki() {
  p = className("android.widget.Button").textContains("Floki").findOne(5000);
  if (p) {
    log("claim Floki");
    p.click();

    p = className("android.widget.CheckBox")
      .textContains("I accept")
      .findOne(5000);
    if (p) {
      p.click();
      p = className("android.widget.TextView").text("Go").findOne(200);
      if (p) p.click();
    }

    p = className("android.widget.Button").textContains("Claim").findOne(5000);
    if (p) p.click();
    p = className("android.widget.Button")
      .textContains("Start farming")
      .findOne(5000);
    if (p) p.click();
  }
}

function start() {
  app.openUrl(addr);
  p = className("android.widget.Button")
    .textContains("Play")
    .visibleToUser(true)
    .findOne(5 * 1000);
  if (p) {
    p.click();
    sleep(2000);

    p = className("android.view.View")
      .desc("Farm")
      .findOne(10 * 1000);
    if (p) {
      log("farm dex");
      p.click();
      sleep(2000);
      p = className("android.widget.Button")
        .textContains("Claim")
        .findOne(5000);
      if (p) p.click();
      p = className("android.widget.Button")
        .textContains("Start farming")
        .findOne(5 * 1000);
      if (p) p.click();
    }

    p = className("android.view.View")
      .desc("AirDrops")
      .findOne(10 * 1000);
    if (p) {
      log("air drop");
      p.click();
      // floki()
    }
  } else {
    log("not found ");
  }
}

module.exports = { start };
// start();
