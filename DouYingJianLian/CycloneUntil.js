/**
 * CyclonePublic: 对页面执行操作
 */
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

module.exports = CyclonePublic;