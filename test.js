const  EncapsulatedFunctionality = function(){
    function EncapsulatedFunctionality(appName,waitTime){
        this.appName = appName
        this.waitTime = waitTime 
    }
    EncapsulatedFunctionality.prototype.startApp = function (){
        if (getPackageName(this.appName) == null){
            throw(this.appName + "app" + "  未安装");
        } 
        home();sleep(this.waitTime);launchApp(this.appName);sleep(this.waitTime);
        // this.appPackageName = getPackageName(this.appName);
        // this.nowPackageName = currentPackage();
        // while(this.appPackageName != this.nowPackageName){
        //     home();sleep(this.waitTime);launchApp(this.appName);sleep(this.waitTime);
        // }
        return
    }
    EncapsulatedFunctionality.prototype.Exists = function (){
        if(this.elemType == text){
            this.strElemType = "text"
        }else if (this.elemType == desc){
            this.strElemType = "desc"
        }else if (this.elemType == className){
            this.strElemType = "className"
        }else if (this.elemType == id){
            this.strElemType = "id"
        }else if(this.elemType == textMatches){
            this.strElemType = "textMatches"
        }else if(this.elemType == descMatches){
            this.strElemType = "descMatches"
        }
        if (this.elemType(this.elemValue).exists() == true){
            return this.elemType(this.elemValue).exists()
        }else{
            throw(this.strElemType + "类型控件  \"" + this.elemValue  + "\"  不存在");
        }
    }
    EncapsulatedFunctionality.prototype.bdsClick = function(){
        // 启用正则表达式的type变化 只支持 text desc  启用正则 value为/\d{1,9}元/
        if(this.re == true){ 
            if (this.elemType == text){
                this.elemType = textMatches
            }else if(this.elemType == desc){
                this.elemType == descMatches
            }
        }
        this.Exists()  //需要点击的控件 当前界面存不存在 不存在抛异常。存在继续执行
        if (this.elemOnly == true){
            this.elem = this.elemType(this.elemValue).find()[0]
        }else if(this.elemOnly == false){
            this.elem = this.elemType(this.elemValue).find()[this.elemPosition]
        }
        if (this.clickType == "click"){
            click(this.elem.bounds().centerX(),this.elem.bounds().centerY());sleep(this.waitTime);
        }
        if(this.clickType == "doubleClick"){
            click(this.elem.bounds().centerX(),this.elem.bounds().centerY());sleep(120);
            click(this.elem.bounds().centerX(),this.elem.bounds().centerY());sleep(this.waitTime);
        }
        if(this.clickType == "longClick"){
            longClick(this.elem.bounds().centerX(),this.elem.bounds().centerY());sleep(this.waitTime);
        }
        return
    }
    EncapsulatedFunctionality.prototype.elemClick = function(elemType,elemValue,re,elemOnly,elemPosition,clickType){
        this.elemType = elemType
        this.elemValue = elemValue
        this.re = re
        this.elemOnly = elemOnly
        this.elemPosition = elemPosition
        this.clickType = clickType
        // 启用正则表达式的type变化 只支持 text desc  启用正则 value为/\d{1,9}元/
        if(re == true){ 
            if (elemType == text){
                this.elemType = textMatches
            }else if(elemType == desc){
                this.elemType == descMatches
            }
        }
        this.Exists()  //需要点击的控件 当前界面存不存在 不存在抛异常。存在继续执行
        if (elemOnly == true){
            this.elem = this.elemType(this.elemValue).find()[0]
        }
        n = 0
        while(this.elem.clickable() == false){
            this.elem = this.elem.parent();
            n ++
            if(n > 5){
                this.bdsClick();
                return EncapsulatedFunctionality
            }
        }

        if (this.clickType == "click"){
            this.elem.click();sleep(this.waitTime);
        }
        if(this.clickType == "doubleClick"){
             this.elem.click();sleep(120);this.elem.click();sleep(this.waitTime);
        }
        if(this.clickType == "longClick"){
            this.elem.longClick();
        }
        return

    }
    EncapsulatedFunctionality.prototype.test = function(){
    }
    EncapsulatedFunctionality.prototype.Back = function(count){
        this.count = count
        for(i = 0;i < this.count;i ++){
            back();sleep(this.waitTime)
        }
    }
    return EncapsulatedFunctionality
}();

// const test = new EncapsulatedFunctionality("企业微信",3000)
// test.startApp()
// test.elemClick(text,"行业资讯",false,true,0,"click") //往上找五层都不能点的 自动去点坐标
// test.Back(2)
