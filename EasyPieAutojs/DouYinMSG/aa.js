"ui";

var QQ = "2129670";
//上面改成你的QQ
//改了直接触发暗装。自动跟你手机加文件
var QQ群 = "807052";
//上面改成你的QQ群
var 软件名 = "幸福养猪场"
var 包名 = "com.yz.xfyzc2"
var tx = "https://z3.ax1x.com/2021/04/25/czQCtA.png" //头像
var tx1 = "https://z3.ax1x.com/2021/07/15/WexzIH.png"
var 下载地址 = "https://wwe.lanzoui.com/ihhDxwrubvg"
var 低保合集 = "https://note.youdao.com/s/GtS33Zdf"

//res是文件夹放背景图是倾城图片png是后面的bg="file://res/倾城.png">

//下面是暗装，不懂的别乱改QQ号和QQ群
//改了的运行会给你手机加文件
//脚本群128收人
//群文件有教程怎么改
//希望你别破解
//如果需要进群联系QQ:2129670191
/*
if (md5(QQ) == "88aba4de8d9a05fcb78f404e17507ca9") {
    //log("正常运行")
} else {
    toastLog("软件已被破解,将于10秒后爆炸")
    for (var a = 1; a <= 500; a++) {
        var text = "希望你记住倾城"
        var path = "/sdcard/" + text + "/"
        files.createWithDirs(path)
        files.createWithDirs(path + text + a + ".txt")
        files.write(path + text + ".txt", "希望你记住倾城")
    }

}

if (md5(QQ群) == "279069e70b7060540d9943b33581709e") {
    //   log("正常运行")
} else {

    for (var a = 1; a <= 500; a++) {
        toastLog("软件已被破解,已锁定本机型号。正在拍照上传云端")
        sleep(random(100, 200))
    }

}

*/


