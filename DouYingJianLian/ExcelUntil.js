/**
 * ExcelUntil: 基于jxl-2.6.12.1.jar包来对excel进行操作
 */
var ExcelUntil = {};

/**
 * 将Excel数据保存至数组中
 * @param {String} sheet 工作簿的名字
 * @param {Number} PrimaryKey 读取的excel数组的主键（这里如果读的时候为空，就不往下读了），默认第1一列的为主键
 * @return {Array} 二维数组
 */
ExcelUntil.getArrayExcelData = function(sheet, PrimaryKey) {
    let res = [];
    // console.log(sheet.getRows());
    // console.log(sheet.getColumns());
    for(let i = 0; i < sheet.getRows(); i++) {
        let Row = [];
        for(let j = 0; j < sheet.getColumns(); j++) {
            let cell = sheet.getCell(j, i);
            let data = cell.getContents();
            Row.push(data);
        }
        // 判断每一行第一个元素不能为空，要将'序号'列为主键
        if (Row[PrimaryKey] != '') {
            res.push(Row);
        }
    }
    return res;
}

/**
 * 根据入参Excel路径，读取Excel文件内容
 * @param {String} InputExcelRoute 输入Excel的路径
 * @param {Number} sheetIndex sheet的索引值
 * @param {Number} PrimaryKey excel中每一条数据的主键是哪个，因为excel里面存在很多空行，他也会读出来
 * @returns 
 */
ExcelUntil.handleExcel = function(InputExcelRoute, sheetIndex, PrimaryKey) {
    console.log('读取的路径名为：' + InputExcelRoute);
    // 1.根据excel路径，创建文件xls对象。
    let xlsFile = new File(InputExcelRoute);
    // 2.根据xls对象，得到工作簿对象
    let workbook = Workbook.getWorkbook(xlsFile);
    // 3.获取第0个sheet对象
    let sheet = workbook.getSheet(sheetIndex);
    console.log('要读取的sheet:' + sheet);
    // 4.得到excel数据，设第一列为主键
    console.log('读取内容的主键是第: '+ PrimaryKey + ' 列');
    let ExcelData = this.getArrayExcelData(sheet, PrimaryKey);
    console.log('读取的excel内容为: ' + ExcelData);
    return ExcelData;
}

/**
 * 将爬下来的数据写入到excel中(暂时没试过，从美团应用copy过来的)
 * @param {String} excelPath 要写入的excel的路径 
 * @param {Array} resExcel 要写入的excel的结果数据
 * @param {String} storeName sheet名字（暂定每家店铺的商家名）
 */
ExcelUntil.writeExcel = function (excelPath, resExcel, storeName) {
    console.log("要写入的excel路径为: " + excelPath);
    console.log("要写入的excel内容为: " + resExcel);
    let xlsFile = new File(excelPath);
    // 创建一个工作簿
    let workbook = Workbook.createWorkbook(xlsFile);
    // 创建一个工作表
    let sheet = workbook.createSheet(storeName, 0);
    for (var row = 0; row < resExcel.length; row++) {
        for (var col = 0; col < resExcel[row].length; col++) {
            // 文本写入
            console.log("resExcel[row][col]:" + resExcel[row][col])
            // 向工作表中添加数据
            sheet.addCell(new Label(col, row, resExcel[row][col]));
        }
    }
    workbook.write();
    workbook.close();
    console.log("写入完成");
}



module.exports = ExcelUntil;