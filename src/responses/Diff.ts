import { includes } from 'lodash';

export interface ChangedFile {
  relativePath: string;
  deletedLineNumbers: number[];
  addedLineNumbers: number[];
}

export default class Diff {

  files: ChangedFile[] = [];

  parse(text) {
    let changedFile: ChangedFile | undefined;

    let baseLineNumbers: { 0: number, 1: number } = [0, 0];
    let lineOffsets: { 0: number, 1: number } = [0, 0];

    text.split('\n').forEach((lineStr) => {
      if (lineStr[0] === 'd') {
        changedFile && this.files.push(changedFile);

        changedFile = {
          relativePath: '',
          deletedLineNumbers: [],
          addedLineNumbers: [],
        };

        const relativePath = lineStr.match(/\sa\/(.+)\s/)[1];
        changedFile.relativePath = relativePath;

        baseLineNumbers = [0, 0];
        lineOffsets = [0, 0];
      } else if (lineStr[0] === '@') {
        baseLineNumbers[0] = parseInt(lineStr.match(/-([0-9]{1,}),/)[1], 10);
        baseLineNumbers[1] = parseInt(lineStr.match(/\+([0-9]{1,}),/)[1], 10);
        lineOffsets[0] = 0;
        lineOffsets[1] = 0;
      } else if (
        !includes(['--', '++'], lineStr.slice(0, 2))
        && includes(['-', '+', ' '], lineStr[0])
      ) {
        if (lineStr[0] === ' ') {
          lineOffsets[0] += 1;
          lineOffsets[1] += 1;
        } else if (lineStr[0] === '+') {
          lineOffsets[1] += 1;
          changedFile.addedLineNumbers.push(baseLineNumbers[1] + lineOffsets[1]);
        } else if (lineStr[0] === '-') {
          lineOffsets[0] += 1;
          changedFile.deletedLineNumbers.push(baseLineNumbers[0] + lineOffsets[0]);
        }
      }
    });
  }
}
