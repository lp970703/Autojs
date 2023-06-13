
"ui";
runtime.loadJar("./jxl-2.6.12.1.jar")
importClass("java.io.File")
importClass("jxl.Cell")
importClass("jxl.Workbook")
importClass("jxl.JXLException")
importClass("jxl.Sheet")

var ExcelUntil = require('ExcelUntil.js');
var CycloneUntil = require('CycloneUntil.js');
// var ImageUntil = require('ImageUntil.js');
var AppUntil = require('AppUntil.js');


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
                <input id = "InputExcelRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/excel/抖音建联1.xls"></input>
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

let InputExcelRoute = '';
let SiXinMSG = '';
let DouYinNameList = '';

// 3、授予相机拍照权限
// ImageUntil.getRequestScreenCapture();


ui.callback.click(() =>{
    // 取出填写的Excel默认路径,建联话术语句
    InputExcelRoute = ui.InputExcelRoute.text();
    SiXinMSG = ui.SiXinMSG.text();
    console.log('InputExcelRoute:' + InputExcelRoute);
    console.log('SiXinMSG:' + SiXinMSG);
    DouYinNameList = ExcelUntil.handleExcel(InputExcelRoute, 0, 0);

    // 这里需要启用多线程，因为在ui下他会每16ms会执行一次刷新页面，如果直接把sleep这种阻塞线程或者需要长时间回调（例如调接口）这种，
    // 在ui页面上会造成长时间等待，故新启动一个线程去处理这些任务
    threads.start(function () { 
        // 1、返回桌面
        home();
        // 2、打开抖音
        AppUntil.start("抖音",5000);sleep(2000);
        // 3、授予相机拍照权限
        getRequestScreenCapture();
        // 4、查看excel数据是否加载完成
        console.log('DouYinNameList:' +DouYinNameList);
        // 5、执行主函数
        DoMainProcess(DouYinNameList, SiXinMSG);
    })
    threads.shutDownAll();
});  

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

function DoMainProcess(DouYinNameList, SiXinMSG) {
    // // 得到
    // let img = captureScreen();
    // let time = new Date().getTime();
    // let clipImgSrc = "/sdcard/脚本/excel/" + time + ".png";
    // images.save(img, clipImgSrc);
    console.log('开始执行主流程');
    click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    startlabel:
    for(let itemArray = 0; itemArray < DouYinNameList.length; itemArray++) {
        console.log('开始循环');
        try{
            num ++
            // 防止抖音崩溃到主页
            if(num == 50){
                stopApp("抖音");
                AppUntil.start("抖音",5000);
                // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    
            }
            try{
                setText(itemArray[2]);sleep(3000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    ImageUntil.slideRecognition();
                }
                setText(itemArray[2]);sleep(3000);
            }
            try{
                // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    ImageUntil.slideRecognition();
                }
                // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
            }
            if(text("您今日的搜索次数已达上限").exists() == true){
                toastLog("上限了。结束运行")
                break startlabel;
            }
            if(id("android:id/text1").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }
            }
            if(descMatches(".*抖音号: .*").find()[0].text().split("抖音号: ")[1] != "" ){
                try{
                    click(descMatches(".*抖音号:  .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    try{
                        click(descMatches(".*抖音号:  .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
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
            if(id("com.ss.android.ugc.aweme:id/ln1").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(2500);
                }
                try{
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
    
            }else if (id("com.ss.android.ugc.aweme:id/ln2").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
            }else{
                back();sleep(1200);back();sleep(1200);
                continue startlabel;
            }
            inputMSG();
            if(desc(SiXinMSG).exists() == false){
                setText(SiXinMSG);sleep(800);
                try{
                    new CycloneUntil.CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
                }
            }else{
                toast("当前用户已发送过 不再发送消息")
            }
            back();sleep(2000);back();sleep(2000);
        }catch(error){
            sleep(5000);
            while(text("请完成下列验证后继续:").exists() == true){
                ImageUntil.slideRecognition();
            }
            stopApp("抖音");
            AppUntil.start("抖音",5000);
            // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(5000);
            click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(5000);
    
            while(text("请完成下列验证后继续:").exists() == true){
                ImageUntil.slideRecognition();
            }
            if(num == 50){
                stopApp("抖音");
                AppUntil.start("抖音",5000);
                new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
            }
            try{
                setText(itemArray[2]);sleep(3000);
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    ImageUntil.slideRecognition();
                }
                setText(itemArray[2]);sleep(3000);
            }
            try{
                // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(1500);
    
    
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    ImageUntil.slideRecognition();
                }
                // new CycloneUntil.CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);
                click(desc("搜索").find()[0].bounds().centerX(),desc("搜索").find()[0].bounds().centerY());sleep(2000);
    
    
            }
            if(text("您今日的搜索次数已达上限").exists() == true){
                toastLog("上限了。结束运行")
                break startlabel;
            }
            if(id("android:id/text1").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(id,"android:id/text1",false,false,"click",2).elemClick();sleep(1200);
                }
            }
            if(descMatches(".*抖音号: .*").find()[0].text().split("抖音号: ")[1] != "" ){
                try{
                    click(descMatches(".*抖音号:  .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    try{
                        click(descMatches(".*抖音号:  .*").find()[0].bounds().centerX(),descMatches(".*抖音号: .*").find()[0].bounds().centerY());sleep(2500);
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
            if(id("com.ss.android.ugc.aweme:id/ln1").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(2500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(2500);
                }
                try{
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
    
            }else if (id("com.ss.android.ugc.aweme:id/ln2").exists() == true){
                try{
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"更多",false,false,"click",0).elemClick();sleep(2000);
                    new CycloneUntil.CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
                }
            }else{
                back();sleep(1200);back();sleep(1200);
                continue startlabel;
            }
            inputMSG();
            if(desc(SiXinMSG).exists() == false){
                setText(SiXinMSG);sleep(800);
                try{
                    new CycloneUntil.CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(1500);
                }catch(error){
                    while(text("请完成下列验证后继续:").exists() == true){
                        ImageUntil.slideRecognition();
                    }
                    new CycloneUntil.CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(1500);
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

/**
 * 申请截图权限：只需要申请一次
 * *****************这个必须得在main函数里面写新的线程，如果用module导线程会很慢，而且会报错
 */
 function getRequestScreenCapture() {
    // 1、开启线程，找到点击立即开始，并且触发事件（只需要执行一次就可以）
    let thread = threads.start(function () {
    console.log('获取截图权限');
    let beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            beginBtn.click();sleep(1000);
        }
    });

    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    thread.interrupt(); // 停止该线程
}

function inputMSG(){
    if(desc("语言").exists() == false){
        className("android.widget.ImageView").find()[className("android.widget.ImageView").find().length - 1].click();sleep(1200)
    }
}