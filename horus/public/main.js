const electron = require(‘electron’);
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680
  });

  mainWindow.loadURL('http://localhost:3000');
  app.setAboutPanelOptions({
    applicationName: 'Horus',
    applicationVersion: '0.0 .1',
  })
  mainWindow.on('closed', () => mainWindow = null);
}

/**
 * ready: Runs when Electron has finished initializing.
 * In the code, this will run createWindow, which creates a browser window
 * with React’s local URL, http://localhost:3000, and sets the about panel
 * and the mainWindow to null on close.
 */
app.on('ready', createWindow);

/**
 * activate: Runs when the application is activated.
 * We’ll want to call the createWindow function to create a new window.
 */
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * window-all-closed: Emitted when all windows have been closed.
 * This will close the app on all platforms, except Mac,
 * which will only close the window but will explicitly require
 * the user to quit the program.
 * */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});