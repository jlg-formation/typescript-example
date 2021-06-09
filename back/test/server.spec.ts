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

  it('test start on same port (error)', async function () {
    this.timeout(4000);

    try {
      const server2 = new WebServer();
      await server2.start();
    } catch (error) {
      // console.log('tout est sous controle: ', error);
      assert.ok(error);
    }
  });

  it('test stop without started', async function () {
    this.timeout(4000);

    try {
      const server2 = new WebServer();
      await server2.stop();
    } catch (error) {
      assert.fail(error);
    }
  });
});
