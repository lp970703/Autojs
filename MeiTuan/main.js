runtime.loadJar("./jxl-2.6.12.1.jar")

importClass("java.io.File")
importClass("java.io.IOException")
importClass("jxl.Workbook")
importClass("jxl.write.Label")
importClass("jxl.write.WritableImage")
importClass("jxl.write.WritableSheet")
importClass("jxl.write.WritableWorkbook")
importClass("jxl.write.WriteException")

/***************************************************************************/
/****************************** 定义常量 ************************************/
/***************************************************************************/
// 定义常量
// //wait_time参数
const wait_time = 2000 //查找及等待间隔时间
const retry_count = 5 //重试次数
//app_name参数
const app_name = "美团" //app名称
//clickType参数
const cyclone_click = "click" //单击
const cyclone_doubleClick = "doubleClick" //双击
const cyclone_longClick = "longClick" //长按
//cType参数
const cyclone_text = text //文本控件
const cyclone_desc = desc //描述控件
const cyclone_className = className //class控件
const cyclone_id = id //id控件

//is_re参数
const cyclone_re = true //启用正则
const cyclone_notRe = false //不启用正则

//fdOnly参数
const cyclone_findOnly = true //元素在当前界面唯一
const cyclone_notfindOnly = false //元素在当前界面不唯一

// getType参数
const cyclone_get_postion_number = "number" //获取位置
const cyclone_get_postion_elem = "elem" //获取元素

// 登陆账号密码
const loginParam = {
    userName: "Lupeng",
    phoneCode: "15534001372",
}

// 特殊常量
const orderAllDesc = ["全部商品", "商品"]; // 形容"商品"的名词，因为优先店铺里面点进去有的是"商品"，有的是"全部商品"。全部商品一定要在商品前面

// 输出的数据
// const resPath = "./resData.json";
// let res = [];
const ImgPath = '/sdcard/脚本/Img/Img';
const excelPath = '/sdcard/脚本/excel/lopez.xls'
let resExcel = [];
let resExcelHead = ["商品名称", "月售", "价格", "商品图片"];
resExcel.push(resExcelHead);
// 创建图片保存位置
createFolder(ImgPath);
// 创建excel保存路径
createFolder(excelPath);




