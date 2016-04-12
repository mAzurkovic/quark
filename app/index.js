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
let prefWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow(width, height, visible) {
	const win = new electron.BrowserWindow({
		width: width,
		height: height,
		show: visible // Initial visibility is false (user needs to press default key to display)
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

app.on('ready', () => {
	// Init the application window
	mainWindow = createMainWindow(600, 375, false);
	var ret = globalShortcut.register('CmdOrCtrl+`', function() {
		// Display the window
		mainWindow.show();
		// Close the window
		var quit = globalShortcut.register('`', function() {
			mainWindow.hide();
		})
	})
});
