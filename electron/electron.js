const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const datastore = require('./datastore');

let windows = {};

// [ METHODS ]

function createWindow() {
  console.log('[ INFO ] Creating Window')
  // Create the browser window.
  windows.mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    show: false
  });

  BrowserWindow.addDevToolsExtension(
    "C:/Users/jluis/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.4.2_0"
  );
  // Lozd the index.html of the app.
  windows.mainWindow.loadURL(isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  );
  windows.mainWindow.on('closed', () => windows.mainWindow = null);
  /**
   * ready-to-show: While loading the page, the ready-to-show event will be
   * emitted when the renderer process has rendered the page for the first
   * time if the window has not been shown yet.
   */
  windows.mainWindow.once('ready-to-show', () => {
    console.log('[ INFO ] Ready to show window')
    windows.mainWindow.show()
  })
}

async function checkActiveSession() {
  try {
    await datastore.expireSessions();
    let activeSession = await datastore.restoreSession();
    if(!activeSession) {
      return false;
    }
    return true;
  } catch(error) {
    console.log(`[ ERROR ] checkActiveSessions: ${error}`);
    return false;
  }
}

// [ IPC ]

ipcMain.on('is-active-session', async (e, msg) => {
  return e.sender.send('is-active-session', { "session": checkActiveSession()});
})

ipcMain.on('log-out', async (e, msg) => {
  try {
    await datastore.logOut();
    return e.sender.send('log-out', {"log-out": true});
  } catch(error) {
    console.log(`[ ERROR ] log-out: ${error}`)
    return e.sender.send('lod-out', {"error": error});
  }
})

// Backend Signup
 ipcMain.on('sign-up', async (e, msg) => {
  try {
    let isOldUser = await datastore.findUser(msg.email)
    if (isOldUser) {
      e.sender.send('is-new-user', {error:"User already exists"})
      return
    }
    await datastore.newUser(msg)
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})

ipcMain.on('log-in', async (e, msg) => {
  try {
    console.log("Login IPC Bus");
    let isLoggedIn = await datastore.loginUser(msg.email, msg.password, msg.isRemembered)
    if (!isLoggedIn) {
      e.sender.send('log-in', {error: "Incorrect username or password"})
      return
    }
      e.sender.send('log-in-app', "Successfully logged in")
  } catch(error) {
    console.log('error', error)
    e.sender.send('log-in', {error: error})
  }
})

// [ TRIGGERS ]

/**
 * ready: Runs when Electron has finished initializing.
 * In the code, this will run createWindow, which creates a browser window
 * with React’s local URL, http://localhost:3000, and sets the about panel
 * and the mainWindow to null on close.
 */
app.on('ready', async () => {
  try{
    createWindow();
    console.log(`[ INFO ] Initializing datastore`)
    await datastore.initializeDataStore()
    console.log(`[ INFO ] checking active sessions`)
    await checkActiveSession()
  } catch(error) {
    console.log(`[ ERROR ] ready: ${error}`)
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

/**
 * activate: Runs when the application is activated.
 * We’ll want to call the createWindow function to create a new window.
 */
app.on('activate', () => {
  if (windows.mainWindow === null) {
    createWindow();
  }
});