/***************************************************************************/
/****************************** 写入要爬的参数文档 ***************************/
/***************************************************************************/
// 要搜索的参数文档
let paramsPath = "./paramsData.json";
// 将参数文档先写入json中
let paramsJson = [
    {
        "门店ID": "I0000DN17092653623452",
        "区域": "South",
        "城市群": "中山",
        "城市": "江门",
        "KA": "其他",
        "渠道": "GT",
        "店型": "SM",
        "门店名称": "台山昌大昌",
        "门店地址": "广东省江门市台山市台城区舜德路131号昌大昌广场",
        "经度": 112.8262868,
        "纬度": 22.2442347,
        "平台": "美团外卖",
        "O2O ID": "M1000080068356960",
        "商家名": "昌大昌超市（台山店）",
        "地址": "台山市台城舜德路133号金茂广场E座二、三楼"
    },
    {
        "门店ID": "I0007041A000086807",
        "区域": "East SH",
        "城市群": "无锡",
        "城市": "南通",
        "KA": "其他",
        "渠道": "GT",
        "店型": "SM",
        "门店名称": "南通如东中汇文峰购物广场",
        "门店地址": "南通市,如东县,掘港镇,井岗山路与黄海路交叉口东南50米",
        "经度": 121.1759428,
        "纬度": 32.3519147,
        "平台": "美团外卖",
        "O2O ID": "M1000174557595828",
        "商家名": "文峰购物广场（农场店）",
        "地址": "如东经济开发区黄河路中汇商务广场54-1商业楼一、二、三层"
    },
    {
        "门店ID": "B178M098N17092741525609",
        "区域": "West South",
        "城市群": "成都",
        "城市": "资阳",
        "KA": "永辉",
        "渠道": "MT",
        "店型": "SM",
        "门店名称": "四川永辉超市有限公司安岳中央时代广场店",
        "门店地址": "资阳市安岳县安岳大道与秦九韶路交汇处东北角",
        "经度": 105.3527678,
        "纬度": 30.1010557,
        "平台": "美团外卖",
        "O2O ID": "M1000191737481669",
        "商家名": "永辉超市(中央时代广场店）",
        "地址": "资阳市安岳县柠都大道中央时代广场"
    },
    {
        "门店ID": "B178BUN17082845726587",
        "区域": "South",
        "城市群": "深圳",
        "城市": "深圳",
        "KA": "永辉",
        "渠道": "MT",
        "店型": "SM",
        "门店名称": "永辉-深圳市乐汇城店",
        "门店地址": "广东省深圳市龙岗区坂田街道吉华路",
        "经度": 114.0619,
        "纬度": 22.6341,
        "平台": "美团外卖",
        "O2O ID": "M1000208919392412",
        "商家名": "百佳永辉超市(乐汇城店)",
        "地址": "深圳市龙岗区坂田街道吉华路999号坂田商业广场二楼(永辉超市收货处)"
    },
    {
        "门店ID": "B1010A064B0173",
        "区域": "North BJ",
        "城市群": "北京",
        "城市": "北京",
        "KA": "物美",
        "渠道": "MT",
        "店型": "HM",
        "门店名称": "物美新街口店",
        "门店地址": "北京市西城区新街口豁口新华百货地下一层",
        "经度": 116.3707258,
        "纬度": 39.9478527,
        "平台": "美团外卖",
        "O2O ID": "M1000226097264624",
        "商家名": "物美（新街口店）",
        "地址": "北京市西城区新街口豁口新华百货地下一层"
    },
    {
        "门店ID": "I00079N12090438164281",
        "区域": "East SH",
        "城市群": "无锡",
        "城市": "苏州",
        "KA": "苏果",
        "渠道": "MT",
        "店型": "HM",
        "门店名称": "苏果华润万家(吴江汾湖店)",
        "门店地址": "苏州市,吴江市,汾湖镇,杭州路368号",
        "经度": 120.8556,
        "纬度": 31.03089,
        "平台": "美团外卖",
        "O2O ID": "M1000256164015371",
        "商家名": "华润万家（吴江汾湖店）",
        "地址": "江苏省苏州市吴江区汾湖镇杭州路368号"
    },
    {
        "门店ID": "I000NFN19031837457271",
        "区域": "West South",
        "城市群": "昆明",
        "城市": "丽江",
        "KA": "丽客隆连锁",
        "渠道": "GT",
        "店型": "SM",
        "门店名称": "丽客隆中心店",
        "门店地址": "丽江市古城区香格里道1149号",
        "经度": 100.2221338,
        "纬度": 26.873327,
        "平台": "美团外卖",
        "O2O ID": "M1000264751938793",
        "商家名": "丽客隆超市（中心店）",
        "地址": "云南省丽江市古城区西安街道香格里大道中段1149号"
    },
    {
        "门店ID": "B008R034N20090249779733",
        "区域": "Center",
        "城市群": "衡阳",
        "城市": "邵阳",
        "KA": "湖南步步高连锁",
        "渠道": "MT",
        "店型": "SM",
        "门店名称": "步步高邵阳中环国际广场店",
        "门店地址": "湖南省邵阳市邵阳县白虎街中环国际广场",
        "经度": 111.2804198,
        "纬度": 26.9967677,
        "平台": "美团外卖",
        "O2O ID": "M1000307701593615",
        "商家名": "步步高（邵阳中环国际店）",
        "地址": "白虎街中环国际负一楼108号"
    },
    {
        "门店ID": "B0930DN12092854189359",
        "区域": "South",
        "城市群": "中山",
        "城市": "江门",
        "KA": "万佳",
        "渠道": "MT",
        "店型": "SM",
        "门店名称": "华润万家大超-东方豪园店",
        "门店地址": "台山市环市东路50号(东方豪苑旁)",
        "经度": 112.8067,
        "纬度": 22.24457,
        "平台": "美团外卖",
        "O2O ID": "M1000320588521865",
        "商家名": "华润万家（台山东门店）",
        "地址": "台山市台城环市东路50号裙楼138.139.202.301号"
    },
    {
        "门店ID": "B147AEN13060740846812",
        "区域": "East SH",
        "城市群": "合肥",
        "城市": "合肥",
        "KA": "世纪联华",
        "渠道": "MT",
        "店型": "HM",
        "门店名称": "世纪联华巢湖长江路店",
        "门店地址": "安徽省巢湖市居巢区长江路与向阳路交叉口",
        "经度": 117.8788218,
        "纬度": 31.6123287,
        "平台": "美团外卖",
        "O2O ID": "M1000599759403905",
        "商家名": "世纪联华（巢湖长江路店）",
        "地址": "安徽省巢湖市长江东路111号天巢国际购物广场"
    },
    {
        "门店ID": "I0001IN19122361662489",
        "区域": "North QD",
        "城市群": "济南",
        "城市": "德州",
        "KA": "其他",
        "渠道": "GT",
        "店型": "SM",
        "门店名称": "德百超市乐陵店",
        "门店地址": "山东德州市乐陵市五洲西大道435号",
        "经度": 117.1849498,
        "纬度": 37.7226177,
        "平台": "美团外卖",
        "O2O ID": "M1000848867507636",
        "商家名": "乐陵德百广场(超市）",
        "地址": "山东省德州市乐陵市五洲西大道435号"
    },
    {
        "门店ID": "I000QDN18082355947403",
        "区域": "Center",
        "城市群": "武汉",
        "城市": "襄阳",
        "KA": "好邻居",
        "渠道": "GT",
        "店型": "SM",
        "门店名称": "好邻居超市(南国店)",
        "门店地址": "襄阳市樊城区长虹路沃尔玛斜对面泛悦城负一楼",
        "经度": 112.136895,
        "纬度": 32.041429,
        "平台": "美团外卖",
        "O2O ID": "M1000947653756720",
        "商家名": "好邻居超市（泛悦店）",
        "地址": "湖北省襄阳市樊城区长虹路28号南国广场泛悦Mall负1楼"
    },
    {
        "门店ID": "B0668IN16121265120565",
        "区域": "North QD",
        "城市群": "青岛",
        "城市": "威海",
        "KA": "山东家家悦",
        "渠道": "MT",
        "店型": "SM",
        "门店名称": "山东家家悦威海丰禾国际店",
        "门店地址": "威海经济区青岛中路256号",
        "经度": 122.1540628,
        "纬度": 37.4100387,
        "平台": "美团外卖",
        "O2O ID": "M1000964831639046",
        "商家名": "家家悦（丰禾国际店）",
        "地址": "山东省威海市经济技术开发区西苑办事处青岛中路256号负一层"
    }
]
files.write(paramsPath, JSON.stringify(paramsJson),"utf-8");
sleep(1000);
// params为入参，要搜索的门店信息等等
let paramsData = JSON.parse(files.read(paramsPath));



