let addr = "https://t.me/tapcoinsbot/app?startapp=ref_hDfc3Y";
const utils = require("/sdcard/sc/utils.js");
function taptap() {
  let p = className("android.widget.TextView").text("TAP").findOne(1000);
  if (p) {
    p.parent().click();
    sleep(1000);
    const x = 240,
      y = (361 + 842) / 2;
    for (let i = 0; i < 1000; i++) {
      if (i % 50 == 0) {
        let countFiled = textMatches(/\d+\/\d+/).findOne(1000);
        if (countFiled) {
          let count = countFiled.text().split("/")[0];
          if (count <= 20) {
            break;
          }
        } else {
          break;
        }
      }
      utils.randomPress(x, y);
      sleep(20);
    }
  }
  sleep(1000);
}
function refull(which) {
  let p = className("android.widget.TextView").text("Boosts").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    let turbo = className("android.widget.TextView").text(which).findOne(3000);
    if (turbo) {
      let countFiled = turbo.parent().findOne(textMatches(/\d+\/\d+.*/));
      if (countFiled) {
        let count = countFiled.text().split("/")[0];
        if (count > 0) {
          turbo.parent().click();
          sleep(1000);
          let use = className("android.widget.TextView")
            .text("Use")
            .findOne(3000);
          if (use) {
            use.click();
            sleep(1000);
          }
        }
      }
    }
  }
}
function checkIn() {
  let p = className("android.widget.TextView").text("TAP").findOne(1000);
  if (p) {
    p.parent().click();
    sleep(1000);
    p = className("android.widget.TextView").text("Daily Login").findOne(1000);
    if (p) {
      p.click();
      sleep(1000);
      p = className("android.widget.TextView").text("Claim").findOne(1000);
      if (p) {
        p.click();
        sleep(1000);
        p = className("android.widget.TextView").text("TapCoins").findOne(1000);
        if (p) {
          p.click();
          sleep(1000);
          className("android.widget.TextView")
            .text("Claim")
            .clickable(true)
            .findOne(1000)
            .click();
        }
      }
    }
  }
}
function clickAds() {
  let ps = text("300,0001").untilFind();
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i];
    let bounds = p.bounds();
    p.click();
    sleep(2000);
    p = className("android.widget.TextView").text("Watch").findOne(5000);
    if (p) {
      log("click watch");
      p.click();
      sleep(3000);
      press(32, 65, 50);
      sleep(3000);
      p = utils.findWidgetInSize(445 - 423, 321 - 296, 1000);
      if (p) {
        p.click();
        sleep(1000);
      }
    }
    //   utils.randomPress(bounds.centerX(), bounds.centerY());
    //   sleep(1000);
  }
}
function start() {
  app.openUrl(addr);
  let reg = /(Daily Login)/;
  let p = textMatches(reg).findOne(50 * 1000);
  if (!p) {
    log("no wait");
    return false;
  }
  try {
    let reg = /(Thank You)|(GO)/;
    p = textMatches(reg).findOne(3000);
    if (p) {
      p.click();
      sleep(1000);
    }
    taptap();
    refull("Turbo");
    refull("Full Energy");
    taptap();
    checkIn();
  } catch (e) {
    log(e);
  }
}
function findTarget(target) {
  if (textContains(target).findOne(1000)) {
    ps = textContains(target).untilFind();
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i];
      log(p.text());
    }
  }
}
// module.exports = { start };
// start();

function upgrade(level, next, wait) {
  let reg = /lvl \d+/;
  let p = textMatches(reg).findOne(1000);
  let lastTime = 0;
  if (p) {
    let ignore = [];
    do {
      found = false;
      // log("start find");
      ps = className("android.widget.TextView").textMatches(reg).untilFind();
      // log("start", ps.length);
      for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        let lvl = p.text().split(" ")[1];
        if (ignore.includes(i)) {
          continue;
        }
        try {
          // log("check", i, lvl);
          if (lvl < level) {
            p.parent().click();
            sleep(1000);
            p = text(next).findOne(2000);
            let sleepTime = wait + 1000 - (Date.now() - lastTime);
            sleep(Math.max(sleepTime, 0));
            // log("sleep", Math.max(sleepTime, 0), sleepTime);
            p.click();
            log("ok", i, lvl);
            found = true;
            lastTime = new Date().getTime();
            sleep(2000);
            break;
          } else {
            ignore.push(i);
          }
        } catch (e) {
          ignore.push(i);
          log("cant upgrade continue", i);
          // log(e);
        }
      }
    } while (found);
  }
}
upgrade(10, "Go ahead", 10 * 1000);

function upgradeCard(panelName, cardName) {
  let p = text(panelName).findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    p = text(cardName).findOne(1000);
    if (p) {
      p.click();
      sleep(1000);
    }
  }
}
// upgradeCard("Blockchain", "TON");
// function upgrade() {
//   let reg = /lvl \d+/;
//   let p = textMatches(reg).findOne(1000);
//   if (p) {
//     ps = textMatches(reg).untilFind();
//     for (let i = 0; i < ps.length; i++) {
//       let p = ps[i];
//       let lvl = p.text().split(" ")[1];
//       if (lvl < 5) {
//         p.parent().click();
//         text("Go ahead").findOne(2000).click();
//         sleep(10 * 1000);
//       }
//     }
//   }
// }
// upgrade();
// taptap();
// taptap();
// checkIn();
// clickAds();
