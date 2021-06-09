import {resolve} from 'path';
import assert from 'assert';
import {readdirSync, readFileSync, unlinkSync, writeFileSync} from 'fs';

const dir = resolve(process.cwd(), './public');

describe('Asynchronous', () => {
  it('test synchronous code', () => {
    try {
      const files = readdirSync(dir);
      const file = resolve(dir, files[0]);
      const c1 = readFileSync(file);
      const file2 = file + '.copy.txt';
      writeFileSync(file2, c1);
      const c2 = readFileSync(file2);
      assert.deepStrictEqual(c1, c2);
      unlinkSync(file2);
    } catch (error) {
      assert.fail(error);
    }
  });
});
