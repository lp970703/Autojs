getImages();

/**
 * 得到该页面的指定控件的图片
 * 思路：通过截整张图，然后找到这张图所要的那个控件的坐标，在进行剪裁形成的最终图片，再按照图片对应的商品名称将图片保存到本地文件中
 */
 function getImages() {
    // 1、开启线程，找到点击立即开始，并且触发事件（只需要执行一次就可以）
    threads.start(function () {
    var beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            beginBtn.click();sleep(1000);
        }
    });
            
    
    // 2、请求截图
    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit();
    }
    
    sleep(2000);
    // 3、进行截图
    console.log("开始截图")
    let img = captureScreen();
    // 4、找到对应的图片进行裁剪
    let b = id("com.sankuai.meituan:id/img_stickydish_pic").findOne().bounds()
    console.log(b);
    console.log("b.left: "+ b.left + "b.top" + b.top + "b.width()" + b.width() + "b.height()" + b.height());
    let clip = images.clip(img, b.left, b.top, b.width(), b.height())
    images.save(clip, "./clip.png");
    
    console.log('截图完成');
}