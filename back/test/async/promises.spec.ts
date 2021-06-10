import {resolve} from 'path';
import assert from 'assert';
import {promises, readdir as readdirAsync} from 'fs';

const dir = resolve(process.cwd(), './public');

const readdir = (dir: string) => {
  return new Promise<string[]>((resolve, reject) => {
    readdirAsync(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
};

describe('Asynchronous', () => {
  it('test promises code', function (done) {
    this.timeout(4000);

    let file: string;
    let file2: string;
    let c1: string;

    readdir(dir)
      .then(files => {
        file = resolve(dir, files[0]);
        return promises.readFile(file, {encoding: 'utf8'});
      })
      .then(content => {
        c1 = content;
        file2 = file + '.copy.txt';
        return promises.writeFile(file2, c1);
      })
      .then(() => {
        return promises.readFile(file2, {encoding: 'utf-8'});
      })
      .then(c2 => {
        assert.deepStrictEqual(c1, c2);
        return promises.unlink(file2);
      })
      .then(() => {
        done();
      })
      .catch(err => assert.fail(err));
  });
});
