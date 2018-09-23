const {
  app,
  BrowserWindow
} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680
  });
  // Lozd the index.html of the app.
  mainWindow.loadURL(isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  );

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

/**
 * activate: Runs when the application is activated.
 * We’ll want to call the createWindow function to create a new window.
 */
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});