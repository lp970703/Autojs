// ***************************************
// *******************公用类***************
// ***************************************
// versionCode 20.7.0
const AutoJsException = function(){
    function AutoJsException(code0){
        this.message = code0
    }
    AutoJsException.prototype.throw = function(){
        toast(this.message)
        log(this.message)
        throw new AutoJsException("ExceptionForNoExist","",this.message)
    }
    return AutoJsException
}()

const CyclonePublic = function(){
    function CyclonePublic(code0,code1,code2,code3,code4,code5){
        this.type = code0
        this.value = code1
        this.fdOne = code2
        this.re = code3
        this.clickType = code4
        this.position = code5
        this.time = 3000
        if(typeof(this.type) != 'function'){
            throw "第一个传入参数应该是一个函数类型 text、desc、className"
        }
        if(typeof(this.value) != 'string'){
            throw "第二个传入参数应该是一个sring类型"
        }
        if(typeof(this.fdOne) != 'boolean' ||typeof(this.re) != 'boolean' ){
            throw "第三、四个传入参数应该是一个boolean类型 分别是 是否唯一 是否启用正则表达式"
        }
        if(typeof(this.position) != 'number'){
            throw "第六个传入参数控件参数应该是一个number类型 控件不唯一时候生效 代表选中多个相同控件中的哪一个"
        }
        if(typeof(this.position) == 'number' && this.position % 1 != 0){
            throw "第六个传入参数不可以是小数"
        }
    }
    CyclonePublic.prototype.elemExists = function(){
        n = 0
        while(!this.type(this.value).exists()){
            n ++ 
            sleep(this.time)
            if (n > 5){
                // return //抛异常;
                new AutoJsException("元素不存在").throw()
            }
        }
        // if(this.type(this.value).exists() == true){
        //     return this.elemClick()
        // }
        return
    }

    CyclonePublic.prototype.elemClick = function(){
        if(this.re == true){
            switch (this.type){
                case text:
                    this.type = textMatches
                    break;
                case desc:
                    this.type = descMatches
            }
        }
        this.elemExists();
        if(this.fdOne == true){
            elem = this.type(this.value).find()[0]
        }else if(this.fdOne == false){
            elem = this.type(this.value).find()[this.position]
        }
        n = 0
        while(elem.clickable() == false){
            elem = elem.parent();
            n ++
            if(n > 5){
                return this.bdsClick();
            }
        }
        switch (this.clickType){
            case "click":
                elem.click();
                break;
            case "doubleClick":
                elem.click();sleep(120);elem.click()
                break;
            case "longClick":
                elem.longClick();
        }
    }

    CyclonePublic.prototype.bdsClick = function(){
        this.elemExists();
        if(this.re == true){
            switch (this.type){
                case text:
                    this.type = textMatches
                    break;
                case desc:
                    this.type = descMatches
            }
        }
        if(this.fdOne == true){
            elem = this.type(this.value).find()[0].bounds()
        }else if(this.fdOne == false){
            elem = this.type(this.value).find()[this.position].bounds()
        }
        switch (this.clickType){
            case "click":
                click(elem.centerX(),elem.centerY());
                break;
            case "doubleClick":
                click(eelem.centerX(),elem.centerY());sleep(120);click(elem.centerX(),elem.centerY())
                break;
            case "longClick":
                longClick(elem.centerX(),elem.centerY())
        }
    }
    return CyclonePublic
}();

const HttpApiPublic = function(){
    function HttpApiPublic(url, headers, body, callback){
        this.url = url
        this.headers = headers
        this.body = body
        this.callback = callback    
    }
    HttpApiPublic.prototype.postApi = function(){
        let res;
        res = http.post(this.url, this.body);
        var resBody = res.body.json()
        return resBody;
    }
    return HttpApiPublic
}();

// ***************************************
// ******************处理滑块验证***********
// ***************************************

/**
 * 初始化app
 * @param {number} app_name app名字
 */
 function call_back_init(app_name){
    home();launchApp(app_name);sleep(6000);
    let start_app = 1;
    let retry_count = 5;
    while(waitForApp(app_name) == false){
        launchApp(app_name);sleep(6000);
        start_app ++
        if(start_app > retry_count){
            //提交运行状态为启动失败  
            //抛异常
            throw new AutoJsException("app未安装").throw()
            // break
        }
    }
}

