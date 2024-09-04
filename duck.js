let addr = "https://t.me/duckscoop_bot/app?startapp=A9tkeRQY1u";
function checkIn() {
  p = textMatches(/Check-in/).findOne(1000);
  if (p) {
    p.click();
    sleep(2000);
    p = className("android.widget.Button")
      .boundsInside(10, 860, 480, 960)
      .text("Check-in")
      .findOne(2000);
    if (p) {
      p.click();
      sleep(2000);
      closeButton();
    }
  }
}
function closeButton() {
  p = className("android.widget.Button").clickable(true).findOne(100);
  if (p) {
    ps = className("android.widget.Button").clickable(true).untilFind();
    for (let i = 0; i < ps.length; i++) {
      p = ps[i];
      if (p.bounds().height() == 22 && p.bounds().width() == 20) {
        p.click();
        sleep(1000);
        return;
      }
    }
  }
}

function start() {
  app.openUrl(addr);
  p = textContains("Check-in").findOne(30 * 1000);
  if (!p) return;

  closeButton();
  checkIn();
}

module.exports = { start };
// start();
