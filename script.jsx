var myDocument = app.documents.add(null, 15000, 2000)
var artLayer = myDocument.layers.add()

// 画布信息
// 画布底
var screenBott = 100
// 画板高
var screenHeigh = 1500

// 文件配置
var HINDEX = 2
var LINDEX = 3
// var HINDEX = 3
// var LINDEX = 4
// var FILENAME = "/Users/gechaojie/Desktop/998.txt"
var FILENAME = "/Users/gechaojie/Desktop/399006.txt"


// 定义k线基础属性
// 所有k线最高价位
var ksHeighst    

// 所有k线最低价位
var ksLowst     

// k线间距
var kSpacing = 0.05

// k线宽度
var kWidth = 0.2

// k线绝对距离： kspacing + kweight
var kAbWidth = kSpacing + kWidth


// k线上涨颜色
// 获得颜色牛耳
var colorUp = new RGBColor;
colorUp.red = 51
colorUp.green = 51
colorUp.blue = 51

// k线下跌颜色
var colorDown = new RGBColor;
// colorDown.red = 230;
// colorDown.green = 40;
// colorDown.blue = 60;
colorDown.red = 51
colorDown.green = 51
colorDown.blue = 51

// 默认k线颜色：up
var colorRef = colorUp

// 从文件获取k线数据
datas = getData()
data = datas[0]
ksHeighst = datas[1]
ksLowst = datas[2]
var top, height
var left = 0

// 画k线，参数包括，颜色，长短，宽度，从哪里开始画
for (var i = 0; i < data.length; i++)
{
    klow = data[i][1]
    kheigh = data[i][0]
    // alert("klow:" + klow)
    // alert("kheigh:" + kheigh)
    // alert("ksLowst:" + ksLowst)
    // alert("ksHeighst:" + ksHeighst)
    // alert("screenHeigh:" + screenHeigh)
    // alert("screenBott:" + screenBott)
    left += kAbWidth
    // top = ((klow - ksLowst) / (ksHeighst - ksLowst)) *  (screenHeigh - screenBott) + screenBott
    // height = ((kheigh - ksLowst) / (ksHeighst - ksLowst)) *  (screenHeigh - screenBott)+ screenBott - top
    top = ((kheigh - ksLowst) / (ksHeighst - ksLowst)) *  (screenHeigh - screenBott) + screenBott
    height = top - ((klow - ksLowst) / (ksHeighst - ksLowst) *  (screenHeigh - screenBott) + screenBott)
    drawSingleKline(top, left, height)

}

function drawSingleKline(top, left, height)
{
    // 获得矩形牛耳,并设置部分属性：top, left, width, height
    // alert("ss" + "\ntop " + top + "\nleft " + left + "\nkwidth " + kWidth + "\nheight " + height)
    var rect = artLayer.pathItems.rectangle(top, left, kWidth, height)

    // 填充颜色
    // rect.filled = true
    rect.fillColor = colorRef

    // 去掉描边
    rect.stroked = false 
}


function getData()
{
    var a = []
    var ksHeighst = 0
    var ksLowst = 999999
    var kFile = new File(FILENAME)
    if (!kFile.exists)
    {alert("file not exists!")}

    kFile.open()

    var ln;
    ln = kFile.readln()
    var pp = ln.toString().split("\t")
    kHeighst = parseFloat(pp[HINDEX])
    kLowst = parseFloat(pp[LINDEX])
    alert("h:" + kHeighst + "l:" + kLowst)

    while (!kFile.eof) 
    {
        // TODO 添加判断空行
        ln = kFile.readln()
        var pp = ln.toString().split("\t")
        kHeighst = parseFloat(pp[HINDEX])
        kLowst = parseFloat(pp[LINDEX])
        a.push([kHeighst, kLowst])
        if (kHeighst > ksHeighst)
        {
            ksHeighst = kHeighst
        }
        if (kLowst < ksLowst)
        {
            ksLowst = kLowst
        }
    }

    kFile.close()
    return [a, ksHeighst, ksLowst]
}