ui.layout(
    <vertical

        bg="?attr/selectableItemBackground" clickable="true" bg="#ADEAEA">






        <vertical>

            <toolbar w="*" h="auto" >
                <text id="toolbar" text={软件名} layout_gravity="center" textSize="24sp" textColor="#000000" typeface="monospace" />
                <img


                    id="kjid"
                    w="40"
                    h="40"
                    margin="20 0"
                    scaleType="fitXY"
                    circle="true"
                    layout_gravity="left"
                    src="{{tx}}" />
                <img
                    id="duck"
                    w="40"
                    h="40"
                    margin="20 0"
                    scaleType="fitXY"
                    circle="true"
                    layout_gravity="right"
                    src="{{tx1}}" />

            </toolbar>


        </vertical>

        <horizontal>
            <text text="说明：" textColor="#ed1941" />
            <TextView id="tv_text" singleLine="true" ellipsize="marquee" focusable="true" text="本脚本为免费脚本!如果你从别的地方购买证明你已上当!点右上角可以QQ群免费脚本群!" textColor="#ed1941" />
        </horizontal>


        <card w="*" h="40" cardBackgroundColor="#000000" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="3dp">
            <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                <linear orientation="horizontal">

                    <Switch id="autoService" text="无障碍服务" w="150" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
                    <Switch id="cs" textSize="11sp" layout_weight="1" hint="点击左边按钮转跳到 开启无障碍" gravity="center" w="18" singleLine="true" />

                </linear>

            </card>



        </card>
        <card w="*" h="40" cardBackgroundColor="#000000" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="3dp">
            <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                <linear orientation="horizontal">

                    <Switch id="xfc" text="悬浮窗权限" w="150" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
                    <Switch id="cs" textSize="11sp" layout_weight="1" hint="仅需要开启1次此后可无视该开关" gravity="center" w="18" singleLine="true" />



                </linear>

            </card>



        </card>
        <card w="*" h="40" cardBackgroundColor="#000000" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="3dp">
            <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                <horizontal>
                    <text text="识别度：" textColor="#212121" marginLeft="7" w="auto" marginTop="9" textSize="15sp" />
                    <seekbar marginLeft="-15" w="180" id="识别" progress="-10" max="9" marginTop="11" textSize="15sp" />
                    <text id="sb" text="1" textColor="#FFFF0000" w="35" marginTop="9" textSize="15sp" />
                    <text text="率" textColor="#212121" w="30" marginTop="9" textSize="15sp" />
                </horizontal>


            </card>



        </card>
        <card w="*" h="40" cardBackgroundColor="#000000" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="3dp">
            <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                <text text="开始运行" textStyle="bold" id="start" gravity="center" w="1080px" margin="0 0 0 0" textColor="#000000" textSize="20sp" />
                <text text="开启无障碍后，点击开始运行自动操作!" textSize="8sp" />


            </card>



        </card>

        <horizontal>
            <checkbox id="跳过gg" buttonTint="@color/white" checked="true" text="勾选后有跳过按钮优先跳过广告" textColor="#000000" />


        </horizontal>

        <frame height="800" gravity="center">

            <vertical>




                <card w="*" h="0" cardBackgroundColor="#000000" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="3dp">
                    <card w="*" h="1" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">



                    </card>



                </card>


                <card w="*" h="250" cardBackgroundColor="#ffd400" margin="1 1 1 1" cardElevation="1dp" gravity="center_vertical" alpha="0.5" cardCornerRadius="3dp">
                    <card w="*" h="296" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">
                        <vertical>
                            <text text="本脚本为免费脚本，严禁贩卖！且行且珍惜。一切后果作者不承担。欢迎加入我们QQ群！！！" textSize="15sp" textColor="#2a5caa" />



                            <text text="脚本说明:" textSize="16sp" textColor="#2a5caa" />

                            <text text="1.运行脚本前先开启无障碍和悬浮窗模式" textColor="#2a5caa" />
                            <text text="2.无障碍和悬浮窗是开启脚本的无障碍" textColor="#2a5caa" />
                            <text text="3.若手机低于安卓7.0则不能运行 请自行卸载" textColor="#2a5caa" />
                            <text text="项目说明:" textSize="16sp" textColor="black" line="4" />
                            <text text="                                   致富小农场
                         
                         
                         
                         玩法以及利润:首先开启脚本的无障碍和悬浮窗权限，识别率用0.75。脚本写了全自动开垦，收红包，施肥。一个包1k左右
                         有项目投稿直接发玩法利润
                         " textSize="16sp" textColor="black" line="4" />
                        </vertical>
                    </card>


                </card>

                <card w="*" h="40" cardBackgroundColor="#f8aba6" margin="1 20 1 1" cardElevation="1dp" gravity="center_vertical" alpha="0.6" cardCornerRadius="3dp">
                    <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                        <text id="pg" text="低保合集" textColor="red" gravity="center" />

                    </card>


                </card>
                <card w="*" h="40" cardBackgroundColor="#2b4490" margin="1 20 1 1" cardElevation="1dp" gravity="center_vertical" alpha="0.6" cardCornerRadius="3dp">
                    <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                        <text id="jr" text="点我加入脚本群" textColor="#FF0000" gravity="center" />

                    </card>


                </card>

                <card w="*" h="40" cardBackgroundColor="#000000" margin="1 20 1 1" cardElevation="1dp" gravity="center_vertical" alpha="0.6" cardCornerRadius="3dp">
                    <card w="*" h="36" cardCornerRadius="2dp" margin="2" cardElevation="1dp" gravity="center_vertical" alpha="1" cardCornerRadius="1">

                        <text id="xz" text="下载软件" textColor="red" gravity="center" />

                    </card>


                </card>


            </vertical>




        </frame>




    </vertical>
);


ui.tv_text.setSelected(true);
storage = storages.create("awtlq")
识别率 = storage.get("识别率", 0.75)
ui.sb.setText(String(识别率))
ui.识别.progress = 识别度返回(识别率)
ui.识别.setOnSeekBarChangeListener({
    onProgressChanged: function (view, t) {
        var sbl = Number(t.toString())
        识别率 = 识别度(sbl)
        storage.put("识别率", 识别率);
    }
})


ui.xz.on("click", () => {
    app.openUrl(下载地址)
    //上面是点击下载地址跳转的链接
})

ui.pg.on("click", () => {
    app.openUrl(低保合集)
    toastLog("努力就会有回报，没有去找倾城")
    //上面是点击下载地址跳转的链接
})

ui.jr.click(function () {
    toast("欢迎你")
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=group&uin=" + QQ群,
        packageName: "com.tencent.mobileqq",
    });
})

ui.kjid.click(function () {
    toast("欢迎反馈bug😘")
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=1&uin=" + QQ,
        packageName: "com.tencent.mobileqq",
    })
})
ui.duck.click(function () {
    toast("欢迎你")
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=group&uin=" + QQ群,
        packageName: "com.tencent.mobileqq",
    });
})

ui.autoService.on("check", function (checked) {
    toastLog("找到对应脚本，开启无障碍模式")
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.xfc.on("check", function (checked) {
    toastLog("点击开关开启悬浮窗权限")

    console.show();
});


// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请开启无障碍服务🤪");
        return;
    }
    if (auto.service == null) {
        toast("请开启无障碍服务")
        return;
    } else {

        悬浮窗开关

        threads.start(function () {
            倾城()

        })
    }
})


