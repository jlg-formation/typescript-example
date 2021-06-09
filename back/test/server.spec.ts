import {WebServer} from './../src/WebServer';
import assert from 'assert';
import got from 'got';

describe('Web Server', () => {
  const server = new WebServer();
  before(async () => {
    await server.start();
  });
  after(async () => {
    await server.stop();
  });

  it('test get html page', async function () {
    this.timeout(4000);

    try {
      const response = await got('http://localhost:3000');
      const test = response.body.startsWith('<!DOCTYPE html>');
      assert.deepStrictEqual(test, true);
    } catch (error) {
      assert.fail(error);
    }
  });
});
