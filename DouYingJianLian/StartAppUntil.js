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

module.exports = StartApp;