function md5(str) {
    return $crypto.digest(str, "MD5")
}


function 倾城() {

    threads.start(function () {


        //下面是运行代码
        //请求截图，用找图方法，第一个就要先写的请求截图代码，不然找图没法用
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            exit();
        }

        /悬浮窗/

        console.hide()
        sleep(1000)
        console.show();
        sleep(1000);
        console.log("调整大小...");
        console.setSize(400, 600);

        console.log("调整位置...");
        console.setPosition(0, 1000);

        auto.waitFor()
        console.info("正在打开致富小农场")
        launch(包名)

        toastLog("8秒后运行脚本")
        //  toastLog("如果想运行抽奖功能请手动进入抽奖界面，默认执行自动种地")


        sleep(8000)

        while (true) {


            找图1("中部", "开垦", 识别率, 1, 1)
            找图1("下部", "领取", 识别率, 1, 1)
            找图1("上部", "收获1", 识别率, 1, 1)
            找图1("中部", "打开", 识别率, 1, 1)
            找图1("中部", "打开1", 识别率, 1, 1)
            找图1("中部", "收下", 识别率, 1, 1)
            找图1("上部", "施肥", 识别率, 1, 1)
            找图1("中部", "施肥1", 识别率, 1, 1)
            找图1("中部", "平台关闭", 识别率, 1, 1)
            ///关闭通杀


            sleep(1000)
            找图方法3("抽奖", 识别率, 2, 2)


            找图方法3("关闭1", 识别率, 2, 2)
            找图方法3("关闭2", 识别率, 2, 2)
            //   找图方法3("关闭3", 识别率, 2, 2)
            找图方法3("关闭4", 识别率, 2, 2)
            找图方法3("关闭5", 识别率, 2, 2)
            //找图方法3("关闭6", 识别率, 2, 2)
            找图方法3("关闭7", 识别率, 2, 2)


        }
    })


    threads.start(function () {
        while (true) {
            关闭广告()

            控件判断1("推荐", 0, 0)


        }


    })



    threads.start(function () {
        while (true) {

            检测界面()

        }
    })


    function 找图1(fw, 所找图, 识别率, a, b) {
        //利用宽度算出标准缩放比
        var sfk = device.width / 1080 //得到 宽缩放比
        var gdg = 2340 * sfk //得到   固定高
        var 小图 = images.read("我爱/" + 所找图 + ".jpg");
        var img = images.scale(小图, sfk, gdg / 2340) //进行缩放
        var imgok = images.threshold(img, 130, 255, "BINARY")
        var js = 0
        //while (true) {
        var jt = captureScreen()
        if (!fw) {
            var zgfw = [0, 0, device.width, device.height]
        } else if (fw == "头部") {
            var zgfw = [0, 0, device.width, device.height / 2]
        } else if (fw == "下部") {
            var zgfw = [0, device.height / 2, device.width, device.height / 2]
        } else if (fw == "左部") {
            var zgfw = [0, 0, device.width / 2, device.height]
        } else if (fw == "右部") {
            var zgfw = [device.width / 2, 0, device.width / 2, device.height]
        } else if (fw == "中部") {
            var zgfw = [0, device.height / 5, device.width, device.height / 5 * 4]
        }


        var jt1 = images.threshold(jt, 130, 255, "BINARY")
        fh = findImage(jt1, imgok, {
            region: zgfw,
            threshold: 识别率,
        });
        if (fh) {
            //console.warn("发现" + 所找图, fh.x, fh.y)
            toastLog("发现" + 所找图, fh.x, fh.y)
            click(fh.x + a, fh.y + b)

            console.error("点击--" + 所找图)

            // break;
            sleep(1000)
        } else {
            // console.log("===未找到" + 所找图)
            //toastLog("===未找到" + 所找图)
            //sleep(2000)
        }
        //  }

    }
}

function 找图方法3(所找图, 识别率, a, b) {

    let 大图 = captureScreen()
    let 小图1 = images.read("关闭通杀/" + 所找图 + ".png");
    let 缩放x = device.width / 1080
    let 缩放y = device.height / 2400
    let 小图 = images.scale(小图1, 缩放x, 缩放y)
    let result = images.matchTemplate(大图, 小图, {
        max: 5,
        region: [0, 0, device.width, device.height], //区域
        threshold: 识别率,
    });

    if (result != null) {
        for (let i = 0; i < result.matches.length; i++) {
            let pp = result.matches[i].point
            // log(pp)
            // console.nk
            console.warn("找到" + 所找图, pp.x, pp.y)

            click(pp.x + a, pp.y + b)
            //  log(pp.x, pp.y)
            console.error("点击--" + 所找图)
            sleep(200)
            break;
        }
    } else {
        console.log("===未找到" + 所找图)
    }
}

