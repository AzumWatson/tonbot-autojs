let addr = "https://t.me/OKX_official_bot/OKX_Racer?startapp=linkCode_55034885";
function start() {
  app.openUrl(addr);
  p = className("android.widget.Button")
    .textContains("上涨")
    .findOne(40 * 1000);
  if (!p) return;
  p = className("android.widget.Button").textContains("继续游戏").findOne(100);
  if (p) {
    p.click();
    sleep(1000);
  }

  let reg = /\d+ \/ \d+/;
  do {
    p = className("android.widget.TextView").textMatches(reg).findOne(1000);
    if (!p) break;
    count = parseInt(p.text().split("/")[0]);
    if (count > 0) {
      p = className("android.widget.Button").textContains("上涨").findOne(100);
      if (p) {
        p.click();
        sleep(9000);
      }
    }
  } while (count > 0);
}

module.exports = { start };
// start();
// p = className("android.widget.Button").textContains("继续游戏").findOne(100);
