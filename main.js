const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let win;
let tray;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 700,
    title: "Messenger",
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      partition: "persist:messenger",
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL("https://www.messenger.com");
}

app.whenReady().then(() => {
  createWindow();

  tray = new Tray(path.join(__dirname, 'icon.ico'));
  tray.setToolTip('Messenger');

  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Messenger', click: () => win.show() },
    { label: 'Quit', click: () => app.exit() }
  ]));
});