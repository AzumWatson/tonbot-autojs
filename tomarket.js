let addr = "https://t.me/Tomarket_ai_bot/app?startapp=0000gW9c";
function start() {
  app.openUrl(addr);
  reg = /(continue)|(Start farming)|(Play now)/;
  p = textMatches(reg).findOne(60 * 1000);
  if (!p) {
    log("no wait");
    return;
  }
  if (p.text() == "continue") {
    p.click();
    sleep(1000);
  }

  try {
    reg = /(Start farming)|(Harvest)/;
    do {
      p = textMatches(reg).findOne(5000);
      if (p) {
        p.click();
        log("click", p.text());
        sleep(5000);
      }
    } while (!p);
  } catch (e) {}
}

module.exports = { start };
// start();
