import fs from 'fs';
import {env} from '../../env/env';

export class StorageService<Data> {
  filePath = '';
  testFilePath = '';

  constructor(filePath: string, testFilePath: string) {
    this.filePath = filePath;
    this.testFilePath = testFilePath;
  }

  write(data: Data) {
    return new Promise<null>((resolve, reject) => {
      fs.writeFile(
        env.isTest ? this.testFilePath : this.filePath,
        JSON.stringify(data),
        'utf8',
        err => {
          if (err) {
            reject(err);
          }
          resolve(null);
        },
      );
    });
  }

  read() {
    return new Promise<Data>((resolve, reject) => {
      fs.readFile(
        env.isTest ? this.testFilePath : this.filePath,
        'utf8',
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(res));
        },
      );
    });
  }
}
