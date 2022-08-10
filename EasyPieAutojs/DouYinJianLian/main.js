
"ui";
// importClass(com.cyclone.rpadroid.runtime.utils.AutoJsScriptUtils);
// var file = AutoJsScriptUtils.readFile("/sdcard/脚本/excel/抖音建联1.xls")
runtime.loadJar("./jxl-2.6.12.1.jar")
importClass("java.io.File")
importClass("jxl.Cell")
importClass("jxl.Workbook")
importClass("jxl.JXLException")
importClass("jxl.Sheet")


ui.layout(
    <ScrollView>
    <vertical id = "setConfigView" w = "*" h = "auto" layout_centerInParent="true" >
        <appbar>
            <toolbar id="toolbar" title="立即运行"/>
        </appbar>
        <text textColor = "black" textSize="18sp" margin="20 12">
            运行参数
        </text>

        <text textColor = "black" textSize="16sp" margin="22 12">
            一、入参
        </text>

        <card w="*" h="150" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    1、请输入导入抖音批量关注建联_建联名单模板存放路径
                </text>
                <input id = "InputExcelRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/excel/抖音建联.xls"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：/sdcard/脚本/excel/dataInput.xls
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <card w="*" h="150" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    2、请输入建联话术
                </text>
                <input id = "SiXinMSG" singleLine = 'true' alpha="0.5" text="您好"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：'亲您好,这里是Molyvivi品牌方,主营科技休闲运动服饰公司产品也有众多明星背书,如欧阳娜娜、赵露思、宋茜、吴昕都有过推荐,这边想跟您合作挂车视频,有意向可留vx或者邮哦~'
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <text textColor = "black" textSize="16sp" margin="22 12">
            三、定时任务
        </text>

        <Switch id = "openSwh"  w = "auto" h = "auto" margin="24 5" textStyle = "bold" textColor = "red" 
            text = "是否需要设置定时任务   "  textSize="16sp" marginBottom = "15"  marginRight ="10"/>

        <vertical>
            <text id = "timePickerModeText" margin="24 5" text = "滑动时间选择:" textColor = "black" textSize="16sp" marginTop="5" />
            <timepicker id = "timePickerMode"  timePickerMode="spinner" />
        </vertical>

        <button id="callback" bg="#0000FF" margin="24 5" textColor = "#FFFFFF">立即运行</button>
    </vertical>
    </ScrollView>
);

