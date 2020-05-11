// import {K} from "./K";
// import {Ajax} from "./Ajax";
// import $ = require("jquery");
// import * as $ from "jquery";


class K {
    // 字段
    open: number;
    close: number;
    high: number;
    low: number;
    timeBegin: Date;
    volume: number;
    amount: number;

    constructor(open: number, close: number, high: number, low: number, timeBegin: Date, volume: number, amount: number) {
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
        this.timeBegin = timeBegin;
        this.volume = volume;
        this.amount = amount;
    }
}

class Ajax {
    private url: string;
    private headers: any;

    constructor(url, headers) {
        this.url = url
        this.headers = headers
    }

    private sentData(data: any) {
        let str = '?'
        for (let i in data) {
            str += `${i}=${data[i]}&`
        }
        return str.slice(0, str.length - 1)
    }

    get(url: string, data, fun) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', this.url + url + this.sentData(data))

        if (this.headers) {
            for (let i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i])
            }
        }

        xhr.send()

        xhr.onreadystatechange = function () {
            let result: any = "";
            console.log(xhr.statusText);
            let data = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == 200) {
                result =  JSON.parse(data);
            } else {
                result = data; //error
            }
            fun(result);
        }

    }

    post(url, data) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', this.url + url)

        if (this.headers) {
            for (let i in this.headers) {
                xhr.setRequestHeader(i, this.headers[i])
            }
        }

        xhr.send(JSON.stringify(data))
    }
}

declare let echarts: any;  //要先声明
// declare let $: any;

// setInterval(function () {
//     let maxHeight = $(document.body).outerHeight(true);
//     $("#main").height(maxHeight);
// }, 1);

/*基于准备好的dom，初始化echarts实例*/
let myChart = echarts.init(document.getElementById('main'));

// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
let data0
// = splitData([
//     ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
//     ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
//     ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
//     ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
//     ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
//     ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
//     ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
//     ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
//     ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
//     ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
//     ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
//     ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
//     ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
//     ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
//     ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
//     ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
//     ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
//     ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
//     ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
//     ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
//     ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
//     ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
//     ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
//     ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
//     ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
//     ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
//     ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
//     ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
//     ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
//     ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
//     ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
//     ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
//     ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
//     ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
//     ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
//     ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
//     ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
//     ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
//     ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
//     ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
//     ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
//     ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
//     ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
//     ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
//     ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
//     ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
//     ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
//     ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
//     ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
//     ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
//     ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
//     ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
//     ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
//     ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
//     ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
//     ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
//     ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
//     ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
//     ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
//     ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
//     ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
//     ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
//     ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
//     ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
//     ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
//     ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
//     ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
//     ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
//     ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
//     ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
//     ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
//     ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
//     ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
//     ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
//     ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
//     ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
//     ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
//     ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
//     ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
//     ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
//     ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
//     ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
//     ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
//     ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
//     ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
//     ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
//     ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
//     ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
// ]);

function loadDATA() {
    let ajax = new Ajax('http://127.0.0.1:8080/stock', {'Content-Type': 'text/plain'})
    ajax.get('/all', {code: '002959'}, setData);


}


function setData(rawData: Array<K>) {
    let categoryData = [];
    let values = [];

    for (let k of rawData) {
        //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期
        //alert(rawData[i].splice(0, 1)[0]);
        //categoryData  日期  把返回的日期放到categoryData[]数组中
        categoryData.push(k.timeBegin);
        //alert(categoryData);

        //数据数组，即数组中除日期外的数据
        // alert(rawData[i]);

        let x = [k.open,k.close,k.high,k.low];
        values.push(x)
    }

    option.xAxis.data = categoryData;
    option.series[0].data = values;

// 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

}


//切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
// function splitData(rawData) {
//     let categoryData = [];
//     let values = [];
//
//     for (let i = 0; i < rawData.length; i++) {
//         //splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期
//         //alert(rawData[i].splice(0, 1)[0]);
//         //categoryData  日期  把返回的日期放到categoryData[]数组中
//         categoryData.push(rawData[i].splice(0, 1)[0]);
//         //alert(categoryData);
//
//         //数据数组，即数组中除日期外的数据
//         // alert(rawData[i]);
//         values.push(rawData[i])
//     }
//     return {
//         categoryData: categoryData, //数组中的日期 x轴对应的日期
//         values: values              //数组中的数据 y轴对应的数据
//     };
// }

//计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
function calculateMA(dayCount) {
    let result = [];
    // for (let i = 0, len = data0.values.length; i < len; i++) {
    //     if (i < dayCount) {
    //         result.push('-');
    //         //alert(result);
    //         continue;   //结束单次循环，即不输出本次结果
    //     }
    //     let sum = 0;
    //     for (let j = 0; j < dayCount; j++) {
    //         //收盘价总和
    //         sum += data0.values[i - j][1];
    //         //alert(sum);
    //     }
    //     result.push(sum / dayCount);
    //     // alert(result);
    // }
    return result;
}


// function loadDATA(option){
//     $.ajax({
//         type : "get",
//         async : false, //同步执行
//         url : "bar.do",
//         data : {},
//         dataType : "json", //返回数据形式为json
//         success : function(result) {
//             if (result) {
//                 //初始化option.xAxis[0]中的data
//                 // option.xAxis[0].data=[];
//                 // for(var i=0;i<result.length;i++){
//                 //     option.xAxis[0].data.push(result[i].name);
//                 // }
//                 // //初始化option.series[0]中的data
//                 // option.series[0].data=[];
//                 // for(var i=0;i<result.length;i++){
//                 //     option.series[0].data.push(result[i].num);
//                 // }
//
//                 option.xAxis.data =
//             }
//         }
//     });
// }

