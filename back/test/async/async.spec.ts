import {resolve} from 'path';
import assert from 'assert';
import {readdir, readFile, unlink, writeFile} from 'fs';

const dir = resolve(process.cwd(), './public');

describe('Asynchronous', () => {
  it('test asynchronous code', done => {
    try {
      readdir(dir, (err, files) => {
        if (err) {
          done(err);
          return;
        }
        const file = resolve(dir, files[0]);
        readFile(file, (err, c1) => {
          if (err) {
            done(err);
            return;
          }
          const file2 = file + '.copy.txt';
          writeFile(file2, c1, err => {
            if (err) {
              done(err);
              return;
            }
            readFile(file2, (err, c2) => {
              if (err) {
                done(err);
                return;
              }
              assert.deepStrictEqual(c1, c2);
              unlink(file2, err => {
                if (err) {
                  done(err);
                  return;
                }
                done();
              });
            });
          });
        });
      });
    } catch (error) {
      assert.fail(error);
    }
  });
});
