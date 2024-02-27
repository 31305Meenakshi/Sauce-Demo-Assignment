import * as ExcelJS from "exceljs";
export class Excel {
  async exTest(
    excelName: string,
    sheetName: string,
    usernameColumnIndex: number,
    username: string,
    passwordColumnIndex: number,
    password: string
  ) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelName + ".xlsx");
    const worksheet: any = workbook.getWorksheet(sheetName);
    const column = worksheet.getColumn(1);

    if (column) {
      console.log("Successfully Updated");
      let rowCount = 0;
      column.eachCell((cell) => {
        const cellValue = cell.value;
        if (typeof cellValue === "string" && cellValue.trim() !== "") {
          rowCount++;
        }
      });
      worksheet.getRow(rowCount + 1).getCell(usernameColumnIndex).value =
        username;
      worksheet.getRow(rowCount + 1).getCell(passwordColumnIndex).value =
        password;
      await workbook.xlsx.writeFile(excelName + ".xlsx");
    }
  }
}
