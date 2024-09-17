import { BrowserWindow, globalShortcut } from 'electron';
import screenshots from './screenshot';

export default async function run(window: BrowserWindow) {
  screenshots.init(window);

  globalShortcut.register('CommandOrControl+Shift+X', () => {
    screenshots.runner?.startCapture();
    // screenshots.$view.webContents.openDevTools();
  });
}
