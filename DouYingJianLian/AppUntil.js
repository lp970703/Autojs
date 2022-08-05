/**
 * AppUntil: app相关类
 */

let appUntil = {};


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

/**
 * 开启app
 * @param {*} appName 开启app名称
 * @param {*} waitTime 等待时间
 * @param {*} retryCount 重启次数
 */
appUntil.start = function (appName, waitTime, retryCount) {
    home();launchApp(appName);sleep(waitTime);
    let startApp = 1
    while(this.waitForApp(appName) == false){
        launchApp(appName);sleep(waitTime);
        startApp ++
        if(appName > retryCount){
            //提交运行状态为启动失败  
            //抛异常
            throw new AutoJsException("app启动失败");
            // break
        }
    }
}

/**
 * 获取当前界面运行app 是否期望中的app 返回true 或 false
 * @param {string} appName 
 * @returns 
 */
appUntil.waitForApp = function(appName) {
    let app_package_name = getPackageName(appName)
    let now_status = currentPackage(app_package_name)
    if(now_status == app_package_name){
        return true
    }else{
        return false
    }
}

/**
 * 关闭广告
 */
appUntil.close_AD = function () {
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

/**
 * 关闭app
 * @param {String} 包名
 */
appUntil.stopApp = function (packageName) {
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


module.exports = appUntil;