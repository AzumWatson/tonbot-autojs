function start() {
  app.openUrl("https://t.me/PinGo_MiniBot/join?startapp=25Y1MGOM");
  p = className("android.widget.TextView")
    .text("Home")
    .findOne(30 * 1000);
  if (!p) {
    log("pingo not found");
    return;
  }
  p = className("android.widget.TextView").text("Tasks").findOne(2000);
  if (p) {
    press(p.bounds().centerX(), p.bounds().centerY(), 20);
    sleep(2000);
    p = className("android.widget.Button").text("Check-in").findOne(3000);
    if (p) {
      p.click();
      sleep(2000);
      click(238, 838);
      sleep(2000);
    }
  }
}
module.exports = { start };
// start();
// p = className("android.widget.TextView").text("Tasks").findOne(2000);
// if (p) {
//   press(p.bounds().centerX(), p.bounds().centerY(), 20);
//   sleep(2000);
//   p = className("android.widget.Button").text("Check-in").findOne(3000);
//   if (p) {
//     p.click();
//     sleep(2000);
//     click(238, 838);
//     sleep(2000);
//   }
// }