let option = {
    title: {    //标题
        text: '上证指数',
        left: 0
    },
    tooltip: {  //提示框
        trigger: 'axis',    //触发类型：坐标轴触发
        axisPointer: {  //坐标轴指示器配置项
            type: 'cross'   //指示器类型，十字准星
        }
    },
    legend: {   //图例控件，点击图例控制哪些系列不现实
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {     //直角坐标系
        show: true,
        left: '10%',    //grid组件离容器左侧的距离
        right: '10%',
        bottom: '15%',
        //backgroundColor:'#ccc'
    },
    xAxis: {
        type: 'category',   //坐标轴类型，类目轴
        data: [],
        // data: data0.categoryData,
        //scale: true,  //只在数字轴中有效
        boundaryGap: false,    //刻度作为分割线，标签和数据点会在两个刻度上
        axisLine: {onZero: false},
        splitLine: {show: false},   //是否显示坐标轴轴线
        //splitNumber: 20,    //坐标轴的分割段数，预估值，在类目轴中无效
        min: 'dataMin', //特殊值，数轴上的最小值作为最小刻度
        max: 'dataMax'  //特殊值，数轴上的最大值作为最大刻度
    },
    yAxis: {
        scale: true,    //坐标刻度不强制包含零刻度
        splitArea: {
            show: true  //显示分割区域
        }
    },
    dataZoom: [     //用于区域缩放
        {
            filterMode: 'filter',    //当前数据窗口外的数据被过滤掉来达到数据窗口缩放的效果  默认值filter
            type: 'inside', //内置型数据区域缩放组件
            start: 50,      //数据窗口范围的起始百分比
            end: 100        //数据窗口范围的结束百分比
        },
        {
            show: true,
            type: 'slider', //滑动条型数据区域缩放组件
            y: '90%',
            start: 50,
            end: 100
        }
    ],
    series: [   //图表类型
        {
            name: '日K',
            type: 'candlestick',    //K线图
            // data: data0.values,     //y轴对应的数据

            ////////////////////////图标标注/////////////////////////////

            markPoint: {    //图表标注
                label: {    //标注的文本
                    normal: {   //默认不显示标注
                        show: true,
                        //position:['20%','30%'],
                        formatter: function (param) {   //标签内容控制器
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                // data: [     //标注的数据数组
                //     {
                //         name: 'XX标点',
                //         coord: ['2013/5/31', 2300], //指定数据的坐标位置
                //         value: 2300,
                //         itemStyle: {    //图形样式
                //             normal: {color: 'rgb(41,60,85)'}
                //         }
                //     },
                //     {
                //         name: 'highest value',
                //         type: 'max',    //最大值
                //         valueDim: 'highest'     //在highest维度上的最大值 最高价
                //     },
                //     {
                //         name: 'lowest value',
                //         type: 'min',
                //         valueDim: 'lowest'  //最低价
                //     },
                //     {
                //         name: 'average value on close',
                //         type: 'average',
                //         valueDim: 'close'   //收盘价
                //     }
                // ],
                tooltip: {      //提示框
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },

/////////////////////////////////图标标线///////////////////////////

            markLine: {
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: '#0000FF',
                        width: 2
                    }
                },
                symbol: ['none', 'arrow'],   //标线两端的标记类型
                data: [
                    // [
                    //     {
                    //         name: 'from lowest to highest',
                    //         type: 'min',    //设置该标线为最小值的线
                    //         valueDim: 'lowest', //指定在哪个维度上的最小值
                    //         symbol: 'circle',
                    //         symbolSize: 10, //起点标记的大小
                    //         label: {    //normal默认，emphasis高亮
                    //             normal: {show: false},  //不显示标签
                    //             emphasis: {show: false} //不显示标签
                    //         }
                    //     },
                    //     {
                    //         type: 'max',
                    //         valueDim: 'highest',
                    //         symbol: 'circle',
                    //         symbolSize: 10,
                    //         label: {
                    //             normal: {show: false},
                    //             emphasis: {show: false}
                    //         }
                    //     }
                    // ],
                    [
                        {
                            yAxis: 2165.78,
                            xAxis: '2013/4/16'
                        },
                        {
                            yAxis: 2250,
                            xAxis: '2013/4/19'
                        }
                    ],
                    [
                        {
                            yAxis: 2250,
                            xAxis: '2013/4/19'
                        },
                        {
                            yAxis: 2161,
                            xAxis: '2013/5/2'
                        }
                    ],
                    [
                        {
                            yAxis: 2161,
                            xAxis: '2013/5/2'
                        },
                        {
                            yAxis: 2334,
                            xAxis: '2013/5/29'
                        }
                    ]


                    // {
                    //     name: 'min line on close',
                    //     type: 'min',
                    //     valueDim: 'close'
                    // },
                    // {
                    //     name: 'max line on close',
                    //     type: 'max',
                    //     valueDim: 'close'
                    // }
                ]

            }
        },


        {   //MA5 5天内的收盘价之和/5
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {    //标线的样式
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },

    ]
};

//加载数据
loadDATA();