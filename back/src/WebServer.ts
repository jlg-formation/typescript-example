import express from 'express';

export class WebServer {
  app!: express.Express;
  constructor() {
    console.log('instantiate the server');
    const app = express();
    this.app = app;
  }

  start() {
    console.log('start the server');
  }
}
