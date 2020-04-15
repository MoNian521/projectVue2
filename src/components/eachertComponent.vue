<template>
    <div class="echartDiv">
        <div :id="id" class="echartDiv" ></div>
    </div>
</template>
 
<script>
import Echarts from 'echarts'
import {formatMoneyData,comparativeData} from '@/libs/common'
export default {
    data() {
        return{
            myChart: {},
        }
    },
    props: {
        echartObj: {
            type: Object,
            default: {}
        },
        id:String,
        unit:{
            type: String,
            default: '亿元'
        },
        Max:{
            type:Number,
            default:100,
        },
        Min:{
            type:Number,
            default:-100,
        }
    },
    created() {
        this.$nextTick(()=> {
            this.loadEchart();
        })
    },
    mounted(){
        let _this = this;
        window.onresize = function() {
            _this.myChart.resize()
        }
    },
    methods: {
        loadEchart() {
            let self=this;
            this.myChart = Echarts.init(document.getElementById(this.id));
            this.myChart.setOption({    
                title:{
                    x:'center',
                    y:'top',
                },         
                tooltip: {
                    data:['数据', '百分比']
                },
                xAxis: {
                    data: this.echartObj.xAxisData,
                    axisLabel: {
                        inside: false,
                        textStyle: {
                            color: '#3DA2F6'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                },
                yAxis:[                
                    {
                        type:'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#3DA2F6',
                                fontSize:10
                            },
                            formatter: function(value,index){
                                return parseInt(formatMoneyData(value*10000).num)+ (self.unit?self.unit :formatMoneyData(value*10000).unit);
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                    },
                    {
                        type: 'value',
                        calculable:false,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#3DA2F6',
                                fontSize:10
                            },
                            formatter: function(value,index){
                                return '';
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'none'
                            }
                        },
                    },
                ],
                grid:{
                    left:70
                },
                series: [
                    {
                        name: '数据',
                        type: 'bar',
                        // stack:'读报',                        
                        barWidth: '90%',
                        // offset:[0,10],
                        label: {
                            normal: {
                                show: true,
                                fontSize:10,
                                position: 'top',                                
                                formatter:function(params){
                                    // return formatMoneyData(params.value).num+formatMoneyData(params.value).unit;
                                    // console.log(formatMoneyData(params.value).num)
                                    return formatMoneyData(params.value*10000).num
                                },                                  
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                // let key=comparativeData(params.value,self.echartObj.seriesBarData);
                                // if (key=='red') {
                                //     return 'red';
                                // } else if(key=='green'){
                                //     return 'green';
                                // }else{
                                //     return new Echarts.graphic.LinearGradient(
                                //         0, 0, 0, 1,
                                //         [
                                //             {offset: 0, color: '#83bff6'},
                                //             {offset: 0.5, color: '#188df0'},
                                //             {offset: 1, color: '#188df0'}
                                //         ])
                                // }
                                let value='';
                                let arr=self.toPercent(self.echartObj.serieslineData);
                                for (let index = 0; index < arr.length; index++) {
                                    if([params.dataIndex]==index){
                                        value= arr[index];
                                        break;
                                    }                                            
                                }
                                if (value>0) {
                                    return 'red';
                                } else if(value<0){
                                    return 'green';
                                }
                            },
                        },
                        emphasis: {
                            itemStyle: {
                                color: new Echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: this.echartObj.seriesBarData
                    },{
                        name: '百分比',
                        type: 'line',
                        // stack:'读报',
                        step:true,
                        symbol: 'Square',
                        symbolSize: [1,15], 
                        symbolOffset:[0,-25],                          
                        label:{
                            normal: {
                                show: true,
                                fontSize:10,
                                position:'top',                           
                                formatter:function(params){ 
                                    if (params.value!=0) {
                                        let value='';
                                        let arr=self.toPercent(self.echartObj.serieslineData);
                                        for (let index = 0; index < arr.length; index++) {
                                            if([params.dataIndex]==index){
                                                value= arr[index];
                                                break;
                                            }                                            
                                        }
                                        // console.log(params.value+'-----------'+value)
                                        return value/10+"%";
                                    } else {
                                        return '';
                                    }                                    
                                },
                            }
                        },   
                        itemStyle: {
                            color: function(params) {
                                let value='';
                                let arr=self.toPercent(self.echartObj.serieslineData);
                                for (let index = 0; index < arr.length; index++) {
                                    if([params.dataIndex]==index){
                                        value= arr[index];
                                        break;
                                    }                                            
                                }
                                if (value>0) {
                                    return 'red';
                                } else if(value<0){
                                    return 'green';
                                }else{
                                    return 'rgba(255,255,255,0)';
                                }
                            },
                        },
                        lineStyle:{
                            width:0,
                        },
                        data:this.echartObj.seriesBarData
                        // data: self.toPercent(self.echartObj.serieslineData)
                    }
                ]
            },true)
        },
        toPercent(items){
            let arr=[];            
            for (let index = 0; index < items.length; index++) { 
                if(items[index]!='null'||items[index]!=null){
                    var percent = Math.ceil(items[index]*1000)
                    arr.push(percent); 
                }else{
                    arr.push(' ');
                }      
            }
            return arr;   
        },
        toPositivePercent(items){
            let arr=[];            
            for (let index = 0; index < items.length; index++) { 
                if(items[index]!='null'||items[index]!=null){
                    var percent = Math.ceil(items[index]*100)
                    arr.push(Math.abs(percent)); 
                }else{
                    arr.push(null);
                }      
            }
            return arr;   
        },
    }
}
</script>
 
<style>
.echartDiv {
    width: 100%;
    height: 12.05rem;
    margin:0 auto;
}
</style>