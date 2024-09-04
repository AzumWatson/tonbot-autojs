let addr = "https://t.me/bountybay_bot/deals?startapp=invite-3ba59fae";

function tapToEarn() {
  p = textMatches(/Tap-to-earn/).findOne(1000);
  if (p) {
    p.click();
  }
}
function start() {
  app.openUrl(addr);
  let reg = /(Continue)|(Deals)/;
  let p = textMatches(reg).findOne(60 * 1000);
  if (p) {
    log(p.text());
    p.click();
    sleep(1000);
  }
  reg = /(Claim.*)|(Start Daily Farming)/;
  do {
    p = textMatches(reg).findOne(5000);
    if (p) {
      p.click();
      sleep(1000);
      log(p.text());
    }
  } while (p);

  // //check-in
  // p = className("android.widget.TextView").text("Earn").findOne(100);
  // if (p) {
  //   p.parent().click();
  // }
}
module.exports = { start };
// start();
