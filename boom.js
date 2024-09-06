let addr = "https://t.me/Boom/LoudCoins?startapp=CHUyN3R6NGe59NnvMAm75s";
function start() {
  app.openUrl(addr);
  let reg = /(Claim.*)|(Start)|(.*omplete.*)/;
  p = textMatches(reg)
    .visibleToUser(true)
    .findOne(50 * 1000);
  if (!p) {
    log("未找到按钮");
    return;
  }
  for (i = 0; i < 10; i++) {
    p = visibleToUser(true).textMatches(reg).findOne(1000);
    if (p) {
      log("点击", p.text());
      if (p.text() == "Complete") {
        p = className("android.widget.Image").text("times").findOne(100);
        if (p) {
          p.click();
          sleep(1000);
        }
      } else {
        p.click();
        sleep(1000);
      }
    }
  }
}
function doTask(name, widget) {
  widget = widget || "android.widget.Button";
  if (className(widget).text(name).exists()) {
    p = className(widget).text(name).click();
    log(p.length);
  }
}
function doTaskAll() {
  doTask("START");
  sleep(16 * 1000);
  doTask("CLAIM");
}
module.exports = { start };
// doTask("CLAIM");

// start();
// left = 414;
// top = 345;
// right = 475;
// botton = 404;
// ps = boundsInside(left, top, right, botton).untilFind();
// for (i = 0; i < ps.length; i++) {
//   log(ps[i].text(), ps[i].bounds(), ps[i].desc(), ps[i].className());
// }
// p = text("times")
// p = className("android.widget.Image").text("times").findOne(100);
// if (p) {
//   p.click();
//   sleep(1000);
// }
