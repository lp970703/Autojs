runtime.loadJar("./jxl-2.6.12.1.jar")

importClass("java.io.File")
importClass("java.io.IOException")
importClass("jxl.Workbook")
importClass("jxl.write.Label")
importClass("jxl.write.WritableSheet")
importClass("jxl.write.WritableWorkbook")
importClass("jxl.write.WriteException")
importClass("jxl.write.WritableImage")

let filePath = "/sdcard/脚本/excel/lopez.xls"; //文件路径
files.createWithDirs(filePath);
let xlsFile = new File(filePath);
// 创建一个工作簿
let workbook = Workbook.createWorkbook(xlsFile);
// 创建一个工作表
let sheet = workbook.createSheet("sheet1", 0);
for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
        // 向工作表中添加数据
        sheet.addCell(new Label(col, row, "data" + row + col));
        // 插入图片 new File(resExcel[row][col])) 路径
        //sheet.addImage(new WritableImage(col, row, 1, 1, new File(resExcel[row][col])));  
    }
}
workbook.write();
workbook.close();