// ***************************************
// *******************公用类***************
// ***************************************
// versionCode 20.7.0
const StartApp = function(){
    function StartApp(code0,code1){
        this.appName = code0
        this.time = code1
    }
    StartApp.prototype.start = function(){
        launchApp(this.appName);sleep(6000);
        // home();sleep(2000)
        appPackage = getPackageName(this.appName)
        if(appPackage == null){
            return new AutoJsException("app未安装").throw()
        }
        // currentPackageName = currentPackage()
        // while(currentPackageName != appPackage){
        //     launchApp(this.appName);sleep(this.time);
        //     appPackage = getPackageName(this.appName)
        //     currentPackageName = currentPackage()
        // }
        return this.backIndex()
    }

    StartApp.prototype.backIndex = function(){
        while(true){
            while(text("首页").exists() == false && text("朋友").exists() == false && text("消息").exists() == false && text("我").exists() == false){
                back();sleep(1500)
            }
            return StartApp
        }
    }
    return StartApp
}();
const AutoJsException = function(){
    function AutoJsException(code0){
        this.message = code0
    }
    AutoJsException.prototype.throw = function(){
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

// ***************************************
// ******************处理滑块验证***********
// ***************************************

// /**
//  * 开始识别
//  */
//  function start() {
//     var img = getScreenImage();sleep(2000)
//     if (img) {
//         log("截图成功，进行识别滑块！");
//     } else {
//         log('截图失败，重新截图');
//         return;
//     };

//     var x = getPointX(img,0.7);
//     console.info("识别结果滑块X坐标：" + x);
//     // swipe(147, 1530, x+270, 1530,800);
//     gestures([0, 500, [155, 1530], [x, 1530]],
//         [0, 500, [160, 1530], [x, 1530]]);
//     sleep(2000);
//     return true
// }

// /**
//  * 获取缺口位置的x坐标
//  * 传入值 img, 识别精度(precision)
//  */
// function getPointX(img,precision){
//     var xCount = 0;
//     var finnalX = 0;
//     for(var x = 270; x < 950; x += 5){    //横向遍历像素点，间隔5个像素点
//         // var row = "";
//         var tempCount = 0
//         for(var y = 570; y < 1070; y+=5){      //找到黑点最多的y轴
//             if(isBlackPoint(x,y,img,precision)){
//                 // row +="1";
//                 tempCount += 1;
//             }else{
//                 // row += "0";
//             }
//         }
//         if( tempCount >= xCount ){
//             xCount = tempCount;
//             finnalX = x
//         }
//         // console.log(row);
//     }
//     return finnalX
// }

// /**
//  * 判断点是否为黑色点
//  * 传入值 坐标(x,y), img, 识别精度(precision)
//  */
// function isBlackPoint(x, y,img,precision) {
//     var rgb = images.pixel(img,x,y);    //此时获取到的是ARGB
//     var r = (rgb & 0xff0000) >> 16;      //得到R
//     var g = (rgb & 0xff00) >> 8;            //得到G
//     var b = (rgb & 0xff);                        //得到B
//     var criticalValue = 255 * (1 - precision);
//     if (r <= criticalValue && g <= criticalValue && b <= criticalValue) {
//         return true;
//     }
//     return false;
// }

// /**
//  * 判断点是否为白色点
//  * 传入值 坐标(x,y), img, 识别精度(precision)
//  */
// function isWhitePoint(x, y,img,precision) {
//     var rgb = images.pixel(img,x,y);  //此时获取到的是ARGB
//     var r = (rgb & 0xff0000) >> 16;   //得到R
//     var g = (rgb & 0xff00) >> 8;        //得到G
//     var b = (rgb & 0xff);                    //得到B
//     var criticalValue = 255 * precision;
//     if (r >= criticalValue && g >= criticalValue && b >= criticalValue) {
//         return true;
//     }
//     return false;
// }

// /**
//  * 使用命令截图，返回imgae对像。
//  */
// if(!images.requestScreenCapture()){
//     log("请求失败");
//     exit();
// }
// function getScreenImage(){

//     // var pictures = images.clip(captureScreen(),device.width / 2,420,1038 - device.width / 2,1005 - 420)
//     var pictures = captureScreen()
//     // pictures = images.grayscale(pictures)
//     // pictures = images.threshold(pictures,60,200)
//     // images.save(pictures,"/sdcard/pictures.png","png",100)
//     return pictures
// }

// // *********************************************
// // *************************处理广告*************
// // *********************************************
// function close_AD(){
//     //函数功能 关闭启动广告
//     threads.start(function () {
//         while(textMatches(/.*跳过.*/).exists() == true){
//             new CyclonePublic(text,/.*跳过.*/,true,true,"click",1).elemClick()
//             console.log("点击了跳过广告")
//         }
//     })
//     threads.start(function () {
//         while(descMatches(/.*跳过.*/).exists() == true){
//             new CyclonePublic(desc,/.*跳过.*/,true,true,"click",1).elemClick()
//             console.log("点击了跳过广告")
//         }
//     })
// }


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
    // let workbook;
    // try {
    let workbook = Workbook.getWorkbook(xlsFile);
    // } catch (error) {
    //     console.log('有异常');
    //     let a = threads.start(function () {
    //         workbook = Workbook.getWorkbook(xlsFile);
    //     })
    //     console.log(a.isAlive())
    //     a.join();
    //     console.log(a.isAlive())
    // }
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


let InputExcelRoute = '';
let SiXinMSG = '';
let DouYinNameList = '';


ui.callback.click(() =>{
    // 取出填写的Excel默认路径,建联话术语句
    InputExcelRoute = ui.InputExcelRoute.text();
    SiXinMSG = ui.SiXinMSG.text();
    console.log('InputExcelRoute:' + InputExcelRoute);
    console.log('SiXinMSG:' + SiXinMSG);
    // 1、处理excel数据
    DouYinNameList = handleExcel(InputExcelRoute, 0, 0);
    if (DouYinNameList) {
        // 这里需要启用多线程，因为在ui下他会每16ms会执行一次刷新页面，如果直接把sleep这种阻塞线程或者需要长时间回调（例如调接口）这种，
        // 在ui页面上会造成长时间等待，故新启动一个线程去处理这些任务
        threads.start(function () { 
            // 2、返回桌面
            home();
            // 3、打开抖音
            new StartApp("抖音",5000).start();sleep(2000);
            // 4、查看excel数据是否加载完成
            console.log('DouYinNameList:' +DouYinNameList);
            // 5、执行主函数
            DoMainProcess(DouYinNameList, SiXinMSG);
        })
    }
    // threads.shutDownAll();
    // threads.start(function () {
    // var beginBtn;
    //    if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
    //        beginBtn.click();sleep(1000)
    //    }
    // if(text("检测到更新").exists() && text("以后再说").exists()){
    //     text("以后再说").find()[0].click();
    // }
    // });
});

threads.shutDownAll();


function DoMainProcess(DouYinNameList, SiXinMSG) {
    let num = 0
    console.log('开始执行主流程');
    console.log('DouYinNameList1:' + DouYinNameList);
    click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    startlabel:
    for(let i = 1; i < DouYinNameList.length; i++) {
        console.log('开始循环');
        let itemArray = DouYinNameList[i];
        console.log('itemArray:' + itemArray);
        try{
            num ++
            // 防止抖音崩溃到主页
            if(num == 50){
                stopApp("抖音");
                new StartApp("抖音",5000).start();
                // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    
            }
            try{
                setText(itemArray[2]);sleep(3000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    // start();
                }
                setText(itemArray[2]);sleep(3000);
            }
            try{
                // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    // start();
                }
                // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
            }
            if(text("您今日的搜索次数已达上限").exists() == true){
                toastLog("上限了。结束运行")
                break startlabel;
            }
            console.log('id: '+ id("android:id/text1").exists());
            if(id("android:id/text1").exists() == true){
                try{
                    new CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }
            }
            
            if(descMatches(".*抖音号: .*").find()[0].text().split("抖音号: ")[1] != "" ){
                console.log('全程： '+ descMatches(".*抖音号: .*").find()[0].text());
                console.log('抖音号：' + descMatches(".*抖音号: .*").find()[0].text().split("抖音号: ")[1]);
                try{
                    console.log('x轴：' + descMatches(".*抖音号: .*").find()[0].bounds().centerX());
                    console.log('y轴：' + descMatches(".*抖音号: .*").find()[0].bounds().centerY());
                    click(descMatches(".*抖音号: .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    try{
                        click(descMatches(".*抖音号: .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                    }catch(error){
                        //抖音号不匹配
                        continue;
                    }
                }
            }else{
                toast("抖音号不匹配 继续下一个任务")
                continue;
            }
            //点关注私信
            if(id("com.ss.android.ugc.aweme:id/frj").exists() == true){
                try{
                    new CyclonePublic(id,"com.ss.android.ugc.aweme:id/frj",false,false,"click",0).elemClick();sleep(2500);
                    if (id("com.ss.android.ugc.aweme:id/cancel_btn").exists() == true) {
                        new CyclonePublic(id,"com.ss.android.ugc.aweme:id/cancel_btn",false,false,"click",0).elemClick();sleep(2500);
                    }
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(id,"com.ss.android.ugc.aweme:id/frj",false,false,"click",0).elemClick();sleep(2500);
                }
                try{
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
    
            }else{
                back();sleep(1200);back();sleep(1200);
                continue startlabel;
            }
            inputMSG();
            if(desc(SiXinMSG).exists() == false){
                setText(SiXinMSG);sleep(800);
                try{
                    new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
                }
            }else{
                toast("当前用户已发送过 不再发送消息")
            }
            back();sleep(2000);back();sleep(2000);
        }catch(error){
            sleep(5000);
            while(text("请完成下列验证后继续:").exists() == true){
                // start();
            }
            stopApp("抖音");
            AppUntil.start("抖音",5000);
            // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(5000);
            click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(5000);
    
            while(text("请完成下列验证后继续:").exists() == true){
                // start();
            }
            if(num == 50){
                stopApp("抖音");
                AppUntil.start("抖音",5000);
                new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
            }
            try{
                setText(itemArray[2]);sleep(3000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    // start();
                }
                setText(itemArray[2]);sleep(3000);
            }
            try{
                // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    
    
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    // start();
                }
                // new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
    
    
            }
            if(text("您今日的搜索次数已达上限").exists() == true){
                toastLog("上限了。结束运行")
                break startlabel;
            }
            if(id("android:id/text1").exists() == true){
                try{
                    new CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }
            }
            if(descMatches(".*抖音号: .*").find()[0].text().split("抖音号: ")[1] != "" ){
                try{
                    click(descMatches(".*抖音号: .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    try{
                        click(descMatches(".*抖音号: .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                    }catch(error){
                        //抖音号不匹配
                        continue;
                    }
                }
            }else{
                toast("抖音号不匹配 继续下一个任务")
                continue;
            }
            //点关注私信
            if(id("com.ss.android.ugc.aweme:id/frj").exists() == true){
                try{
                    new CyclonePublic(id,"com.ss.android.ugc.aweme:id/frj",false,false,"click",0).elemClick();sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(id,"com.ss.android.ugc.aweme:id/frj",false,false,"click",0).elemClick();sleep(2500);
                }
                try{
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
    
            }else if (id("com.ss.android.ugc.aweme:id/ln2").exists() == true){
                try{
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
            }else{
                back();sleep(1200);back();sleep(1200);
                continue startlabel;
            }
            inputMSG();
            if(desc(SiXinMSG).exists() == false){
                setText(SiXinMSG);sleep(800);
                try{
                    new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(1500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        // start();
                    }
                    new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(1500);
                }
            }else{
                toast("当前用户已发送过 不再发送消息")
            }
            back();sleep(1500);back();sleep(1500);
            continue startlabel;
        }
    }
    log('执行结束');
    home();
    
}
