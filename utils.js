function captureAndOcr(offsetX, offsetY, level) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  level = level || 2;
  capturing = true;

  let img = captureScreen();
  if (!img) {
    toastLog("截图失败");
  }
  let start = new Date();
  img = images.clip(
    img,
    offsetX,
    offsetY,
    img.width - offsetX,
    img.height - offsetY
  );
  //结果转数组：层级：3
  result = gmlkit.ocr(img, "la").toArray(level);
  for (let i = 0; i < result.length; i++) {
    result[i].bounds.top = result[i].bounds.top + offsetY;
    result[i].bounds.left = result[i].bounds.left + offsetX;
    result[i].bounds.bottom = result[i].bounds.bottom + offsetY;
    result[i].bounds.right = result[i].bounds.right + offsetX;
  }
  capturing = false;
  img.recycle();
  return result;
}
function ocrBound(dest, timeOut) {
  timeOut = timeOut || 10;
  const startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    re = captureAndOcr();
    for (let i = 0; i < re.length; i++) {
      if (re[i].text.includes(dest)) {
        return re[i].bounds;
      }
    }
    sleep(10);
  }

  return null;
}

function ocrMatches(dest, timeOut, level, offsetX, offsetY) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  level = level || 2;
  timeOut = timeOut || 10;
  const startTime = Date.now();
  let result = [];
  while (Date.now() - startTime < timeOut && result.length == 0) {
    re = captureAndOcr(offsetX, offsetY, level);
    for (let i = 0; i < re.length; i++) {
      if (dest.test(re[i].text)) {
        result.push({ bounds: re[i].bounds, text: re[i].text });
      }
    }
    sleep(100);
  }
  return result;
}

function checkWidget(x0, y0, x1, y1) {
  ps = boundsInside(x0, y0, x1, y1).untilFind();
  for (let i = 0; i < ps.length; i++) {
    log(
      ps[i].bounds().width(),
      ps[i].bounds().height(),
      ps[i].className(),
      ps[i].bounds(),
      ps[i].text(),
      ps[i].desc()
    );
  }
}

function randP(x, offset) {
  return x + Math.random() * offset * 2 - offset;
}
function randomPress(x, y, offset, delay) {
  offset = offset || 30;
  delay = delay || 20;
  return press(randP(x, offset), randP(y, offset), delay);
}

function findWidgetInSize(cname, width, height, timeOut) {
  let startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    if (className(cname).exists()) {
      let ps = className(cname).untilFind();
      for (let i = ps.length; i > 0; i--) {
        let p = ps[i - 1];
        let bounds = p.bounds();
        if (bounds.width() == width && bounds.height() == height) {
          return p;
        }
      }
      sleep;
    }
  }
  return null;
}
function findWidgetInSizeAll(name, width, height, timeOut) {
  let startTime = Date.now();
  let result = [];
  while (Date.now() - startTime < timeOut && result.length == 0) {
    if (className(name).exists()) {
      let ps = className(name).untilFind();
      log(ps.length);
      for (let i = ps.length; i > 0; i--) {
        let p = ps[i - 1];
        let bounds = p.bounds();
        if (bounds.width() == width)
          log(bounds, bounds.width(), bounds.height());
        if (bounds.width() == width && bounds.height() == height) {
          result.push(p);
        }
      }
      sleep;
    }
  }
  return result;
}

function screenFindTemplate(
  template,
  timeOut,
  offsetX,
  offsetY,
  threshold,
  max
) {
  threshold = threshold || 0.7;
  max = max || 1;
  const startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    let img = captureScreen();
    img = images.clip(
      img,
      offsetX,
      offsetY,
      img.width - offsetX,
      img.height - offsetY
    );
    let rt = images.matchTemplate(img, template, {
      threshold,
      max,
    });
    log(rt);
    if (rt && rt.matches.length > 0) {
      let point = rt.matches[0].point;
      return { x: point.x + offsetX, y: point.y + offsetY };
    }
    sleep(100);
  }
  return null;
}

if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

function upgrade(level, next, wait) {
  let reg = /lvl \d+/;
  let p = textMatches(reg).findOne(1000);
  let lastTime = 0;
  if (p) {
    let ignore = [];
    do {
      found = false;
      log("start find");
      ps = className("android.widget.TextView").textMatches(reg).untilFind();
      // log("start", ps.length);
      for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        let lvl = p.text().split(" ")[1];
        // if (ignore.includes(i)) {
        //   continue;
        // }
        try {
          // log("check", p.text());
          // for (let q = 0; q < p.parent().childCount(); q++) {
          //   log(p.parent().child(q).text());
          // }
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
            sleep(3000);
            continue;
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

let originalClassName = global.className;
function newClassName(name) {
  if (device.board === "lei" && name === "android.widget.TextView") {
    name = "android.view.View";
  }
  return originalClassName(name);
}
global.className = newClassName;

//mount pictures
if (!files.exists("/mnt/windows/Picturdes/")) {
  log("mount pictures");
  shell("mkdir /mnt/windows", true);
  shell("chmod 755 /mnt/windows", true);
  shell("ln -s /sdcard/Pictures /mnt/windows/Pictures", true);
}
module.exports = {
  captureAndOcr,
  ocrBound,
  ocrMatches,
  checkWidget,
  randomPress,
  findWidgetInSize,
  findWidgetInSizeAll,
  screenFindTemplate,
  upgrade,
  upgradeCard,
};
