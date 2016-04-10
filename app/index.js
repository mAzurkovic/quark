'use strict';
const electron = require('electron');
const app = electron.app;

var globalShortcut = require('global-shortcut');

var ipc = require('ipc');
// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 175,
		show: false // Initial visibility is false (user needs to press default key to display)
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.setMenuBarVisibility(false);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

var startPref = '`';
var quitPref = '-';
app.on('ready', () => {
	// Init the application window
	mainWindow = createMainWindow();
	var ret = globalShortcut.register('CmdOrCtrl+`', function() {
		// Display the window
		mainWindow.show();
		// Close the window
		var quit = globalShortcut.register('`', function() {
			mainWindow.hide();
		})

	})
});
