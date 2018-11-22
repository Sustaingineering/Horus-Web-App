const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const datastore = require('./datastore');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const resetPassword = require('./modules/resetPassword.js');
// Menu
const { template } = require('./appMenu.js')

let windows = {};

// [ METHODS ]

function createWindow() {
  console.log('[ INFO ] Creating Window')
  // Create the browser window.
  windows.mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    minWidth: 600, // set a min width!
    minHeight: 300, // and a min height!
    // Remove the window frame from windows applications
    frame: false,
    // Hide the titlebar from MacOS applications while keeping the stop lights
    // titleBarStyle: 'hidden',
  });

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
    user = "";
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
    else {
      await datastore.newUser(msg)
      e.sender.send('is-new-user', {success: "Account successfully created."})
      console.log("created new user")
    }
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})

ipcMain.on('log-in', async (e, msg) => {
  try {
    console.log("Login IPC Bus");
    msg.user = msg.user || msg.email
    let isLoggedIn = await datastore.loginUser(msg.user, msg.password, msg.isRemembered); //TODO: Ensure msg order is correct
    if (!isLoggedIn) {
      e.sender.send('log-in', {error: "Incorrect username or password"});
      return;
    }
    e.sender.send('log-in-app', "Successfully logged in")/////////// TODO: Check this
  } catch(error) {
    console.log('error', error)
    e.sender.send('log-in', {error: error})
  }
})

ipcMain.on('generate-password-token', async (e, msg) =>{
  try{
    let passwordGenerator = await resetPassword.generatePasswordToken(msg)
    return e.sender.send('generate-password-token', passwordGenerator);
  }catch(error) {
    return e.sender.send('generate-password-token', error);
  }
})

ipcMain.on('verify-and-update-password', async (e, msg) => {
  try{
    let passwordUpdate = await resetPassword.verifyAndUpdatePassword(msg);
    return e.sender.send('verify-and-update-password', passwordUpdate);
  }catch(error) {
    return e.sender.send('verify-and-update-password', error);
  }
})

//TODO: Verify it works
ipcMain.on('update-sidebar', async (e, msg) => {
  try {
    let username = await datastore.getUserName();
    let organization = await datastore.getUserOrganization();
    if (!username || !organization) {
      e.sender.send('update-sidebar', {error: "The user is not signed-in."});
    }

    e.sender.send('update-sidebar', {username: username, organization: organization});
  } catch (error) {
    console.log(error);
    e.sender.send('update-sidebar', {error: error});
  }
});


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
    console.log(`[ INFO ] Initializing React Dev Tools`);
    let name = await  installExtension(REACT_DEVELOPER_TOOLS)
    console.log(`[INFO] Added Extension: ${name}`);
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
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
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

/**
 * Create titleBar menu
 */
ipcMain.on('display-app-menu', (e, arg) => {
  const appMenu = Menu.buildFromTemplate(template)
  if(windows.mainWindow) {
    appMenu.popup(windows.mainWindow, arg.x, arg.y)
  }
})
