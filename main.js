// 控制应用程序寿命并创建本机浏览器窗口的模块
const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')

function createWindow() {
  // 创建窗口
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })
  // mainWindow.webContents.openDevTools(); // 开发打开控制台
  // 加载主进程
  mainWindow.loadFile('index.html')
}

// 当Electron完成时将调用此方法
// 初始化并准备创建浏览器窗口
// 有些API仅在此事件发生后才能使用
app.whenReady().then(createWindow)

// 关闭所有窗户后退出
app.on('window-all-closed', function () {
  // 在macOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd + Q明确退出为止
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // 在macOS上，通常会在单击停靠图标且没有其他窗口打开时在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
