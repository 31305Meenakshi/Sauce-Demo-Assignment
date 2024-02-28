import * as ExcelJS from "exceljs";
export class ReadFromExcel {
  public async getProductName() {
    const workBook = new ExcelJS.Workbook();
    await workBook.xlsx.readFile("tests/data/readExcel.xlsx");
    const worksheet = workBook.getWorksheet("ProductName");
    if (!worksheet) {
      throw new Error('Worksheet "ProductName" not found');
    }

    let cellValue: any;
    let data: string[] = [];
    let currentRow = 2;
    do {
      cellValue = worksheet.getRow(currentRow).getCell(1).value;
      if (cellValue) {
        data.push(cellValue);
      }
      currentRow++;
    } while (cellValue);

    return data;
  }
}
