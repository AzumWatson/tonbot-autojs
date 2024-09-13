let addr = "https://t.me/DuckChain_bot/quack?startapp=gqTXhV4M";
function start() {
  app.openUrl(addr);
  p = className("android.widget.TextView")
    .text("Home")
    .findOne(60 * 1000);
  if (p) {
    p = className("android.widget.TextView").text("Quests").findOne(2000);
    if (p) {
      p.click();
      p = className("android.widget.Button").text("GO").findOne(5000);
      if (p) {
        log("click go");
        p.click();
        sleep(5000);
      }
    }
  }
}

module.exports = { start };
// start();
//
