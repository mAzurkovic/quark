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
		height: 175
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
	var standBy = true;
	var ret = globalShortcut.register(startPref, function() {
		startPref ='-'
		mainWindow = createMainWindow();
		console.log('@Main Render');

		var quit = globalShortcut.register(startPref, function() {
			app.quit();
		})
	})
});
