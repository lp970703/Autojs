const wait_time = 2000 //查找及等待间隔时间
const retry_count = 8 //重试次数
const app_name = "支付宝"

/*
clickType 点击类型  click  longClick  doubleClick...
cType 类型   id text className  desc...
cValue 值 
fdOnly 是否唯一 yes or no
p1  不唯一情况用  选择第几个元素 0....9999
count 重试次数
window 是否关闭弹窗   yes 是  其他否
*/


//寻找可点击位置并返回

importClass(com.cyclone.rpadroid.runtime.utils.AutoJsScriptUtils);

function AutoJsException(type,lineNumber,message) {
    this.type = type;
    this.lineNumber = lineNumber;
    this.message = message;
}


function is_install(app_name){
    let install_status = getPackageName(app_name)
    if(install_status == null){
        return false
    }else{
        return true
    }
}

function waitForApp(app_name){
    app_package_name = getPackageName(app_name)
    let now_status = currentPackage(app_package_name)
    if(now_status == app_package_name){
        return true
    }else{
        return false
    }
}
/*
        c_type : text || desc 
        c_value: elem content....
        wait_time: 查找时间以及间隔毫秒
        if is_re == yes,c_value = re_expression 
*/
function wait_elem_appear(c_type,c_value,wait_time,is_re){
    if(is_re == false){
        let status = c_type(c_value).findOne(wait_time);
        if(status != null && status != undefined){
            return true
        }else{
            return false
        }
    }else if(is_re == true){
        if(c_type == text){
            let status = textMatches(c_value).findOne(wait_time);
            if(status != null && status != undefined){
                return true
            }else{
                return false
            } 
        }else if(c_type == desc){
            let status = descMatches(c_value).findOne(wait_time);
            if(status != null && status != undefined){
                return true
            }else{
                return false
            } 
        }
    }
}

function call_back_init(lineNumber){
    let start_app = 1
    while(waitForApp(app_name) == false){
        launchApp(app_name);sleep(wait_time);
        start_app ++
        if(start_app > retry_count){
            //提交运行状态为启动失败  
            //抛异常
            throw new AutoJsException("ExceptionForAPPNoForward",Number(lineNumber),"app未在前台异常");
            // break
        }
    }
}

function AutoJsException(type,lineNumber,message) {
    this.type = type;
    this.lineNumber = lineNumber;
    this.message = message;
}

function call_back_elem(lineNumber,c_type,c_value,wait_time,is_re){
    let elem_data = 1
    while(wait_elem_appear(c_type,c_value,wait_time,is_re) == false){
        sleep(wait_time);
        elem_data ++
        if(elem_data > retry_count){
            throw new AutoJsException("ExceptionForNoExist",lineNumber,"元素不存在");
            // break
        }
    }
}


