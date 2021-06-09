import express from 'express';
import {resolve} from 'path';
import {Server} from 'http';

export class WebServer {
  app!: express.Express;
  server!: Server;
  port = 3000;
  constructor() {
    const app = express();
    const publicDir = resolve(process.cwd(), './public');
    app.use(express.static(publicDir));
    this.app = app;
  }

  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let isStarting = true;
      this.server = this.app.listen(this.port, () => {
        console.log(`Server started on port ${this.port}`);
        isStarting = false;
        resolve();
      });
      this.server.on('error', err => {
        if (isStarting) {
          reject(err);
        }
      });
    });
  }
  stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.server.close(err => (err ? reject() : resolve()));
    });
  }
}
