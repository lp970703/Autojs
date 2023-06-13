importClass(com.cyclone.rpadroid.runtime.utils.AutoJsScriptUtils);


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

function readExcelToCyclone(file_path) {
    var file = AutoJsScriptUtils.readFile(file_path)
    result = []
    var str = ""
    for(i = 0; i < file.length; i ++){
        if(file[i] != undefined && file[i] != ""){
            for(j = 0; j < file[i].length; j++){
                if(file[i][j].length != undefined && file[i][j].length != "" && (j != file[i].length - 1)) {
                    str += file[i][j] + ","
                }else{
                    str += file[i][j]
                }
                if(j == (file[i].length - 1)){
                    if(str != null){
                        result.push(str.split(","))
                    }
                    str = ""
                }
            }
        
        }
    }
    result =  JSON.stringify(result)
    result = JSON.parse(result)
    return result;
}


file_path = "@{var.file_path}";
SiXinMSG = "@{var.SiXinMSG}";
let DouYinNameList = '';

// 取出填写的Excel默认路径,建联话术语句
console.log('file_path:' + file_path);
console.log('SiXinMSG:' + SiXinMSG);
// 1、处理excel数据
try {
    DouYinNameList = readExcelToCyclone(file_path); 
    toastLog("DouYinNameList: " + DouYinNameList);
} catch (error) {
    new AutoJsException("文件加载失败").throw()
}

if (DouYinNameList) {
    // 2、返回桌面
    home();
    // 3、打开抖音
    new StartApp("抖音",5000).start();sleep(2000);
    // 4、查看excel数据是否加载完成
    console.log('DouYinNameList:' +DouYinNameList);
    // 5、执行主函数
    DoMainProcess(DouYinNameList, SiXinMSG);
}


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
