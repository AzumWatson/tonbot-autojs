let addr =
  "https://t.me/realgoats_bot/run?startapp=1a5baf8b-b6d1-4b7d-ae0e-bf2cbf3bf0ff";
function checkIn() {
  swipe(200, 700, 250, 150, 500);
  sleep(2000);
  text("Daily\nCheck-in").findOne(1000).click();
  sleep(9000);
  textContains("Day").enabled(true).findOne(5000).click();
  sleep(20 * 1000);
}
function start() {
  app.openUrl(addr);
  if (!id("tabs-:r1:--tab-0").findOne(45 * 1000)) {
    log("not found");
    return;
  }
  try {
    checkIn();
  } catch (e) {
    log(e);
  }
}
module.exports = { start };
// start();
// checkIn();
// p = textContains("Day").enabled(true).findOne(5000);
// log(p);