/**
 * 获取当前界面运行app 是否期望中的app 返回true 或 false
 * @param {string} app_name 
 * @returns 
 */
 function waitForApp(app_name){
    let app_package_name = getPackageName(app_name)
    let now_status = currentPackage(app_package_name)
    if(now_status == app_package_name){
        return true
    }else{
        return false
    }
}


function inputMSG(){
    if(desc("语言").exists() == false){
        className("android.widget.ImageView").find()[className("android.widget.ImageView").find().length - 1].click();sleep(1200)
    }
}

function stopApp(packageName) {
    var name = getPackageName(packageName); 
    if(!name){
        if(getAppName(packageName)){
            name = packageName;
        }else{
            return false;
        } 
    }
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();  
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();sleep(1200);
        // textMatches(/(.*确.*|.*定.*)/).findOne().click();
        text("强行停止").findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

//********************************************************
//**************************处理excel，读操作************/
//********************************************************
function handleExcel(InputExcelRoute, sheetIndex, PrimaryKey) {
    console.log('读取的路径名为：' + InputExcelRoute);
    // 1.根据excel路径，创建文件xls对象。
    let xlsFile = new File(InputExcelRoute);
    // 2.根据xls对象，得到工作簿对象
    console.log('xlsFile: '+xlsFile);
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

function getArrayExcelData(sheet, PrimaryKey) {
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


// 主流程
call_back_init("企业微信");
mainFun();

function mainFun() {
    let targetData = ["梁骏杰", "金鹏", "黄茂山", "徐艺鸣"];
    click(861,136);sleep(2000);
    for (let item of targetData) {
        click(222,140);sleep(2000);
        setText(item);sleep(2000);
        new CyclonePublic(id,"com.tencent.wework:id/gaz",false,false,"click",0).elemClick();sleep(2500);
        click(199,1850);sleep(2000);
        setText(item + '您好！');sleep(2000);
        click(979,1825);sleep(2000);
        new CyclonePublic(id,"com.tencent.wework:id/kz6",false,false,"click",0).elemClick();sleep(2500);
    }
    home();
    toast('已完成');    
}




// ui.callback.click(() =>{
//     // 取出填写的Excel默认路径,建联话术语句
//     InputExcelRoute = ui.InputExcelRoute.text();
//     SiXinMSG = ui.SiXinMSG.text();
//     appLicense = ui.appLicense.text();
//     console.log('InputExcelRoute:' + InputExcelRoute);
//     console.log('SiXinMSG:' + SiXinMSG);
//     console.log('appLicense:' + appLicense);
//     // 1、处理excel数据
//     DouYinNameList = handleExcel(InputExcelRoute, 0, 0);
//     if (DouYinNameList) {
//         // 这里需要启用多线程，因为在ui下他会每16ms会执行一次刷新页面，如果直接把sleep这种阻塞线程或者需要长时间回调（例如调接口）这种，
//         // 在ui页面上会造成长时间等待，故新启动一个线程去处理这些任务
//         threads.start(function () { 
//             // 2.先查询服务端接口次数
//             let getRemainUseTime = new HttpApiPublic('http://10.86.9.149:7001/cyclone/v1/get/remainUseTime', {}, {
//                 appName: "抖音建联",
//                 appLicense: appLicense,
//             }).postApi();
//             console.log('resStatus:' + getRemainUseTime.status)
//             if (getRemainUseTime.status = 200 && getRemainUseTime.data.allowUseTime > getRemainUseTime.data.totalUseTime) {
//                 // 3、打开抖音
//                 call_back_init("抖音");
//                 // 4、查看excel数据是否加载完成
//                 console.log('DouYinNameList:' + DouYinNameList);
//                 // 5、执行主函数
//                 let mainStatus = DoMainProcess(DouYinNameList, SiXinMSG);
//                 if (mainStatus = 'finish') {
//                     new HttpApiPublic('http://10.86.9.149:7001/cyclone/v1/update/TotalUseTime', {}, {
//                         appName: "抖音建联",
//                         appLicense: appLicense,
//                     }).postApi();
//                     toast(mainStatus);
//                     console.log('mainStatus:' + mainStatus);
//                 }
//             }
//         })
//     }
// });
// threads.shutDownAll();