/*
clickType 点击类型  click  longClick  doubleClick...
cType 类型   id text className  desc...
cValue 值 
fdOnly 是否唯一 yes or no
p1  不唯一情况用  选择第几个元素 0....9999
count 重试次数
window 是否关闭弹窗   yes 是  其他否
*/
function clickBounds(clickType,cType,cValue,fdOnly,p1,is_re){
    if(is_re == true && cType == text){
        cType = textMatches
    }else if(is_re == true && cType == desc){
        cType = descMatches
    }
    if(fdOnly == true){
        if(clickType == "click"){
            var a = cType(cValue).findOne().bounds();
            click(a.centerX(),a.centerY());
            sleep(wait_time);       
        }else if (clickType == "longClick"){
            var a = cType(cValue).findOne().bounds();
            longClick(a.centerX(),a.centerY());
            sleep(wait_time);     
        }else if (clickType == "doubleClick"){
            var a = cType(cValue).findOne().bounds();
            click(a.centerX(),a.centerY());sleep(120);click(a.centerX(),a.centerY());
            sleep(wait_time);
        }
    }else if (fdOnly == false){
        var a = ctype(cValue).find();
        if(p1 == "all"){
            for(i = 0; i < a.length ; i ++){
                b =  ctype[i].bounds();
                if(clickType == "click"){
                   click(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "longclick"){
                    longClick(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "doubleClick"){
                    click(b.centerX(),b.centerY());sleep(100);click(b.centerX(),b.centerY());sleep(100);sleep(wait_time);
                }
            }
        }else{
            for(i = 0; i < p1 ; i ++){
                b =  ctype[i].bounds();
                if(clickType == "click"){
                   click(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "longclick"){
                    longClick(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "doubleClick"){
                    click(b.centerX(),b.centerY());sleep(100);click(b.centerX(),b.centerY());sleep(100);sleep(wait_time);
                }
            }
        }
    }
}

// 点击失败重新点击
function clickElem(clickType,cType,cValue,fdOnly,p1,is_re){
    if(is_re == true && cType == text){
        cType = textMatches
    }else if(is_re == true && cType == desc){
        cType = descMatches
    }
    let num = 0
    let fail_num = 0
    let init_cType = cType
    let init_cValue = cValue
    labelInit:
    while (true){
        if(cType(cValue).exists()){
            if(fdOnly == true){
                let result = cType(cValue).findOne(wait_time)
                while(cType(cValue).findOne(wait_time).clickable() == false){
                    result = result.parent();
                    fail_num ++
                    if(fail_num > 5){
                        clickBounds(clickType,init_cType,init_cValue,fdOnly,p1,is_re);
                        break labelInit;
                    }
                }
                if(clickType == "click"){
                    result.click();
                    break labelInit;
                }else if(clickType == "doubleClick"){
                    result.click();sleep(50);result.click();
                    break labelInit;
                }else if(clickType == "longClick"){
                    result.longClick();
                    break labelInit;
                }
            }else if(fdOnly == false){
                let result = cType(cValue).find()[p1]
                while(cType(cValue).find()[p1].clickable() == false){
                    result = result.parent();
                    fail_num ++
                    if(fail_num > 5){
                        clickBounds(clickType,init_cType,init_cValue,fdOnly,p1,is_re);
                        break labelInit;
                    }
                }
                if(clickType == "click"){
                    result.click();
                    break labelInit;
                }else if(clickType == "doubleClick"){
                    result.click();sleep(50);result.click();
                    break labelInit;
                }else if(clickType == "longClick"){
                    result.longClick();
                    break labelInit;
                }
            }

        }else{
            num += 1;
            toastLog("开始第" + num + "次寻找");
            sleep(wait_time);
            if (num >= retry_count){
                toastLog("找寻元素失败.")
                // exit();
                break labelInit;
            }
        }
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    // var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }else{
        month = month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }else{
        strDate = strDate
    }

    if (date.getHours() >= 0 && date.getHours() <= 9) {
        now_Hours = "0" + date.getHours();
    }else{
        now_Hours = date.getHours()
    }

    if (date.getMinutes() >= 0 && date.getMinutes() <= 9) {
        now_Min = "0" + date.getMinutes();
    }else{
        now_Min = date.getMinutes();
    }
    if (date.getSeconds() >= 0 && date.getSeconds() <= 9) {
        now_Snd = "0" + date.getSeconds();
    }else{
        now_Snd = date.getSeconds();
    }
    var currentdate = date.getFullYear() + seperator1 + month  + seperator1 + strDate + seperator1 + now_Hours + seperator1 +  now_Min + seperator1 + now_Snd
    return currentdate;
}

data = []
result_data = []
result_data.push(["用户姓名","用户账号","检测状态"])
udata = "@{var.udata}"
// udata = "肖建博-15176967791,张燕-15811107195"
read_type = "@{var.read_type}"
// read_type = "input"
file_path = "@{var.file_path}"


let init_num = 1
if(is_install(app_name) == false){
    throw new AutoJsException("ExceptionForNoApp",280,"未安装支付宝")
}

home();launchApp(app_name);sleep(wait_time);
let start_app = 1
while(waitForApp(app_name) == false){
    launchApp(app_name);sleep(wait_time);
    start_app ++
    if(start_app > retry_count){
        //提交运行状态为启动失败  
        //抛异常
        throw new AutoJsException("ExceptionForAPPNoForward",280,"拉起支付宝失败")
        // break
    }
};sleep(wait_time)
let start_idx = 1
while(wait_elem_appear(text,"理财",wait_time,false) == false && wait_elem_appear(text,"口碑",wait_time,false) == false){
    back();sleep(wait_time);
    start_idx ++
    if(start_idx > retry_count){
        throw new AutoJsException("ExceptionForNoExist",280,"未返回支付宝首页")
    }
}

if(read_type == "input"){
    select_udata = udata.split(",")
    for(i = 0;i < select_udata.length; i ++){
        select = select_udata[i].split("-")
        userName = select[0]
        userId = select[1]
        call_back_elem(310,text,'消息',wait_time,false);
        clickElem("click",text,"消息",true,0,false);
        call_back_elem(315,desc,"更多操作",wait_time,false);
        clickElem("click",desc,"更多操作",true,0,false);
        call_back_elem(316,text,"添加朋友",wait_time,false);
        clickElem("click",text,"添加朋友",true,0,false);
        call_back_elem(318,text,"支付宝账号/手机号",wait_time,false)
        clickElem("click",text,"支付宝账号/手机号",true,0,false);
        try{
            setText(userId);sleep(wait_time);
        }catch(error){
            var lin = error.stack.split(":")
            lin = lin[lin.length - 1]
            throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"手机号输入失败")
        }
        call_back_elem(327,text,"搜索：" + userId,wait_time,false);
        clickElem("click",text,"搜索：" + userId,true,0,false)
        if(wait_elem_appear(text,"账号不存在，或对方关闭了“通过手机号找到我”隐私开关",wait_time,false)){
            call_back_elem(330,text,"确 定",wait_time,false);
            clickElem('click',text,"确 定",true,0,false);
            status = "查无此人"
            data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"查无此人"}
            back();sleep(wait_time);back();sleep(wait_time);
            continue;
        }

        call_back_elem(338,text,"转账",wait_time,false);
        clickElem("click",text,"转账",true,0,false);
        call_back_elem(341,"text",/.*\[点此验证\]/,wait_time,true)
        // clickElem("click",text,/.*\[点此验证\]/,true,0,true)
        call_back_elem(346,text,"确认收款人身份",wait_time,false)
        // textMatches(/.*\[点此验证\]/).findOne(wait_time).click();sleep(wait_time)
        try{
            setText(userName);
        }catch(error){
            var lin = error.stack.split(":")
            lin = lin[lin.length - 1]
            throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"输入用户姓名失败")
        }
        call_back_elem(349,text,"确认",wait_time,false);
        clickElem("click",text,"确认",true,0,false);sleep(wait_time)

        if(text("姓名和账户不匹配，为避免转错账，请核对").exists()){
            try{
                call_back_elem(354,text,"确认",wait_time,false)
                clickElem("click",text,"确认",true,0,false)
            }catch(error){
                var lin = error.stack.split(":")
                lin = lin[lin.length - 1]
                throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"点击确认失败")
            }
            data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证失败"}
        }else if(textMatches(/.*\[点此验证\]/).find().length == 0 && text("转到支付宝账户").exists() && text("转账记录").exists()){
            data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证成功"}
        }else{
            data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证失败"}
        }
        try{
            call_back_elem(367,desc,"返回",wait_time,false);
            clickElem("click",desc,"返回",true,0,false);sleep(wait_time)
            back();sleep(wait_time);back();sleep(wait_time);back();sleep(wait_time);
        }catch(error){
            var lin = error.stack.split(":")
            lin = lin[lin.length - 1]
            throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"返回失败")
        }
    }
}else if(read_type == "file"){
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
    for(o = 0;o < result.length;o++){
        if(o != 0){
            userName = result[o][1]
            userId = result[o][0]
            call_back_elem(310,text,'消息',wait_time,false);
            clickElem("click",text,"消息",true,0,false);
            call_back_elem(315,desc,"更多操作",wait_time,false);
            clickElem("click",desc,"更多操作",true,0,false);
            call_back_elem(316,text,"添加朋友",wait_time,false);
            clickElem("click",text,"添加朋友",true,0,false);
            call_back_elem(318,text,"支付宝账号/手机号",wait_time,false)
            clickElem("click",text,"支付宝账号/手机号",true,0,false);
            try{
                setText(userId);sleep(wait_time);
            }catch(error){
                var lin = error.stack.split(":")
                lin = lin[lin.length - 1]
                throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"手机号输入失败")
            }
            call_back_elem(327,text,"搜索：" + userId,wait_time,false);
            clickElem("click",text,"搜索：" + userId,true,0,false)
            if(wait_elem_appear(text,"账号不存在，或对方关闭了“通过手机号找到我”隐私开关",wait_time,false)){
                call_back_elem(330,text,"确 定",wait_time,false);
                clickElem('click',text,"确 定",true,0,false);
                status = "查无此人"
                data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"查无此人"}
                back();sleep(wait_time);back();sleep(wait_time);
                continue;
            }
    
            call_back_elem(338,text,"转账",wait_time,false);
            clickElem("click",text,"转账",true,0,false);
            call_back_elem(341,"text",/.*\[点此验证\]/,wait_time,true)
            clickElem("click",text,/.*\[点此验证\]/,true,0,true)
            call_back_elem(346,text,"确认收款人身份",wait_time,false)
            // textMatches(/.*\[点此验证\]/).findOne(wait_time).click();sleep(wait_time)
            try{
                setText(userName);
            }catch(error){
                var lin = error.stack.split(":")
                lin = lin[lin.length - 1]
                throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"输入用户姓名失败")
            }
            call_back_elem(349,text,"确认",wait_time,false);
            clickElem("click",text,"确认",true,0,false);sleep(wait_time)
    
            if(text("姓名和账户不匹配，为避免转错账，请核对").exists()){
                try{
                    call_back_elem(354,text,"确认",wait_time,false)
                    clickElem("click",text,"确认",true,0,false)
                }catch(error){
                    var lin = error.stack.split(":")
                    lin = lin[lin.length - 1]
                    throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"点击确认失败")
                }
                data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证失败"}
            }else if(textMatches(/.*\[点此验证\]/).find().length == 0 && text("转到支付宝账户").exists() && text("转账记录").exists()){
                data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证成功"}
            }else{
                data[getNowFormatDate()] = {"userName":userName,"userId":userId,"status":"验证失败"}
            }
            try{
                call_back_elem(367,desc,"返回",wait_time,false);
                clickElem("click",desc,"返回",true,0,false);sleep(wait_time)
                back();sleep(wait_time);back();sleep(wait_time);back();sleep(wait_time);
            }catch(error){
                var lin = error.stack.split(":")
                lin = lin[lin.length - 1]
                throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"返回失败")
            }
        }
    }
}

for(i in data){    
    result_data.push([data[i].userName.toString(),data[i].userId.toString(),data[i].status.toString()])
}
path = "\/sdcard\/支付宝" + "-" + getNowFormatDate().toString() + "\.xlsx".replace(/\s*/g,"");
mail_name = path.substr(8,99).split(".xlsx")[0]
AutoJsScriptUtils.setVariable("file_name",path);
AutoJsScriptUtils.setVariable("mail_name",mail_name);
try{
    toast(AutoJsScriptUtils.writeListXlsx(path,result_data));
}catch(error){
    var lin = error.stack.split(":")
    lin = lin[lin.length - 1]
    throw new AutoJsException("ExceptionForNoExist",Number(lin.replace(/[\r\n]/g,"")),"写excel失败")
}
// log(JSON.stringify(result_data))
home();