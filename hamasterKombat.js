const utils = require("/sdcard/sc/utils");
const addr = "https://t.me/hamster_kombat_Bot/start?startapp=kentId1000710062";

function taptap() {
  const button = className("android.widget.Button")
    .text("Hamster Kombat")
    .findOne(1000);
  sleep(2000);
  for (var i = 0; i < 2000; i++) {
    if (i % 50 == 0) {
      let p = textMatches(/\d+.*\/.*\d+00/)
        .findOne(100)
        .text();
      let count = parseInt(p.split("/")[0]);
      if (count < 20) {
        break;
      }
    }
    utils.randomPress(button.bounds().centerX(), button.bounds().centerY(), 20);
    sleep(50);
  }
}
function checkIn() {
  className("android.view.View").desc("Exchange").findOne(1000).click();
  className("android.widget.Image")
    .text("daily_reward")
    .findOne(5000)
    .parent()
    .parent()
    .click();

  daily = className("android.widget.TextView")
    .text("Daily reward")
    .findOne(1000);
  if (daily.parent().child(2).bounds().width() > 20) {
    daily.parent().click();
    p = className("android.widget.Button").text("Claim").findOne(5000);
    if (p) {
      p.click();
      sleep(6000);
    }
    Back();
    sleep(1000);
  }
}
function refull() {
  text("Boost").findOne(1000).click();
  sleep(3000);
  className("android.widget.TextView")
    .text("Full energy")
    .findOne(5000)
    .parent()
    .click();
  p = className("android.widget.Button").text("Go ahead").findOne(5000);
  if (p) {
    p.click();
    sleep(3000);
    taptap();
  } else {
    className("android.widget.ImageView").desc("Go back").findOne(1000).click();
  }
}
function start() {
  app.openUrl(addr);
  p = textMatches("/(d+.*/.*d+00)|(Claim)|(.*Thank you.*)/").findOne(60 * 1000);
  if (!p) {
    log("not wait");
    return;
  }
  sleep(1000);
  try {
    count = 0;
    reg = /(Claim)|(Close)|(Thank you.*)/;
    while (textMatches(reg).exists() && count < 10) {
      textMatches(reg).findOne().click();
      sleep(2000);
      count++;
    }
    taptap();
    refull();
    checkIn();
    games();
  } catch (e) {
    console.log(e);
  }
}
function morse(input) {
  const morse = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  let output = [];
  for (let i = 0; i < input.length; i++) {
    let index = input[i].charCodeAt(0) - 97;
    output.push(morse[index]);
  }
  return output;
}

function sendKey(key) {
  const start = Date.now();
  for (let i = 0; i < key.length; i++) {
    if (key[i] == ".") {
      // sleep(50);
      utils.randomPress(160, 760, 1, 80);
    } else {
      swipe(160, 760, 170, 760, 1000);
    }
    sleep(400);
  }
}
function cipher(input) {
  let key = morse(input);
  // key = ["..---", "—....", "-----", "----.", "..---", "....-"];
  log(key);
  for (let i = 0; i < key.length; i++) {
    log(input[i], key[i]);
    sendKey(key[i]);
    sleep(2200);
  }
}

const sites = [
  { site: "hide-ball", name: "hide-ball" },
  { site: "bouncemasters", name: "bouncemasters" },
  { site: "stone-age", name: "stone-age" },
  { site: "fluff-crusade", name: "fluff-crusade" },
  { site: "tile-trio", name: "tile-trio" },
  { site: "mow-and-trim", name: "mow-and-trim-2" },
  { site: "train-miner", name: "train-miner-keys-generator" },
  { site: "chain-cube-2048", name: "chain-cube-2048" },
  { site: "merge-away", name: "merge-away-key-generator" },
  { site: "zoopolis", name: "zoopolis" },
  { site: "twerk-race", name: "twerk-race-key-generator" },
  { site: "polysphere", name: "polysphere" },
];

