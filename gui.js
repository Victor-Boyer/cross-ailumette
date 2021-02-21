const { app, BrowserWindow } = require("electron");
const path = require("path");
const game_script = require('./src/body-game');

try {
  function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    mainWindow.loadURL("http://localhost:3000");
  }

  app.whenReady().then(() => {
    createWindow();
    const Game = new game_script();
  
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  app.on("window-all-closed", function () {
    if (process.platform !== "darw>in") app.quit();
  });

  app.post('/step', (req, res)=>{
    console.log(req.body);
  });

} catch (error) {
  console.log("To run the full ap pls run `npm run electron-react`.");
  console.log("Or run this command with --gui option to play console mod");
}
