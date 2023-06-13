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

function close_AD(){
    //函数功能 关闭启动广告
    threads.start(function () {
        while(textMatches(/.*跳过.*/).exists() == true){
            new CyclonePublic(text,/.*跳过.*/,true,true,"click",1).elemClick()
            console.log("点击了跳过广告")
        }
    })
    threads.start(function () {
        while(descMatches(/.*跳过.*/).exists() == true){
            new CyclonePublic(desc,/.*跳过.*/,true,true,"click",1).elemClick()
            console.log("点击了跳过广告")
        }
    })
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
threads.shutDownAll();
threads.start(function () {
    var beginBtn;
       if (beginBtn = classNameContains("Bu tton").textContains("立即开始").findOne(2000)) {
           beginBtn.click();sleep(1000)
       }
    if(text("检测到更新").exists() && text("以后再说").exists()){
        text("以后再说").find()[0].click();
    }
});
/**
 * 开始识别
 */
 function start() {
    var img = getScreenImage();sleep(2000)
    if (img) {
        log("截图成功，进行识别滑块！");
    } else {
        log('截图失败，重新截图');
        return;
    };

    var x = getPointX(img,0.7);
    console.info("识别结果滑块X坐标：" + x);
    // swipe(147, 1530, x+270, 1530,800);
    gestures([0, 500, [147, 1530], [x, 1530]],
        [0, 500, [150, 1530], [x, 1530]]);
    sleep(2000);
    return true
}

/**
 * 获取缺口位置的x坐标
 * 传入值 img, 识别精度(precision)
 */
function getPointX(img,precision){
    var xCount = 0;
    var finnalX = 0;
    for(var x = 270; x < 950; x += 5){    //横向遍历像素点，间隔5个像素点
        // var row = "";
        var tempCount = 0
        for(var y = 570; y < 1070; y+=5){      //找到黑点最多的y轴
            if(isBlackPoint(x,y,img,precision)){
                // row +="1";
                tempCount += 1;
            }else{
                // row += "0";
            }
        }
        if( tempCount >= xCount ){
            xCount = tempCount;
            finnalX = x
        }
        // console.log(row);
    }
    return finnalX
}

/**
 * 判断点是否为黑色点
 * 传入值 坐标(x,y), img, 识别精度(precision)
 */
function isBlackPoint(x, y,img,precision) {
    var rgb = images.pixel(img,x,y);    //此时获取到的是ARGB
    var r = (rgb & 0xff0000) >> 16;      //得到R
    var g = (rgb & 0xff00) >> 8;            //得到G
    var b = (rgb & 0xff);                        //得到B
    var criticalValue = 255 * (1 - precision);
    if (r <= criticalValue && g <= criticalValue && b <= criticalValue) {
        return true;
    }
    return false;
}

/**
 * 判断点是否为白色点
 * 传入值 坐标(x,y), img, 识别精度(precision)
 */
function isWhitePoint(x, y,img,precision) {
    var rgb = images.pixel(img,x,y);  //此时获取到的是ARGB
    var r = (rgb & 0xff0000) >> 16;   //得到R
    var g = (rgb & 0xff00) >> 8;        //得到G
    var b = (rgb & 0xff);                    //得到B
    var criticalValue = 255 * precision;
    if (r >= criticalValue && g >= criticalValue && b >= criticalValue) {
        return true;
    }
    return false;
}

/**
 * 使用命令截图，返回imgae对像。
 */
if(!images.requestScreenCapture()){
    log("请求失败");
    exit();
}
function getScreenImage(){

    // var pictures = images.clip(captureScreen(),device.width / 2,420,1038 - device.width / 2,1005 - 420)
    var pictures = captureScreen()
    // pictures = images.grayscale(pictures)
    // pictures = images.threshold(pictures,60,200)
    // images.save(pictures,"/sdcard/pictures.png","png",100)
    return pictures
}

function send_msg(msg){
    if(id("com.ss.android.ugc.aweme:id/ln1").exists() == true){
        try{
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(1200);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/ln1",false,false,"click",0).elemClick();sleep(1200);
        }
        try{
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/o78",false,false,"click",0).elemClick();sleep(2000);
            new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/o78",false,false,"click",0).elemClick();sleep(2000);
            new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
        }
    }else{
        try{
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/o78",false,false,"click",0).elemClick();sleep(2000);
            new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(id,"com.ss.android.ugc.aweme:id/o78",false,false,"click",0).elemClick();sleep(2000);
            new CyclonePublic(text,"发私信",false,false,"click",0).elemClick();sleep(2000);
        }
    }                      
    inputMSG();
    if(desc("亲您好，这里是Molyvivi品牌方，主营科技休闲运动服饰\n公司产品也有众多明星背书 如欧阳娜娜、赵露思、宋茜、吴昕都有过推荐\n这边想跟您合作挂车视频 ，有意向可留vx或者邮哦~").exists() == false){
        setText(msg);sleep(200);
        try{
            new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(desc,"发送",false,false,"click",0).elemClick();sleep(2000);
        }
    }
    return
}
function inputMSG(){
    if(desc("语言").exists() == false){
        className("android.widget.ImageView").find()[className("android.widget.ImageView").find().length - 1].click();sleep(1200)
    }
}
stopApp("抖音");
device.keepScreenOn(30000000 * 1000); //设备常亮
// versionCode = '20.7.0'
var kw = ['打底裤','防晒衣','内衣分享','好物分享']
var history = []
var msg = "亲您好，这里是Molyvivi品牌方，主营科技休闲运动服饰\n公司产品也有众多明星背书 如欧阳娜娜、赵露思、宋茜、吴昕都有过推荐\n这边想跟您合作挂车视频 ，有意向可留vx或者邮哦~"
new StartApp("抖音",3000).start();
new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(2000);


labelstart:
for( j of kw){
    try{
        setText(j);sleep(2000);
        try{
            new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(3000);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(3000);
        }
        if(text("您今日的搜索次数已达上限").exists() == true){
            toastLog("上限了。结束运行")
            break labelstart;
        }
        try{
            new CyclonePublic(text,"视频",false,false,"click",0).elemClick();sleep(3000);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(text,"视频",false,false,"click",0).elemClick();sleep(3000);
        }
        stoplabel:
        while(true){
            elem = id("com.ss.android.ugc.aweme:id/recycler_view").find()[1]
            for(w = 0 ; w < elem.childCount(); w ++){
                if(elem.child(w).text() == "博主"){
                    elem.child(w).click();sleep(2000);
                    break stoplabel;
                }
            }
            if(elem.scrollForward() == false){
                toastLog("没找到博主分类继续下一个关键词");sleep(1200);
                continue labelstart;
            } 
            sleep(2000);
        }
        //进入到博主
        while(true){
            uiElem = id("com.ss.android.ugc.aweme:id/ahl").find()
            labelclick:
            for(o of uiElem){
                if(history.indexOf(o.text()) == -1){
                    try{
                        o.click();sleep(2000);
                    }catch(error){
                        continue labelclick;
                    }   
                    history.push(o.text());
                    try{
                        new CyclonePublic(id,"com.ss.android.ugc.aweme:id/user_avatar",false,false,"click",0).elemClick();sleep(2000);
                    }catch(error){
                        log(error);
                        while(text("请完成下列验证后继续:").exists() == true){
                            start()
                        }
                        new CyclonePublic(id,"com.ss.android.ugc.aweme:id/user_avatar",false,false,"click",0).elemClick();sleep(2000);
                    }
                    
                    fansNum = id("com.ss.android.ugc.aweme:id/rl3").find()[0].text()
                    log(fansNum)
                    if(/\d.*w/.test(fansNum)){
                        //小于三十万私聊
                        if(fansNum.split("w")[0] < 30){
                            //点关注
                            send_msg(msg)
                            back();sleep(1500);back();sleep(1500)
                        }else{
                            if (fansNum > 1000){
                                send_msg(msg)
                                back();sleep(1200);back();sleep(1200)
                            }else{ 
                                back();sleep(1500)
                            }
                        }
                        back();sleep(1500);
                    }
                }
            }
            try{
                id("com.ss.android.ugc.aweme:id/ig0").find()[1].scrollForward();sleep(2000)                                                                                                                                                                    
            }catch(error){
                while(text("请完成下列验证后继续:").exists() == true){
                    start()
                }
                id("com.ss.android.ugc.aweme:id/ig0").find()[1].scrollForward();sleep(2000)                                                                                                                                                                    
            }
            if(text("暂时没有更多了").exists() == true  || text("加载失败，点击重试").exists() ==  true){
                continue labelstart;
            }
        }
    }catch(error){
        stopApp("抖音");
        new StartApp("抖音",5000).start();
        try{
            new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
        }catch(error){
            while(text("请完成下列验证后继续:").exists() == true){
                start()
            }
            new CyclonePublic(desc,"搜索",false,false,"click",0).elemClick();sleep(1500);
        }
        continue labelstart;
    }

}


log("运行成功！！！")

home();
threads.shutDownAll();