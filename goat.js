let addr =
  "https://t.me/realgoats_bot/run?startapp=1a5baf8b-b6d1-4b7d-ae0e-bf2cbf3bf0ff";
function checkIn() {
  try {
    text("Daily\nCheck-in").findOne(1000).click();
    textContains("Day").enabled(true).findOne(5000).click();
    sleep(20);
  } catch (e) {
    log(e);
  }
}
function start() {
  app.openUrl(addr);
  checkIn();
}
module.exports = { start };
// start();
// checkIn();
