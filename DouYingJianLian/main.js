
"ui";

ui.layout(
    <ScrollView>
    <vertical id = "setConfigView" w = "*" h = "auto" layout_centerInParent="true" >
        <appbar>
            <toolbar id="toolbar" title="立即运行"/>
        </appbar>
        <text textColor = "black" textSize="18sp" margin="20 12">
            运行参数
        </text>

        <text textColor = "black" textSize="16sp" margin="22 12">
            一、入参
        </text>

        <card w="*" h="150" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    1、请输入导入抖音批量关注建联_建联名单模板存放路径
                </text>
                <input id = "InputExcelRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/excel/dataInput.xls"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：/sdcard/脚本/excel/dataInput.xls
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <card w="*" h="150" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    2、请输入建联话术
                </text>
                <input id = "SiXinMSG" singleLine = 'true' alpha="0.5" text="您好"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：'亲您好,这里是Molyvivi品牌方,主营科技休闲运动服饰公司产品也有众多明星背书,如欧阳娜娜、赵露思、宋茜、吴昕都有过推荐,这边想跟您合作挂车视频,有意向可留vx或者邮哦~'
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <text textColor = "black" textSize="16sp" margin="22 12">
            三、定时任务
        </text>

        <Switch id = "openSwh"  w = "auto" h = "auto" margin="24 5" textStyle = "bold" textColor = "red" 
            text = "是否需要设置定时任务   "  textSize="16sp" marginBottom = "15"  marginRight ="10"/>

        <vertical>
            <text id = "timePickerModeText" margin="24 5" text = "滑动时间选择:" textColor = "black" textSize="16sp" marginTop="5" />
            <timepicker id = "timePickerMode"  timePickerMode="spinner" />
        </vertical>

        <button id="callback" bg="#0000FF" margin="24 5" textColor = "#FFFFFF">立即运行</button>
    </vertical>
    </ScrollView>
);

let InputExcelRoute = '';
let SiXinMSG = '';

ui.callback.click(() =>{
    // 取出填写的Excel默认路径,建联话术语句
    InputExcelRoute = ui.InputExcelRoute.text();
    SiXinMSG = ui.SiXinMSG.text();
    console.log('InputExcelRoute:' + InputExcelRoute);
    console.log('SiXinMSG:' + SiXinMSG);
    home();
    handleExcel(InputExcelRoute);
});

function handleExcel(InputExcelRoute) {
    
}