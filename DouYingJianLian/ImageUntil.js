/**
 * ImageUntil: 处理手机截图获得图片的一系列操作
 */
 var ImageUntil = {};

/**
 * 处理截图授权的权限问题
 */
ImageUntil.getRequestScreenCapture = function() {
    // 1、开启线程，找到点击立即开始，并且触发事件（只需要执行一次就可以）
    let Imagethread = threads.start(function () {
        console.log('开始获取截图权限')
        let beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            beginBtn.click();sleep(1000);
        }
        if(text("检测到更新").exists() && text("以后再说").exists()){
            text("以后再说").find()[0].click();
        }
    });

    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }

    Imagethread.interrupt(); // 停止该线程
}

/**
 * 进行手机上的滑块识别验证码
 * @returns 
 */
ImageUntil.slideRecognition = function() {
    let img = captureScreen(); sleep(2000);
    if (img) {
        log("截图成功，进行识别滑块！");
    } else {
        log('截图失败，重新截图');
        return;
    };

    var x = this.getPointX(img,0.7);
    console.info("识别结果滑块X坐标：" + x);
    // swipe(147, 1530, x+270, 1530,800);
    gestures([0, 500, [155, 1530], [x, 1530]],
        [0, 500, [160, 1530], [x, 1530]]);
    sleep(2000);
    return true
}

/**
 * 获取缺口位置的x坐标
 * 传入值 img, 识别精度(precision)
 * @param {*} img 
 * @param {*} precision 
 */
ImageUntil.getPointX = function (img,precision) {
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
 * @param {*} x 
 * @param {*} y 
 * @param {*} img 
 * @param {*} precision 
 * @returns 
 */
ImageUntil.isBlackPoint = function (x, y,img,precision) {
    var rgb = images.pixel(img,x,y);    //此时获取到的是ARGB
    console.log('ARGB: '+ rgb);
    var r = (rgb & 0xff0000) >> 16;      //得到R  补充：1:ARGB代表颜色，其中0x代表透明度，后面六位两两一位，分别是红，绿，蓝，因为是16进制的，所以每一位为0-9、A-F组成，也可以转换成（255，0，0）等于0xFF0000其中FF（既16*16=255）的意思，0x表示透明度。2：(rgb & 0xff0000) >> 16的意思是首先将颜色值与十六进制表示的ff0000进行'与'运算，运算结果除了表示红色的数字值之外，GGBB部分颜色都为0，在将结果向右移位16位，得到的就是红色值。所以这句代码主要用来从一个颜色中抽取其组成色---红色的值。
    console.log('RGB中r: ' + r);
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
 * @param {*} x 
 * @param {*} y 
 * @param {*} img 
 * @param {*} precision 
 * @returns 
 */
 ImageUntil.isWhitePoint = function (x, y,img,precision) {
    var rgb = images.pixel(img,x,y);    //此时获取到的是ARGB
    console.log('ARGB: '+ rgb);
    var r = (rgb & 0xff0000) >> 16;      //得到R  补充：1:ARGB代表颜色，其中0x代表透明度，后面六位两两一位，分别是红，绿，蓝，因为是16进制的，所以每一位为0-9、A-F组成，也可以转换成（255，0，0）等于0xFF0000其中FF（既16*16=255）的意思，0x表示透明度。2：(rgb & 0xff0000) >> 16的意思是首先将颜色值与十六进制表示的ff0000进行'与'运算，运算结果除了表示红色的数字值之外，GGBB部分颜色都为0，在将结果向右移位16位，得到的就是红色值。所以这句代码主要用来从一个颜色中抽取其组成色---红色的值。最后得到的数字是一个0-255之间的一个数字，用来看红色的程度
    console.log('RGB中r: ' + r);
    var g = (rgb & 0xff00) >> 8;            //得到G
    var b = (rgb & 0xff);                        //得到B
    var criticalValue = 255 * precision;
    if (r <= criticalValue && g <= criticalValue && b <= criticalValue) {
        return true;
    }
    return false;
}




module.exports = ImageUntil;