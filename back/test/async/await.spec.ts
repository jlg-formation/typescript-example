import {resolve} from 'path';
import assert from 'assert';
import {promises} from 'fs';

const {readdir, readFile, writeFile, unlink} = promises;

const dir = resolve(process.cwd(), './public');

describe('Asynchronous', () => {
  it('test promises code', async () => {
    try {
      const files = await readdir(dir);

      const file = resolve(dir, files[0]);
      const c1 = await readFile(file);

      const file2 = file + '.copy.txt';
      await writeFile(file2, c1);
      const c2 = await readFile(file2);

      assert.deepStrictEqual(c1, c2);
      await unlink(file2);
    } catch (err) {
      assert.fail(err);
    }
  });
});
