// @ts-ignore
import { creatCsvFile, downloadFile } from "download-csv";

type Entry = Array<string | number>;

export function downloadTableCsv(
  data: Entry[],
  columnNames: Array<string>,
  fileName = "export.csv",
) {
  const arrayToObj = (x: Entry) => Object.fromEntries(Object.entries(x));
  downloadFile(creatCsvFile(data.map(arrayToObj), arrayToObj(columnNames)), fileName);
}
