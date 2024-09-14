let addr = "https://t.me/theYescoin_bot/Yescoin?startapp=4lHw49";
function start() {
  app.openUrl(addr);
  //   p = text("🚀")
  //     .visibleToUser(true)
  //     .findOne(30 * 1000);
  //   if (!p) return;
  //   let reg = /(Claim.*)|(Start farming)/;
  //   do {
  //     p = textMatches(reg)
  //       .visibleToUser(true)
  //       .enabled(true)
  //       .findOne(2 * 1000);
  //     if (!p) break;
  //     p.click();
  //   } while (true);
  //   p = text("🚀")
  //     .visibleToUser(true)
  //     .findOne(2 * 1000);
  //   if (p) {
  //     p.click();
  //     p = textMatches(/Day.*/)
  //       .enabled(true)
  //       .visibleToUser(true)
  //       .findOne(2 * 1000);
  //     if (p) p.click();
  //   }
}

module.exports = { start };
// start();
