let addr =
  "https://t.me/hexn_bot/app?startapp=c9438f68-928b-4e55-8f0f-67ce8d91dd59";
function start() {
  app.openUrl(addr);
  p = text("🚀")
    .visibleToUser(true)
    .findOne(30 * 1000);
  if (!p) return;
  let reg = /(Claim.*)|(Start farming)/;
  do {
    p = textMatches(reg)
      .visibleToUser(true)
      .enabled(true)
      .findOne(2 * 1000);
    if (!p) break;
    p.click();
    sleep(1000);
  } while (true);
  p = text("🚀")
    .visibleToUser(true)
    .findOne(2 * 1000);
  if (p) {
    p.click();
    p = textMatches(/Day.*/)
      .enabled(true)
      .visibleToUser(true)
      .findOne(2 * 1000);
    if (p) p.click();
    p = className("android.widget.Button")
      .bounds(420, 331, 460, 373)
      .findOne(1000);
    if (p) p.click();
  }
}

module.exports = { start };
// start();
//
