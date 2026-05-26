'use strict';

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const isMac = process.platform === 'darwin';
const appRoot = path.resolve(__dirname, '..');
const offlineHtml = path.join(appRoot, 'Offline', 'tofupass-offline.html');
const offlineUrl = pathToFileURL(offlineHtml).href;

function createWindow() {
  const win = new BrowserWindow({
    title: 'TofuPass',
    width: 940,
    height: 720,
    minWidth: 390,
    minHeight: 620,
    backgroundColor: '#1A1412',
    autoHideMenuBar: true,
    icon: path.join(appRoot, process.platform === 'win32' ? 'favicon.ico' : 'tofu.png'),
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      devTools: !app.isPackaged,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  win.loadFile(offlineHtml, {
    query: { shell: 'desktop' },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith(offlineUrl)) return;
    event.preventDefault();
    openExternalUrl(url);
  });

  return win;
}

function openExternalUrl(url) {
  if (/^https?:\/\//i.test(url)) {
    shell.openExternal(url);
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