/***************************************************************************/
/****************************** 具体执行流程 ********************************/
/***************************************************************************/
// 一、打开美团
console.log("打开美团");
call_back_init(38);
console.log("打开美团成功");



// files.create("./Imga");

// 二、进入美团，点击我的，进行登录
// loginInit(loginParam);


// 三、按照paramsData入参文档进行循环遍历搜索指定店铺
findStore(paramsData);

// 四、将导出的数据写入到手机本地文件中
// files.write(resPath, JSON.stringify(res),"utf-8");
console.log('导出数据成功');
// // 五、关闭
threads.shutDownAll();




/***************************************************************************/
/****************************** 具体执行方法实现 *****************************/
/***************************************************************************/
/**
 * 初始化app
 * @param {number} lineNumber 报错行数
 */
function call_back_init(lineNumber){
    home();launchApp(app_name);sleep(wait_time);
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

/**
 * 登录通用模板
 * @param {object} loginParam 登录账号的入参
 * @param {string} loginParam.userName 用户名
 * @param {string} loginParam.phoneCode 手机号
 */
function loginInit(loginParam) {
    clickBounds(cyclone_click,cyclone_desc,"我的",cyclone_findOnly,null,cyclone_re);
    // 登录最先看是否出现让你登录的弹框
    if(id("operator_login_dialog_checkbox").exists()) {
        clickBounds(cyclone_click,cyclone_id,"operator_login_dialog_checkbox",cyclone_findOnly,null,cyclone_notRe);
        clickBounds(cyclone_click,cyclone_text,"本机号码一键登录",cyclone_findOnly,null,cyclone_re);
    } else {
        clickBounds(cyclone_click,cyclone_text,"点击登录",cyclone_findOnly,null,cyclone_re);
        // 判断是否需要登录
        if (text("换号").exists() == true) {
            // 1、手机号一键登录——"本机号码一键登录"
            clickBounds(cyclone_click,cyclone_id,"passport_mobile_operator_checkbox",cyclone_findOnly,null,cyclone_notRe);
            // clickBounds(cyclone_click,cyclone_text,"本机号码一键登录",cyclone_findOnly,null,cyclone_re);
        } else {
            // 2、需要进行手机号+验证码登录
            cyclone_text("请输入手机号").findOne().setText(loginParam.phoneCode);
            clickBounds(cyclone_click,cyclone_id,"dynamic_checkbox",cyclone_findOnly,null,cyclone_notRe);
            clickBounds(cyclone_click,cyclone_text,"获取短信验证码",cyclone_findOnly,null,cyclone_re);
        }
    }
}

function findStore() {
    // 1、遍历从城市开始选起，index为遍历的城市
    // for(let index = 1; index < paramsData.length; index++) {
        const storeName = paramsData[1]["商家名"];
        // 1、选择位置收货地址（不选择收货地址，直接输入店名找不到那座城市的商家）
        selectAddress(1); sleep(2000);
        // 2、选择具体的store名称，并找到全部商品
        const depth = selectStore(1); sleep(2000); // 这里的等待是因为有点击全部商品，有加载的过程
        // const depth = 16;
        // 3、遍历左边的tab页面，并且开始拿右边的商品
        findGoodsData(depth);
        sleep(1000);
        writeExcel(excelPath, resExcel, storeName);
    // }
}

/**
 * 选择收货地址
 * @param {number} index 
 */
function selectAddress(index) {
    console.log("1.1 点击外卖");
    className("android.view.View").desc("外卖").findOne().click();
    // if(desc("关闭").exists() == true) {
    //     desc("关闭").find()[0].click();
    //     console.log("1.2 关闭广告弹框")
    // }

    console.log("1.3 点击选择收货地址");
    clickElem(cyclone_click,cyclone_id,"actionbar_txt",cyclone_findOnly,null,cyclone_notRe);
    clickElem(cyclone_click,cyclone_id,"wm_address_city_location_arrow",cyclone_findOnly,null,cyclone_notRe);
    // clickBounds(cyclone_click,cyclone_text,"输入城市名进行搜索",cyclone_findOnly,null,cyclone_re);
    
    console.log("1.4 输入城市名进行搜索");
    clickElem(cyclone_click,cyclone_text,"输入城市名进行搜索",cyclone_findOnly,null,cyclone_notRe); 
    cyclone_text("输入城市名进行搜索").findOne().setText(paramsData[index]["城市"]);
    call_back_elem(cyclone_text,paramsData[index]["城市"],wait_time,false);
    sleep(wait_time);// 需要等一下保险点
    clickElem(cyclone_click,cyclone_text,paramsData[index]["城市"],cyclone_notfindOnly,1,cyclone_re);
    
    console.log("1.5 请输入收货地址");
    call_back_elem(cyclone_id,"address_search_map_txt",wait_time,false);
    clickElem(cyclone_doubleClick,cyclone_className,"android.widget.EditText",cyclone_findOnly,null,cyclone_notRe); // 这里需要点击一下，点击了他才有能找到的地址的弹框
    cyclone_text("请输入收货地址").findOne().setText(paramsData[index]["商家名"]); sleep(wait_time);
    // 方案一：通过人机来做
    toast("请找到相应的收获地址,并点击该地址后自动返回");
    sleep(3000);
    // 下面做法失败，点击不到搜索框
    // console.log(call_back_elem(cyclone_text,paramsData[index]["商家名"],wait_time,false));
    // if (call_back_elem(cyclone_text,paramsData[index]["商家名"],wait_time,false)) {
    //     clickElem(cyclone_click,cyclone_text,paramsData[index]["商家名"],cyclone_notfindOnly,1,cyclone_re); // 这一步出不来
    // }
}

/**
 * 按照商店名称，进入商店
 * @param {number} index 
 */
function selectStore(index) {
    console.log("2.1 搜索商店");
    clickElem(cyclone_click,cyclone_id,"search_icon",cyclone_findOnly,null,cyclone_notRe); // 点击放大镜
    clickElem(cyclone_click,cyclone_id,"txt_search_keyword_container",cyclone_findOnly,null,cyclone_notRe); sleep(1000);// 点击搜索
    setText(paramsData[index]["商家名"]); sleep(1000);
    call_back_elem(cyclone_text,"搜索",wait_time,false); // 判断是否有"搜索"两字
    clickElem(cyclone_click,cyclone_text,"搜索",cyclone_findOnly,null,cyclone_notRe); // 点击搜索
    className("android.widget.TextView").text(paramsData[index]["商家名"]).findOne().click(); sleep(1000);

    console.log("2.2 进入商店");
    call_back_elem(cyclone_text,paramsData[index]["商家名"],wait_time,false); // 判断是否有指定的商家店名，有的话直接点击
    clickElem(cyclone_click,cyclone_text,paramsData[index]["商家名"],cyclone_notfindOnly,1,cyclone_notRe); // 点击搜索
    sleep(3000);
    const targetData = matchKeywordsExit(cyclone_id, "tab_item_text", wait_time, false, orderAllDesc);
    console.log("targetData: "+targetData);
    for (let key in targetData) {
        if (Object.hasOwnProperty.call(targetData, key) && targetData[key] === true) {
            clickElem(cyclone_click,cyclone_text,key,cyclone_findOnly,null,cyclone_notRe); // 判断key（"全部商品"or"商品"）所对应的值为true，点击那个页面元素有这个key的
            if (key == '全部商品') {
                console.log('进入全部商品循环模板');
                return 14 // 需要把这个key返回出来，方便知道哪个页面，"全部商品"和"商品"这两个页面所存在的控件深度不一致，故需要统一做处理
            } else if (key == '商品') {
                console.log('进入商品循环模板');
                return 16
            }
        }
    }
}

function findGoodsData(depth) {
    console.log("3.寻找页面左边的tab框");
    console.log('depth: '+depth);
    getRequestScreenCapture();
    const childCount = className("android.support.v7.widget.RecyclerView").depth(depth).findOne().childCount();
    for(let i = 0; i < childCount - 1; i++) {
        let pageNum = i + 1; // 左边栏的行数
        console.log("3."+ pageNum +"寻找页面左边的tab框");
        if(className("android.support.v7.widget.RecyclerView").depth(depth).findOne().child(i)) {
            console.log("点击第 "+ pageNum +" 栏");
            className("android.support.v7.widget.RecyclerView").depth(depth).findOne().child(i).click();
            console.log("搜索第 "+ pageNum +" 栏关键字, 并抓取带关键字的商品信息");
            sleep(2000);// 点击的时候需要等他的页面出来
            // 爬取数据（图片+商品）
            findItemGoodsData(pageNum);
        } else {
            console.log("数据整理完毕");
            break;
        }
    }
    console.log("我已经跳出循环了");
    // 连续推出三次直到外卖页首页
    back(); sleep(wait_time);
    back(); sleep(wait_time);
    back(); sleep(wait_time);
    back(); sleep(wait_time);
}

function findItemGoodsData(pageNum) {
    console.log("开始截第" + pageNum +" 栏屏幕");
    // 1.开始截屏
    let img = getImages();
    for(let x=0; x < 4; x++) {
        console.log("第："+x+"个");
        // let b = {};
        let resExcelBody = [];
        // 1、获取商品文字信息
        if (id("com.sankuai.meituan:id/txt_stickyfoodList_adapter_food_name").find()[x]) {
            // b.name = id("com.sankuai.meituan:id/txt_stickyfoodList_adapter_food_name").find()[x].text();
            // b.sale = id("com.sankuai.meituan:id/tv_stickyfood_sold_count").find()[x].text();
            // b.price = id("com.sankuai.meituan:id/txt_stickyfoodList_adapter_food_price_fix").find()[x].text();
            resExcelBody.push(id("com.sankuai.meituan:id/txt_stickyfoodList_adapter_food_name").find()[x].text());
            resExcelBody.push(id("com.sankuai.meituan:id/tv_stickyfood_sold_count").find()[x].text());
            resExcelBody.push(id("com.sankuai.meituan:id/txt_stickyfoodList_adapter_food_price_fix").find()[x].text());
            // res.push(b);
            sleep(1000);
            console.log(resExcelBody);
            resExcel.push(resExcelBody);
        } else {
            break;
        }
        // 2、获取商品图片信息
        if (id("com.sankuai.meituan:id/img_stickydish_pic").find()[x]) {
            let clipImgBounds = id("com.sankuai.meituan:id/img_stickydish_pic").find()[x].bounds()
            let clipImg = images.clip(img, clipImgBounds.left, clipImgBounds.top, clipImgBounds.width(), clipImgBounds.height()); sleep(1000);
            let clipImgSrc = "/sdcard/脚本/Img/"+resExcelBody[0].split(/[\*\/]/)[0]+".png";
            resExcelBody.push(clipImgSrc);
            console.log("clipImgSrc: " + clipImgSrc);
            images.save(clipImg, clipImgSrc);
            sleep(1000);
            console.log('截图完成');
        } else {
            break;
        }
    }
    // img.recycle(); // 尝试将图片回收
}

/**
 * 得到该页面的指定控件的图片
 * 思路：通过截整张图，然后找到这张图所要的那个控件的坐标，在进行剪裁形成的最终图片，再按照图片对应的商品名称将图片保存到本地文件中
 */
function getImages() {
    sleep(2000);
    // 3、进行截图
    console.log("开始截图")
    let img = captureScreen();
    sleep(2000);
    return img;
}

/**
 * 申请截图权限：只需要申请一次
 */
function getRequestScreenCapture() {
    // 1、开启线程，找到点击立即开始，并且触发事件（只需要执行一次就可以）
    let thread = threads.start(function () {
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




/***************************************************************************/
/****************************** 通用方法包装 ********************************/
/***************************************************************************/
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

/**
 * 判断当前界面元素是否存在 返回true 或false 代表存在与不存在
 * @param {Function} cType 如果is_re为false  支持 id、desc、text、className 等等 反之只支持text、desc.  (type func) 
 * @param {String} cValue 点击的具体元素 例如"我的"
 * @param {Number} wait_time 等待的时间（全局常量）
 * @param {Boolean} is_re 是否启用正则
 * @returns 
 */
function wait_elem_appear(cType,cValue,wait_time,is_re){
    if(is_re == false){
        var status = cType(cValue).findOne(wait_time);
    }else if(is_re == true){
        if(cType == "text"){
            var status = textMatches(cValue).findOne(wait_time);
        }else if(cType == "desc"){
            var status = descMatches(cValue).findOne(wait_time);
        }
    }
    if(status != null && status != undefined){
        return true
    }else{
        return false
    } 
}

/**
 * 如果元素存在返回 true 如果不存在 则等待常量wait_time毫秒, 重新尝试获取. 如果超过常量 retry_count次 则返回不存在
 * @param {Function} cType 如果is_re为false  支持 id、desc、text、className 等等 反之只支持text、desc.  (type func) 
 * @param {String} cValue 点击的具体元素 例如"我的"
 * @param {Number} wait_time 等待的时间（全局常量）
 * @param {Boolean} is_re 是否启用正则
 * @returns 
 */
function call_back_elem(cType, cValue, wait_time, is_re){
    let elem_data = 1
    while(wait_elem_appear(cType, cValue, wait_time, is_re) == false){
        sleep(wait_time);
        elem_data ++
        console.log("elem_data: "+elem_data);
        if(elem_data > retry_count){
            throw new AutoJsException("ExceptionForNoExist","111","元素不存在");
            // break
            // return false
        }
    }
    return true
}

/**
 * 判断keyWords数组，该页面是否有这个数组中全部的元素，有的元素返回true，没有的返回false，返回结果是object
 * @param {Function} cType 如果is_re为false  支持 id、desc、text、className 等等 反之只支持text、desc.  (type func) 
 * @param {String} cTypeValue 根据要查的cType来找的指定的value，eg：cType为id、那么cTypeValue就是id里面要传的参数
 * @param {Number} wait_time 等待的时间（全局常量）
 * @param {Boolean} is_re 是否启用正则
 * @param {Array} keyWords 要匹配的关键字数组
 * @return {object} key:要查的元素，value：要查的结果，存在为true，不存在为false
 */
function matchKeywordsExit(cType, cTypeValue, wait_time, is_re, keyWords) {
    let res = {};
    const array = cType(cTypeValue).find();
    for (let value of keyWords) {
        console.log("item: "+value);
        for (let item of array) {
            if (item.text() == value) {
                res[value] = true; 
                break;
            } else {
                res[value] = false;
            }
        }
    }
    console.log("要查的结果: "+res);
    return res;
}
/**
 * 点击元素的通用功能
 * @param {String} clickType 点击的类型: 1、"click"：点击；2、"longClick"：长按点击；3、"doubleClick"：双击。
 * @param {Function} cType 如果is_re为false  支持 id、desc、text、className 等等 反之只支持text、desc.  (type func) 
 * @param {String} cValue 点击的具体元素 例如"我的"
 * @param {Boolean} fdOnly 点击cValue的元素是否唯一
 * @param {String} p1 遍历元素的类型：1、"all":表示所有的都要点击一遍
 * @param {Boolean} is_re 是否启用正则
 */
function clickBounds(clickType,cType,cValue,fdOnly,p1,is_re){
    if(is_re == true && cType == text){
        cType = textMatches
    }else if(is_re == true && cType == desc){
        cType = descMatches
    }
    if(fdOnly == true){
        var a = cType(cValue).findOne().bounds();
        console.log("a:"+a);
        if(clickType == "click"){
            click(a.centerX(),a.centerY());
            sleep(wait_time);       
        }else if (clickType == "longClick"){
            longClick(a.centerX(),a.centerY());
            sleep(wait_time);     
        }else if (clickType == "doubleClick"){
            click(a.centerX(),a.centerY());sleep(120);click(a.centerX(),a.centerY());
            sleep(wait_time);
        }
    }else if (fdOnly == false){
        var a = cType(cValue).find();
        if(p1 == "all"){
            for(i = 0; i < a.length ; i ++){
                b =  cType[i].bounds();
                if(clickType == "click"){
                    click(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "longclick"){
                    longClick(b.centerX(),b.centerY());sleep(wait_time);
                }else if(clickType == "doubleClick"){
                    click(b.centerX(),b.centerY());sleep(100);click(b.centerX(),b.centerY());sleep(100);sleep(wait_time);
                }
            }
        }else{
            b = cType(cValue).find()[p1].bounds();
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

// 点击失败重新点击次数的
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
                while(result.clickable() == false){
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
                // console.log("aaa"+result);
                // console.log("bbb"+cType(cValue).find());
                while(result && result.clickable() == false){
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
            // toastLog("开始第" + num + "次寻找");
            sleep(wait_time);
            if (num >= retry_count){
                // toastLog("找寻元素失败.")
                // exit();
                break labelInit;
            }
        }
    }
}

/**
 * 将数组对象中，把目标的key里面的value值筛选出来，返回一个新数组
 * @param {Array} targetArray 
 * @param {String} targetKey 
 * @return {Array} 返回目标数组
 */
function findTargetKey(targetArray, targetKey) {
    const res = [];
    for (let item of targetArray) {
        for (let key in item) {
            if (Object.hasOwnProperty.call(item, key) && key == targetKey) {
                res.push(item[key]);              
            }
        }
    }
    return res;
}

/**
 * 定义异常类型
 * @param {*} type 
 * @param {*} lineNumber 
 * @param {*} message 
 */
function AutoJsException(type,lineNumber,message) {
    this.type = type;
    this.lineNumber = lineNumber;
    this.message = message;
}

/**
 * 创建文件夹
 * @param {string} path 创建文件夹的路径
 */
function createFolder(path) {
    let file_path = files.createWithDirs(path);
    if (file_path) {
        console.log("创建文件夹成功");
    } else {
        console.log("创建文件夹失败");
    }
}

// /**
//  * 起一个进程，监控关闭所有广告
//  */
// function closeAD() {
//     //函数功能 关闭启动广告
//     threads.start(function () {
//         while(true){
//             if(id("bottom_center_close_button").exists() == true){
//                 id("bottom_center_close_button").find()[0].click();
//                 console.log("关闭广告")
//             }
//         }
//     })
// }

/**
 * 将爬下来的数据写入到excel中
 * @param {String} excelPath 要写入的excel的路径 
 * @param {Array} resExcel 要写入的excel的结果数据
 * @param {String} storeName sheet名字（暂定每家店铺的商家名）
 */
function writeExcel(excelPath, resExcel, storeName) {
    console.log("excelPath: "+excelPath);
    console.log("resExcel: "+resExcel);
    let xlsFile = new File(excelPath);
    // 创建一个工作簿
    let workbook = Workbook.createWorkbook(xlsFile);
    // 创建一个工作表
    let sheet = workbook.createSheet(storeName, 0);
    for (var row = 0; row < resExcel.length; row++) {
        for (var col = 0; col < resExcel[row].length; col++) {
            if (row !== 0 && col == 3) {
                // 图片写入
                console.log("resExcel[row][col]:" + resExcel[row][col])
                sheet.addImage(new WritableImage(col, row, 1, 1, new File(resExcel[row][col])));
            } else {
                // 文本写入
                console.log("resExcel[row][col]:" + resExcel[row][col])
                // 向工作表中添加数据
                sheet.addCell(new Label(col, row, resExcel[row][col]));
            }
        }
    }
    workbook.write();
    workbook.close();
    console.log("写入完成");
}