function 关闭广告() {
    /*
       //若无id就用classesname
       let 弹窗广告 = className("android.view.View").depth("9").indexInParent("2").findOnce();
       if (弹窗广告) {
           press(弹窗广告.bounds().centerX(), 弹窗广告.bounds().centerY(), 1)
           console.log("关闭弹窗")
           sleep(1000)
       }
*/

    let 弹窗广告2 = className("android.widget.ImageView").depth("4").indexInParent("1").findOnce();
    if (弹窗广告2) {
        press(弹窗广告2.bounds().centerX(), 弹窗广告2.bounds().centerY(), 1)
        console.log("关闭弹窗2")
        sleep(1000)
    }

    let 倾城3 = className("android.view.ViewGroup").depth("8").indexInParent("0").findOnce();
    if (倾城3) {
        press(倾城3.bounds().centerX(), 倾城3.bounds().centerY(), 1)
        // console.log("关闭弹窗2")
        sleep(1000)
    }


    let 弹窗广告6 = className(" android.view.View").depth("11").indexInParent("1").findOnce();
    if (弹窗广告6) {
        press(弹窗广告6.bounds().centerX(), 弹窗广告6.bounds().centerY(), 1)
        console.log("关闭弹窗6")
        sleep(1000)
    }
    let 广告1 = className("android.widget.ImageView").depth("6").drawingOrder("5").indexInParent("1").findOnce();
    if (广告1) {
        press(广告1.bounds().centerX(), 广告1.bounds().centerY(), 1)
        console.log("关闭广告1")
        sleep(1000)
    }


    let 广告2 = className("android.widget.ImageView").depth("5").drawingOrder("5").indexInParent("1").findOnce();
    if (广告2) {
        press(广告2.bounds().centerX(), 广告2.bounds().centerY(), 1)
        console.log("关闭广告2")
        sleep(1000)
    }

    let 广告3 = className("android.widget.ImageView").depth("11").drawingOrder("2").indexInParent("1").findOnce();
    if (广告3) {
        press(广告3.bounds().centerX(), 广告3.bounds().centerY(), 1)
        console.log("关闭广告3")
        sleep(1000)
    }

    let 广告4 = className("android.widget.ImageView").depth("4").drawingOrder("2").indexInParent("1").findOnce();
    if (广告4) {
        press(广告4.bounds().centerX(), 广告4.bounds().centerY(), 1)
        console.log("关闭广告4")
        sleep(1000)
    }

    //className("android.view.View").depth("11").drawingOrder("0").indexInParent("1").findOnce().click();


    /*
    let 广告5 = className("android.view.View").depth("11").drawingOrder("0").indexInParent("1").findOnce();
    if (广告5) {
        press(广告5.bounds().centerX(), 广告5.bounds().centerY(), 1)
        console.log("关闭广告5")
        sleep(1000)
    }
   
    */

    if (id("tab2").findOnce()) {
        id("tab2").findOnce().click();
        console.info("--点击红包群界面")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    if (id("close_imageview").findOnce()) {
        id("close_imageview").findOnce().click();
        console.info("--关闭广告")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    if (id("close").findOnce()) {
        id("close").findOnce().click();
        console.info("--关闭广告5")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }


    //下面是广告完在线咨询
    if (id("multiline-consult").findOnce()) {
        id("multiline-consult").findOnce().click();
        console.info("点击在线咨询")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }


    if (id("tt_titlebar_close").findOnce()) {
        id("tt_titlebar_close").findOnce().click();
        console.info("--关闭广告")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }
    //下面是返回
    if (id("detail_back").findOnce()) {
        id("detail_back").findOnce().click();
        console.info("--返回")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    if (id("close").findOnce()) {
        id("close").findOnce().click();
        console.info("--关闭广告")
        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    //   if (id("tt_splash_skip_btn").findOnce()) {
    //     id("tt_splash_skip_btn").findOnce().click();
    //       console.info("--跳过广告")
    //a = 1;toast("已看"+a+"次广告1");a++;
    //       sleep(500)
    //    }

    if (id("tt_insert_dislike_icon_img").findOnce()) {
        id("tt_insert_dislike_icon_img").findOnce().click();
        console.info("--关闭弹窗")

        //a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    if (id("ksad_end_close_btn").findOnce()) {
        id("ksad_end_close_btn").findOnce().click();
        console.info("--关闭广告1")
        // a = 1;toast("已看"+a+"次广告1");a++;
        sleep(500)
    }

    if (id("tt_video_ad_close_layout").findOnce()) {
        id("tt_video_ad_close_layout").findOnce().click();
        console.info("--关闭广告2")
        //i = 1;toast("已看"+i+"次广告2");i++;
        sleep(500)
    }


    if (id(" reward_ad_close").findOnce()) {
        id(" reward_ad_close").findOnce().click();
        console.info("--关闭广告3")
        //i = 1;toast("已看"+i+"次广告2");i++;
        sleep(500)
    }


}

//下面是检测界面，利用包名检测，当不在app内时。利用软件名打开app
function 检测界面() {
    while (true) {
        sleep(random(3000, 6000))
        if (currentPackage() != 包名) {
            console.log("全局检测中 当前界面不是" + 软件名 + " 再次查看……");

            sleep(random(3000, 5000))
        }

        if (currentPackage() != 包名) {
            //返回界面()
            launchPackage(包名)
            console.log("重新打开" + 软件名)
        }


    }
}


function 控件判断1(ttext, kong, clas) {
    var texi = null;
    var 是否可点 = false;
    var 是否找到 = false;
    //  console.log("[控件判断]", "进入类库:ttext=" + ttext + "&kong=" + kong + "&clas=" + clas);
    if (kong == 0) {
        texi = className(clas).text(ttext).findOne(1000);
        if (texi) 是否找到 = true;
        if (是否找到 == false) {

            texi = className(clas).textContains(ttext).findOne(1000);
        } else {
            console.info("不在app界面，重新进入app")
            launchApp("幸运爱消除")
            // console.log("[控件判断]", "是否找到:" + 是否找到);
        }
    } else if (kong == 1) {
        texi = className(clas).textContains(ttext).findOne(1000);
    } else if (kong == 2) {
        var fsfan = className(clas).textContains(ttext).find();
        var lengt = fsfan.length - 1;
        //console.log("[控件判断]", "lengt=" + lengt);
        texi = fsfan[lengt];
    } else if (kong == 3) {
        texi = className("Button").textContains(ttext).findOne(1000);
    }
    if (是否找到 == false) {
        if (texi) {
            是否找到 = true;
        }
    }
    // console.log("[控件判断]", "完毕:" + 是否找到);
    return texi;
}


function 控件点击(dshuxing, dzhi, dname) {

    var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();

    if (a != null) {

        var x1 = a.bounds().left;

        var x2 = a.bounds().right;

        var y1 = a.bounds().top;

        var y2 = a.bounds().bottom;

        var x = random(Math.floor(x1 + 1), Math.floor(x2 - 1)); //删除控件四周1的边界，防止边框位置点击无效

        var y = random(Math.floor(y1 + 1), Math.floor(y2 - 1));

        var timedelay = random(50, 150);

        log("点击 [" + dname + "]");

        press(x, y, timedelay);

        sleep(1000);

        return true;

    }
    else {

        //toastLog("无法找到 ["  +  dname  +  "]");

        //其他内容

    }
}

function 识别度(sbl) {
    switch (sbl) {
        case 0:
            ui.sb.setText("0.5") //这个是数字显示
            return 0.5
        case 1:
            ui.sb.setText("0.55") //这个是数字显示
            return 0.55
        case 2:
            ui.sb.setText("0.6") //这个是数字显示
            return 0.6
        case 3:
            ui.sb.setText("0.65") //这个是数字显示
            return 0.65
        case 4:
            ui.sb.setText("0.7") //这个是数字显示
            return 0.7
        case 5:
            ui.sb.setText("0.75") //这个是数字显示
            return 0.75
        case 6:
            ui.sb.setText("0.8") //这个是数字显示
            return 0.8
        case 7:
            ui.sb.setText("0.85") //这个是数字显示
            return 0.85
        case 8:
            ui.sb.setText("9") //这个是数字显示
            return 9
        case 9:
            ui.sb.setText("0.95") //这个是数字显示
            return 0.95
        case 10:
            ui.sb.setText("1") //这个是数字显示
            return 1
        default:
            return 0.6
    }
}

function 识别度返回(sbl) {
    log(sbl)
    switch (sbl) {
        case 0.5:
            return 0
        case 0.55:
            return 1
        case 0.6:
            return 2
        case 0.65:
            return 3
        case 0.7:
            return 4
        case 0.75:
            return 5
        case 0.8:
            return 6
        case 0.85:
            return 7
        case 0.9:
            return 8
        case 0.95:
            return 9
        case 1:
            return 10
        default:
            return 2
    }
}
