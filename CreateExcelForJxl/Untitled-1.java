// 2.3.1 创建工作薄
// API提供了两种方式来处理可写入的输出流，一种是直接生成本地文件，如果文件名不带全路径的话，缺省的文件会定位在当前目录，如果文件名带有全路径的话，则生成的Excel文件则会定位在相应的目录；另外一种是将Excel对象直接写入到输出流，例如：用户通过浏览器来访问 web服务器 ，如果HTTP头设置正确的话，浏览器自动调用客户端的Excel应用程序，来显示动态生成的Excel电子表格。
// 2.3.1.1 创建可写入的Excel工作薄
WritableWorkbook 
wwb = Workbook.createWorkbook(new File(targetfile));
// 2.3.1.2 将WritableWorkbook直接写入到输出流
OutputStream os = new FileOutputStream(targetfile);
WritableWorkbook wwb = Workbook.createWorkbook(os);
// 2.3.2 创建工作表
WritableSheet ws = wwb.createSheet("通讯录", 0);//创建sheet
// 2.3.3 创建单元格
// 2.3.3.1 添加文本类单元格
Label labelC = new Label(0, 0, "This is a Label cell");
// 2.3.3.2 添加带有字型Formatting的对象
WritableFont wf = new WritableFont(WritableFont.TIMES, 18, WritableFont.BOLD, true);
WritableCellFormat wcfF = new WritableCellFormat(wf);
labelCF = new Label(1, 0, "This is a Label Cell", wcfF);
ws.addCell(labelCF);
// 2.3.3.3 添加带有字体颜色Formatting的对象
WritableFont wfc = new WritableFont(WritableFont.ARIAL,10,WritableFont.NO_BOLD, false,
UnderlineStyle.NO_UNDERLINE, jxl.format.Colour.RED);
WritableCellFormat wcfFC = new WritableCellFormat(wfc);
Label labelCFC = new Label(1, 0, "This is a Label Cell", wcfFC);
ws.addCell(labelCF);
// 2.3.3.4 添加Number对象
Number labelN = new jxl.write.Number(0, 1, 3.1415926);
ws.addCell(labelN);
// 2.3.3.5 添加带有formatting的Number对象
NumberFormat nf = new NumberFormat("#.##");
WritableCellFormat wcfN = new WritableCellFormat(nf);
Number labelNF = new Number(1, 1, 3.1415926, wcfN);
ws.addCell(labelNF);
// 2.3.3.6 添加Boolean对象
Boolean labelB = new jxl.write.Boolean(0, 2, false);
ws.addCell(labelB);
// 2.3.3.7 添加DateTime对象
DateTime labelDT = new DateTime(0, 3, new java.util.Date());
ws.addCell(labelDT);
// 2.3.3.8 添加带有formatting的DateFormat对象
DateFormat df = new DateFormat("dd MM yyyy hh:mm:ss");
WritableCellFormat wcfDF = new WritableCellFormat(df);
DateTime labelDTF = new DateTime(1, 3, new Date(), wcfDF);
ws.addCell(labelDTF);
// 2.3.3.9 添加公式单元格
Fornual formual = new Formual(0,11,”Sum(A1:A9)”);
wrb.addCell(formual);
// 2.3.3.10 添加图像
WritableImage wrimage=new WritableImage(1,5,10,10,new File(imageFilepath));
wrb.addImage(wrimage); 
// 注意，API中注明只支持png文件。