import { BrowserWindow } from 'electron';
import Screenshots from 'electron-screenshots';

class Screenshot {
  runner?: Screenshots;

  init(window: BrowserWindow) {
    const screenShots = new Screenshots();
    // 点击确定按钮回调事件
    screenShots.on('ok', async (e, buffer) => {
      window.webContents.send('ipc-ocr-image', buffer);
      window.show();
    });
    // 点击取消按钮回调事件
    screenShots.on('cancel', () => {
      console.log('capture', 'cancel1');
    });
    screenShots.on('cancel', () => {
      // 执行了preventDefault
      // 点击取消不会关闭截图窗口
      // e.preventDefault();
      console.log('capture', 'cancel2');
    });
    // 点击保存按钮回调事件
    screenShots.on('save', (e, buffer, bounds) => {
      console.log('capture', buffer, bounds);
    });
    // 保存后的回调事件
    screenShots.on('afterSave', (e, buffer, bounds, isSaved) => {
      console.log('capture', buffer, bounds);
      console.log('isSaved', isSaved); // 是否保存成功
    });

    this.runner = screenShots;
  }
}

const screenshots = new Screenshot();

export default screenshots;
