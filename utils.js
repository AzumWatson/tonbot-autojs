function captureAndOcr() {
  capturing = true;

  let img = captureScreen();
  if (!img) {
    toastLog("截图失败");
  }
  let start = new Date();
  //结果转数组：层级：3
  result = gmlkit.ocr(img, "la").toArray(2);
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

module.exports = { captureAndOcr, ocrBound, checkWidget, randomPress };
