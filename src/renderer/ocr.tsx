import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

class OcrModel {
  worker: Promise<Tesseract.Worker>;

  constructor() {
    this.worker = Tesseract.createWorker(
      ['eng', 'chi_sim'],
      Tesseract.OEM.DEFAULT,
      {
        workerPath:
          'https://cdn.jsdelivr.net/npm/tesseract.js@v5.0.0/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.0.0',
      },
    );
  }

  async fromImage(data: Buffer | string) {
    return this.worker.then((r) => {
      return r.recognize(data);
    });
  }
}

const ocr = new OcrModel();

export default function Ocr() {
  const [text, setText] = useState('');

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-ocr-image', async (buffer) => {
      setText('loading...');
      const { data } = await ocr.fromImage(buffer as Buffer);
      setText(data.text);
    });
  }, []);

  return text || <>请先截图</>;
}
