import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data,month,year) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `report-${month}-${year}.xlsx`
  );
};

export default exportToExcel;