function getSiteKey(siteName) {
  const baseUrl = "http://oc2.027mango.com:3000/getkey";
  const url = `${baseUrl}?sitename=${siteName}`;

  try {
    // 使用 Auto.js 的 http.get 方法进行同步请求
    const response = http.get(url);

    if (response.statusCode != 200) {
      throw new Error(`HTTP 错误! 状态: ${response.statusCode}`);
    }

    const data = JSON.parse(response.body.string());
    return data.key;
  } catch (error) {
    console.error(`获取 ${siteName} 的 key 时出错:`, error);
    return null;
  }
}
// log(getSiteKey("stone-age"));
function fillSite(item) {
  let siteText = item.text().toLowerCase().replace(/ /g, "-");
  const findSite = sites.find((site) => site.site === siteText);
  item.parent().click();
  sleep(1000);
  let runcount = 10;
  let redeem = className("android.widget.Button").text("Redeem").findOne(5000);
  if (!redeem) {
    log("no redeem");
    return;
  }
  do {
    let p = utils.ocrMatches(/\d+\/\d+/, 100, 3);
    if (p) {
      let count = p[0].text.split("/");
      if (count[0] < count[1]) {
        let redeem = className("android.widget.Button").findOne(2000);
        if (redeem) {
          let key = getSiteKey(findSite.name);
          let blank = className("android.widget.EditText").findOne(2000);
          blank.setText(key);
          sleep(1000);
          redeem.click();
          sleep(1000);
          if (text("Claim").findOne(5000)) {
            className("android.widget.Button")
              .text("Claim")
              .findOne(5000)
              .click();
            sleep(1000);
          }
        }
      } else {
        log("no count");
        break;
      }
    }
    runcount--;
  } while (true && runcount > 0);
  className("android.widget.ImageView").desc("Go back").findOne().click();
  sleep(1000);
}
function games() {
  log("games");
  let p = className("android.widget.Image").text("mini_game").findOne(2000);
  if (p) {
    p.parent().parent().click();
    sleep(1000);
  } else {
    log("no mini_game");
    return;
  }
  p = className("android.widget.TextView").text("Games").findOne(3000);
  if (p) {
    p.click();
    sleep(3000);
    let ps = className("android.widget.TextView").untilFind();
    for (let i = 1; i < ps.length; i++) {
      let item = ps[i];
      let siteText = item.text().toLowerCase().replace(/ /g, "-");
      if (sites.some((site) => site.site === siteText)) {
        let countFiled = item
          .parent()
          .findOne(textMatches(/\d+\/\d+/))
          .text()
          .split("/");
        if (countFiled[0] < countFiled[1]) {
          log(siteText, countFiled);
          fillSite(item);
        }
      }
    }
  }
}
function findTarget(targer) {
  p = textContains(targer).findOne(1000);
  if (p) {
    ps = textContains(targer).untilFind();
    for (let i = 0; i < ps.length; i++) {
      log(i, ps[i].text());
    }
  }
}
// findTarget("Legal opinion");
module.exports = { stat };
// start();
// cipher("intrigue");
// utils.upgrade(10, "Go ahead", 3 * 1000);
// for (let i = 0; i < 10; i++) {
//   if ((p = text("New cards").findOne(1000))) {
//     p.click();
//     sleep(3000);
//     utils.upgrade(1, "Go ahead", 3 * 1000);
//     sleep(4000);
//   }
// }
// games();
// let p = utils.ocrMatches(/\d+\/\d+/, 100, 3);
// log(p);
// sendKey("-.-");
// sendKey("-.--");
// sendKey("-.-.");
//, '..', '...', '-', '.', '.-.'
// utils.checkWidget(0, 465, 480, 854); v
// taptap();
// refull();
// p = text("Full energy").findOne(1000);
// log(p);
// checkIn();
// p = className("android.widget.TextView").text("Full energy").findOne(1000);
// log(p);
// games();
// log(device.board);
// log(global.className);
