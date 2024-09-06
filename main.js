// let currentEngine = engines.myEngine();
// let runningEngines = engines.all();
// let currentSource = currentEngine.getSource() + "";
// if (runningEngines.length > 1) {
//   runningEngines.forEach((compareEngine) => {
//     let compareSource = compareEngine.getSource() + "";
//     if (
//       currentEngine.id !== compareEngine.id &&
//       compareSource === currentSource
//     ) {
//       // 强制关闭同名的脚本
//       compareEngine.forceStop();
//     }
//   });
// }
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

prefix = "/sdcard/sc/";
tasks = [
  {
    name: "netcoin",
    task: require(prefix + "netcoin.js"),
    interval: 0,
  },
  {
    name: "banana",
    task: require(prefix + "banana.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "bby",
    task: require(prefix + "bby.js"),
    interval: 1 * 60 * 60 * 1000,
  },

  {
    name: "blum",
    task: require(prefix + "blum.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "boom",
    task: require(prefix + "boom.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "cron",
    task: require(prefix + "cron.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "duck",
    task: require(prefix + "duck.js"),
    interval: 8 * 60 * 60 * 1000,
  },
  {
    name: "duckChain",
    task: require(prefix + "duckChain.js"),
    interval: 8 * 60 * 60 * 1000,
  },
  {
    name: "else",
    task: require(prefix + "else.js"),
    interval: 45 * 60 * 1000,
  },
  {
    name: "faston",
    task: require(prefix + "faston.js"),
    interval: 45 * 60 * 1000,
  },
  {
    name: "goat",
    task: require(prefix + "goat.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "graphdex",
    task: require(prefix + "graphdex.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "hamasterKombat",
    task: require(prefix + "hamasterKombat.js"),
    interval: 30 * 60 * 1000,
  },
  {
    name: "hexn",
    task: require(prefix + "hexn.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "lovely",
    task: require(prefix + "lovely.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  {
    name: "not",
    task: require(prefix + "not.js"),
    interval: 1 * 60 * 60 * 1000, //107912
  },
  {
    name: "okx",
    task: require(prefix + "okx.js"),
    interval: 40 * 60 * 1000, //107912
  },
  {
    name: "pingo",
    task: require(prefix + "pingo.js"),
    interval: 12 * 60 * 60 * 1000,
  },
  {
    name: "tomarket",
    task: require(prefix + "tomarket.js"),
    interval: 1 * 60 * 60 * 1000,
  },
  // {
  //   name: "sidekick",
  //   task: require(prefix + "sidekick.js"),
  //   interval: 15 * 60 * 1000,
  // },
  {
    name: "tabi",
    task: require(prefix + "tabi.js"),
    interval: 1 * 60 * 60 * 1000,
  },
];

function TaskScheduler() {
  this.tasks = []; // 存储所有任务
  this.defaultTask = null; // 默认任务
  this.isRunning = false; // 是否正在运行
}

// 添加任务
TaskScheduler.prototype.addTask = function (el) {
  this.tasks.push({
    name: el.name,
    task: el.task,
    interval: el.interval,

    lastExecuted: 0, // 记录上次执行时间
  });
};

// 设置默认任务
TaskScheduler.prototype.setDefaultTask = function (task) {
  this.defaultTask = task;
};

// 启动调度
TaskScheduler.prototype.start = function () {
  this.isRunning = true;
  this.schedule();
};

// 停止调度
TaskScheduler.prototype.stop = function () {
  this.isRunning = false;
};

// 调度函数
TaskScheduler.prototype.schedule = function () {
  var self = this;

  function runTasks() {
    var currentTime = Date.now();
    var hasExecuted = false;

    // 遍历所有任务
    for (var i = 0; i < self.tasks.length; i++) {
      var taskInfo = self.tasks[i];

      // 检查任务是否到达执行时间
      if (currentTime - taskInfo.lastExecuted >= taskInfo.interval) {
        taskInfo.lastExecuted = currentTime; // 更新上次执行时间
        hasExecuted = true; // 标记有任务执行
        log("start", taskInfo.name);
        taskInfo.task.start(); // 执行任务
        sleep(1000);
        while (
          className("android.widget.ImageView").desc("Go back").findOne(2000)
        ) {
          let b = className("android.widget.ImageView")
            .desc("Go back")
            .findOne(100);
          if (b) {
            b.click();
            b = className("android.widget.TextView")
              .text("Close anyway")
              .findOne(1000);
            if (b) {
              b.click();
              sleep(1000);
            }
          }
        }
      }
    }

    // 如果没有任务执行，则执行默认任务
    if (!hasExecuted && self.defaultTask) {
      log("start", self.defaultTask.name);
      self.defaultTask.task.start();
      let b = className("android.widget.ImageView")
        .desc("Go back")
        .findOne(100);
      if (b) b.click();
      sleep(100);
      b = className("android.widget.TextView")
        .text("Close anyway")
        .findOne(100);
      if (b) b.click();
    }

    // 如果调度器仍在运行，继续调度
    if (self.isRunning) {
      setTimeout(runTasks, 1000); // 每100毫秒检查一次
    }
  }

  runTasks(); // 开始执行任务
};

// 示例用法
var scheduler = new TaskScheduler();

// 添加任务
for (i = 1; i < tasks.length; i++) {
  scheduler.addTask(tasks[i]);
}
// 设置默认任务
scheduler.setDefaultTask(tasks[0]);

// 启动调度
scheduler.start();
