if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

for (let i = 0; i < 5; i++) {
  img = images.captureScreen();
  img.saveTo("/sdcard/test" + i + ".png");
  log(Date.now());
  //显示当前毫秒数
}
