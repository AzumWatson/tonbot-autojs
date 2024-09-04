function randomPress(x) {
  return x + Math.random() * 60 - 30;
}

function start() {
  app.openUrl("https://t.me/sidekick_fans_bot/sidekick");

  p = className("android.widget.TextView")
    .text("Leaderboard")
    .findOne(60 * 1000);
  if (!p) return;
  for (let i = 0; i < 2; i++) {
    swipe(250, 220, 220, 800, 200);
    sleep(1000);
  }

  for (let i = 0; i < 1000; i++) {
    click(randomPress(238), randomPress(538));
  }
}
module.exports = { start };
// start();
