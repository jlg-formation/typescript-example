import express from 'express';
import {resolve} from 'path';

export class WebServer {
  app!: express.Express;
  port = 3000;
  constructor() {
    console.log('instantiate the server');
    const app = express();
    const publicDir = resolve(__dirname, './public');
    app.use(express.static(publicDir));
    this.app = app;
  }

  start() {
    console.log('start the server');
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
