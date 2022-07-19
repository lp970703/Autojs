
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

        <card w="*" h="100" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    1、请输入导入参数excel的存放路径
                </text>
                <input id = "InputExcelRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/excel/dataInput.xls"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：/sdcard/脚本/excel/dataInput.xls
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <text textColor = "black" textSize="16sp" margin="22 12">
            二、出参
        </text>

        <card w="*" h="100" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    1、请输入导出图片的存放路径
                </text>
                <input id = "OutputImgRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/Img/Img"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：/sdcard/脚本/Img/Img 
                </text>
            </vertical>
            <View bg="#FFEFD5" h="*" w="12"/>
        </card>

        <card w="*" h="100" margin="24 5" cardCornerRadius="8dp"
            cardElevation="10dp" gravity="center_vertical">
            <vertical padding="18 8" h="auto">
                <text textColor = "black" textSize="14sp" >
                    2、请输入导出的Excel的存放路径
                </text>
                <input id = "OutputExcelRoute" singleLine = 'true' alpha="0.5" text="/sdcard/脚本/excel/dataOutput.xls"></input>
                <text textStyle = "italic" padding="1 1 1 1" bg = "#34b1e7" 
                    textColor = "black" textSize="10sp">
                    例如：/sdcard/脚本/excel/lopez.xls  务必以.xls结尾
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
console.log(ui.InputExcelRoute.text());
ui.callback.click(() =>{
    console.log(ui.InputExcelRoute.text());
});
// ui.run.on("click", () => {
//     console.log(ui.InputExcelRoute.text());
// });
// ui.layout(
//     <vertical>
//         <appbar>
//             <toolbar id="toolbar" title="卡片布局"/>
//         </appbar>
//         <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
//             cardElevation="1dp" gravity="center_vertical">
//             <vertical padding="18 8" h="auto">
//                 <text text="写操作系统作业" textColor="#222222" textSize="16sp"/>
//                 <text text="明天第1～2节" textColor="#999999" textSize="14sp"/>
//             </vertical>
//             <View bg="#f44336" h="*" w="10"/>
//         </card>
//         <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
//             cardElevation="1dp" gravity="center_vertical">
//             <vertical padding="18 8" h="auto">
//                 <text text="修复ui模式的Bug" textColor="#222222" textSize="16sp"/>
//                 <text text="无限期" textColor="#999999" textSize="14sp"/>
//             </vertical>
//             <View bg="#ff5722" h="*" w="10"/>
//         </card>
//         <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
//             cardElevation="1dp" gravity="center_vertical">
//             <vertical padding="18 8" h="auto">
//                 <text text="发布Auto.js 5.0.0正式版" textColor="#222222" textSize="16sp"/>
//                 <text text="2019年1月" textColor="#999999" textSize="14sp"/>
//             </vertical>
//             <View bg="#4caf50" h="*" w="10"/>
//         </card>
//         <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
//             cardElevation="1dp" gravity="center_vertical">
//             <vertical padding="18 8" h="auto">
//                 <text text="完成毕业设计和论文" textColor="#222222" textSize="16sp"/>
//                 <text text="2019年4月" textColor="#999999" textSize="14sp"/>
//             </vertical>
//             <View bg="#2196f3" h="*" w="10"/>
//         </card>
//     </vertical>
// );
