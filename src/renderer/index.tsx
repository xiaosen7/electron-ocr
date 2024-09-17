import { createRoot } from 'react-dom/client';
import Ocr from './ocr';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<Ocr />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
