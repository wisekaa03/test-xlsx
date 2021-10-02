import { ReadStream as FSReadStream, readFileSync } from 'fs';
import { read as XlsxRead, WorkSheet } from 'xlsx';

export class ReadStream extends FSReadStream {}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}

export interface FileUploadBuffer
  extends Pick<FileUpload, 'filename' | 'mimetype' | 'encoding'> {
  buffer: Buffer;
}

const fromNumberToLetters = (num: number): string => {
  let str = '',
    q,
    r;
  while (num > 0) {
    q = (num - 1) / 26;
    r = (num - 1) % 26;
    num = Math.floor(q);
    str = String.fromCharCode(65 + r) + str;
  }
  return str;
};

const fromLettersToNumber = (letters: string): number =>
  letters.split('').reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0);

/**
 * Генератор для строки excel
 * @param {WorkSheet} sheet
 * @param {number} startRow
 * @returns {Generator}
 */
function* excelSheetRow(
  sheet: WorkSheet,
  startRow = 2,
): Generator<Array<string | number | boolean | Date | undefined>> {
  const ref = sheet['!ref']?.match(/(\D+)(\d+):(\D+)(\d+)/);
  if (!ref) {
    return undefined;
  }
  const [, colFirst, rowFirst, colEnd, rowEnd] = ref;
  if (!colFirst || !rowFirst || !colEnd || !rowEnd) {
    return undefined;
  }
  const col = fromLettersToNumber(colFirst);
  const colEndNum = fromLettersToNumber(colEnd);
  if (col < 0 || colEndNum < 0) {
    return undefined;
  }
  for (
    let row = +rowFirst <= startRow ? startRow : +rowFirst;
    row <= +rowEnd;
    row++
  ) {
    const rowArray: Array<string | number | boolean | Date | undefined> = [];
    for (let c = col; c <= colEndNum; c++) {
      const cell = sheet[`${fromNumberToLetters(c)}${row}`];
      rowArray.push(cell?.w || cell?.v || undefined);
    }
    yield rowArray;
  }

  return [];
}

/* Excel file loading */
const excel: FileUploadBuffer = {
  filename: 'default.xls',
  encoding: '7bit',
  mimetype: 'application',
  buffer: readFileSync('./default.xls'),
};

const workbook = XlsxRead(excel.buffer, { type: 'buffer' });
console.log(`workbook sheet: ${JSON.stringify(workbook.Sheets)}`);

const sheet = excelSheetRow(workbook.Sheets['Worksheet'], 1);
for (let next = sheet.next(), sheetRow = 1; !next.done; sheetRow++) {
  const rows = next.value;
  console.log(`rows ${sheetRow}: ${JSON.stringify(rows)}`);
}
