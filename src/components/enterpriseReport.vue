<template>
  <div class="app">
    <div class="searchModel" v-if="isShowLooding" style="position:absolute;">
        <div style="width:100%;height:100%;">
          <img src="../../static/imgs/searchLogoup.png" alt="大河财立方.财力方智库" style="width: 14rem;height: 1.5rem;margin:6.5rem auto 0rem;">
          <div style="width: 100%;height: 7.5rem;line-height:2.5rem;letter-spacing:4px;text-align:center;color:#fff;font-size:16px;font-weight:400;">
            <!-- 财立方智库.大财读年报 -->
            </div>
          <van-search id="vanSearch" v-model="searchValue" @input="search"  shape="round" background="#3b7cf5" label="年报" placeholder="请输入股票代码或股票名称"/>
          <ul style="width: 16rem;margin: -10px auto;border-radius: 5px;max-height:15rem;overflow-x: hidden; overflow-y: scroll;z-index:6;"
          v-if="items.length!=0||showSearch">
            <li style="width:100%;height:3rem;line-height:3rem;text-align:center;border-bottom:1px solid #c6c8ca;background:#fff;" @click="selectionItem(item)"
            v-for="(item,index) in items" :key="index">
              {{item.gpmc}}&nbsp;&nbsp;{{item.gpdm}}
            </li>
          </ul>
          <img src="../../static/imgs/searchLogo.png" alt="大河财立方.财力方智库" style="width: 11rem;height: 4rem;margin-top: 8rem;">            
        </div>
    </div>
    <div class="mainContent" v-else>
      <!-- <div style="width:20px;height:20px;background:red;" class="mixed-array-demo"></div> -->
      <!-- banner图 start -->
      <van-row style="width:100%;">
        <van-col span="24">
          <div class="header">          
            <div style="height:5.32rem;width:100%;">
                <div class="logo">
                  <img src="../../static/imgs/logo.png" alt="大河财立方.财力方智库" style="margin-left:2rem;">                    
                </div>
                <div class="btnP">
                  <div class="btn" @click="changeBusiness">
                    <img src="../../static/imgs/9.png" alt="更换企业"  style="width:100%; height:100%;vertical-align:middle;">
                  </div>
                </div>
                <div style="both:clear;"></div>
            </div>
            <div style="height:9.1rem;width:100%;">
                <div style="width:100%;height:7rem;text-align:left;">

              <!-- <div class="companyTile wow fadeInUp">&nbsp;</div>
                     大财读年报
                    <div class="sonTitle wow fadeInUp">
                      <div style="width:7.34rem;height:2.45rem;float:left;line-height:2.45rem;">&nbsp;</div>
                      2019 
                      <div style="background-size:100% 100%;font-size:1.18rem;font-weight:300;width:5.15rem;height:2.45rem;float:left;color:#4575EB;line-height: 2.45rem;">
                       年度报告 background:url(../../static/imgs/yearReport.png) no-repeat;&nbsp;
                      </div>
                    </div>-->
                     <img class="wow fadeInDown" src="../../static/imgs/banner.png" alt="更换企业"  style="width: 12.5rem;height: 5rem;margin-left:2rem;">
                  <div class="number wow fadeInUp" style="padding-left:2rem;">{{reportData.gpmc}}丨{{reportData.gpdm}}</div>
                </div>
            </div>            
          </div>          
        </van-col>
      </van-row>
      <!-- banner图 end -->
      <!-- 盈利能力 start -->
      <van-row>
        <van-col span="24">
          <div class="stepOne">              
              <div class="stepOneContent">
                <div class="title wow fadeInUp">
                  <img src="../../static/imgs/profitIcon.png" alt="盈利能力"  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/1.png" alt="盈利能力"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div class="stepOneItem wow fadeInUp">
                  <img src="../../static/imgs/money.png" alt="营业收入"  style="width:1.76rem; height:1.83rem;vertical-align:middle;margin:0.99rem auto 0;">
                  <div class="stepOneItemAnimate" style="margin:0.58rem auto 0.3rem;text-align:center;">
                    <span style="font-size:1.56rem;font-weight:400;" 
                    :class="{fontRedColor:comparativeData(reportData.item01,reportData.data03)=='red',
                    fontGreenColor:comparativeData(reportData.item01,reportData.data03)=='green'}">{{formatMoneyData(reportData.item01*10000).num}}</span>
                    <span style="font-size:0.69rem;color:#fff;">{{formatMoneyData(reportData.item01*10000).unit}}</span>
                  </div>
                  <div style="font-size:0.74rem;color:#fff;text-align:center;">营业收入</div>
                </div>
                <div class="stepOneItem wow fadeInUp">
                  <img src="../../static/imgs/money1.png" alt="营业收入"  style="width:1.76rem; height:1.83rem;vertical-align:middle;margin:0.99rem auto 0;">
                  <div style="margin:0.58rem auto 0.3rem;text-align:center;">
                    <span style="font-size:1.6rem;font-family:DFLiJinHeiW8;font-weight:400;" :class="{fontRedColor:comparativeData(reportData.item02,reportData.data04)=='red',
                    fontGreenColor:comparativeData(reportData.item02,reportData.data04)=='green'}"
                    >{{formatMoneyData(reportData.item02*10000).num}}</span>
                    <span style="font-size:0.69rem;color:#fff;">{{formatMoneyData(reportData.item02*10000).unit}}</span>
                  </div>
                  <div style="font-size:0.74rem;color:#fff;text-align:center;"> 归母净利润</div>
                </div>
                <div class="stepTwoItem wow fadeInUp" v-if="reportData.item03">
                  <van-circle v-model="reportData.item03" layer-color="#E5E5E5" color="#3C5BD5" :rate="reportData.item03" :speed="100" :stroke-width="60" size="100%" :text="reportData.item03+'%'" style="margin:1.02rem auto;display:block;"/>
                  <span class="stepTwoStype">销售毛利率</span>
                </div>
                <div class="stepTwoItem wow fadeInUp" v-if="reportData.item04">
                  <van-circle class="stepTwoCircle" v-model="reportData.item04" layer-color="#E5E5E5" color="#3C5BD5" :rate="reportData.item04" :speed="100" :stroke-width="60" size="100%" :text="reportData.item04+'%'" />
                  <span class="stepTwoStype">销售净利率</span>
                </div>
                <div style="clear:both;"></div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 盈利能力 end -->
      <!-- 营运能力 start -->
      <van-row>
        <van-col span="24">
          <div class="stepTwo">              
              <div class="stepOneContent">
                <div class="title wow fadeInUp">                  
                  <img src="../../static/imgs/OperationalCapability.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/2.png" alt="营运能力"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div style="height:6.8rem;width:100%;" v-if="reportData.item05">
                  <div class="stepTwoLeft1 wow fadeInUp">
                    <img src="../../static/imgs/Operation.png" alt=""  style="width:4.53rem; height:4.58rem;vertical-align:middle;">
                  </div>
                  <div class="stepTwoRight1 wow fadeInUp">
                    <img src="../../static/imgs/OperationImg.png" alt=""  style="width:100%; height:3.24rem;vertical-align:middle;">
                    <div style="position:absolute;top:-0.65rem;left:1.46rem;width: 9.5rem;height: 0.72rem;font-size:0.74rem;font-weight:400;color:#fff;text-align:left;">
                      存货周转率
                    </div>
                    <div style="position:absolute;top:0.7rem;left:1.45rem;width:9.5rem;height:1.41rem;font-size:1.85rem;font-weight:400;color:#FFF600;text-align: left;">
                      {{reportData.item05?reportData.item05.toFixed(2):''}}<span style="font-size:0.74rem;font-weight:400;color:#fff;">次</span>
                    </div>
                    <!-- <div style="position:absolute;top:0.9rem;left:3.95rem;width:4.5rem;height:1.41rem;font-size:0.74rem;font-weight:400;color:#fff;">次</div> -->
                  </div>
                </div>
                <div style="height:6.8rem;width:100%;" v-if="reportData.item06">
                  <div class="stepTwoLeft2 wow fadeInUp">
                    <div class="stepTwoRight1">
                      <img src="../../static/imgs/OperationImg1.png" alt="应收账款周转率"  style="width:100%; height:3.24rem;vertical-align:middle;">
                      <div style="position:absolute;top:-0.65rem;left:1.46rem;width: 9.5rem;height: 0.72rem;font-size:0.74rem;font-weight:400;color:#fff;text-align:left;">应收账款周转率</div>
                      <div style="position:absolute;top:0.7rem;left:1.45rem;width:9.5rem;height:1.41rem;font-size:1.85rem;font-weight:400;color:#FFF600;text-align: left;">
                        {{reportData.item06?reportData.item06.toFixed(2):''}}<span style="font-size:0.74rem;font-weight:400;color:#fff;">次</span>
                      </div>
                    </div>
                  </div>
                  <div class="stepTwoRight2 wow fadeInUp">
                    <img src="../../static/imgs/TurnoverRtatistics.png" alt="周转统计"  style="width:4.53rem; height:4.58rem;vertical-align:middle;">
                  </div>
                </div>
                <div style="height:6.8rem;width:100%;" v-if="reportData.item07">
                  <div class="stepTwoLeft1 wow fadeInUp">
                     <img src="../../static/imgs/TurnoverDaysRanking.png" alt="周转天数排行"  style="width:4.53rem; height:4.58rem;vertical-align:middle;">
                  </div>
                  <div class="stepTwoRight1 wow fadeInUp">
                    <img src="../../static/imgs/OperationImg.png" alt="总资产周转率"  style="width:100%; height:3.24rem;vertical-align:middle;">
                    <div style="position:absolute;top:-0.65rem;left:1.46rem;width: 9.5rem;height: 0.72rem;font-size:0.74rem;font-weight:400;color:#fff;text-align:left;">总资产周转率</div>
                    <div style="position:absolute;top:0.7rem;left:1.45rem;width:9.5rem;height:1.41rem;font-size:1.85rem;font-weight:400;color:#FFF600;text-align: left;">
                      {{reportData.item07?reportData.item07.toFixed(2):''}}<span style="font-size:0.74rem;font-weight:400;color:#fff;">次</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 营运能力 end -->
      <!-- 成长能力 start -->
      <van-row>
        <van-col span="24">
          <div class="stepThree">              
              <div class="stepThreeContent">
                <div class="title wow fadeInUp">                  
                  <img src="../../static/imgs/GrowthAbility.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/3.png" alt="成长能力"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div id="id1" class="wow fadeInUp" style="height:15.92rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">总资产</span>
                    </div>
                    <myEachert :echartObj="echeartData01" id="echartId1" v-if="showEchertThree1"></myEachert>
                    <div style="width:100%;height:1rem;line-height:0.7rem;text-align:right;font-size:0.6rem;font-weight:400;color:#3183BE;box-sizing:border-box;
                    -moz-box-sizing:border-box; -webkit-box-sizing:border-box;padding-right:3rem;">
                    <span style="width:0.6rem;height:0.6rem;background:#377BFB;display:inline-block;">&nbsp;</span>&nbsp;&nbsp;往年数据采用会计政策变更调整前的数据</div>
                </div>
                <div id="id2" style="width:23rem;height:0.04rem;background:radial-gradient(circle,rgba(59,122,253,1),rgba(255,255,255,1));"></div>
                <div class="wow fadeInUp" style="height:15.92rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">净资产</span>
                    </div>
                    <myEachert :echartObj="echeartData02" id="echartId2" v-if="showEchertThree2"></myEachert>
                    <div style="width:100%;height:1rem;line-height:0.7rem;text-align:right;font-size:0.6rem;font-weight:400;color:#3183BE;box-sizing:border-box;
                    -moz-box-sizing:border-box; -webkit-box-sizing:border-box;padding-right:3rem;">
                    <span style="width:0.6rem;height:0.6rem;background:#377BFB;display:inline-block;">&nbsp;</span>&nbsp;&nbsp;往年数据采用会计政策变更调整前的数据</div>
                </div>
                <div id="id3" style="width:23rem;height:0.06rem;background:radial-gradient(circle,rgba(59,122,253,1),rgba(255,255,255,1));"></div>
                <div class="wow fadeInUp" style="height:15.92rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">营业收入</span>
                    </div>
                    <myEachert :echartObj="echeartData03" id="echartId3" v-if="showEchertThree3"></myEachert>
                    <div style="width:100%;height:1rem;line-height:0.7rem;text-align:right;font-size:0.6rem;font-weight:400;color:#3183BE;box-sizing:border-box;
                    -moz-box-sizing:border-box; -webkit-box-sizing:border-box;padding-right:3rem;">
                    <span style="width:0.6rem;height:0.6rem;background:#377BFB;display:inline-block;">&nbsp;</span>&nbsp;&nbsp;往年数据采用会计政策变更调整前的数据</div>
                </div>
                <div id="id4" style="width:23rem;height:0.06rem;background:radial-gradient(circle,rgba(59,122,253,1),rgba(255,255,255,1));"></div>
                <div class="wow fadeInUp" style="height:15.92rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">归母净利润</span>
                    </div>
                    <myEachert :echartObj="echeartData04" id="echartId4" v-if="showEchertThree4"></myEachert>
                    <div style="width:100%;height:1rem;line-height:0.7rem;text-align:right;font-size:0.6rem;font-weight:400;color:#3183BE;box-sizing:border-box;
                    -moz-box-sizing:border-box; -webkit-box-sizing:border-box;padding-right:3rem;">
                    <span style="width:0.6rem;height:0.6rem;background:#377BFB;display:inline-block;">&nbsp;</span>&nbsp;&nbsp;往年数据采用会计政策变更调整前的数据</div>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 成长能力 end -->
      <!-- 偿债能力 start -->
      <van-row>
        <van-col span="24">
          <div class="stepFour">              
              <div class="stepFourContent">
                <div class="title title4 wow fadeInUp">                  
                  <img src="../../static/imgs/Solvency.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/4.png" alt="偿债能力"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div class="rowP">
                   <div class="rowpp wow fadeInLeft">
                     <div class="rowppOne">
                       <p>{{formatMoneyData(reportData.item32*10000).num}}<span>{{formatMoneyData(reportData.item32*10000).unit}}</span></p>
                     </div>
                     <div class="rowppTwo">
                       <p>资产总计</p>
                     </div>
                   </div>
                   <div class="rowpp wow rubberBand">
                     <div class="rowppOne">
                       <p>{{formatMoneyData(reportData.item33*10000).num}}<span>{{formatMoneyData(reportData.item33*10000).unit}}</span></p>
                     </div>
                     <div class="rowppTwo">
                       <p>归属母公司<br/>股东的权益</p>
                     </div>
                   </div>
                   <div class="rowpp wow fadeInRight">
                     <div class="rowppOne">
                       <p>{{formatMoneyData(reportData.item34*10000).num}}<span>{{formatMoneyData(reportData.item34*10000).unit}}</span></p>
                     </div>
                     <div class="rowppTwo">
                       <p>经营活动产生<br/>之现金流量净额 </p>
                     </div>
                   </div>
                </div>
                <div class="rowP">
                   <div class="wow fadeInLeft" :class="(reportData.item36&&reportData.item37)?'rowppp':'otherRowppp'" style="position:relative;">
                     <van-circle class="stepTwoCircle" v-model="reportData.item35" layer-color="#E5E5E5" color="#3C5BD5" :rate="reportData.item35"  :speed="100" :stroke-width="60" size="100%" :text="reportData.item35+'%'" />
                      <span class="stepTwoStype" style="font-size:0.74rem;color:#3469DB;">资产负债率</span>
                   </div>
                   <div v-if="reportData.item36&&reportData.item37" class="rowppp wow rubberBand" style="width:11.5rem;height:9.9rem;">
                     <div style="width:11.4rem;height:1.7rem;line-height:1.7rem;font-size:1.05rem;font-weight:bold;color:rgba(52,105,219,1);text-align:left;">
                       偿债能力分析</div>
                      <div style="width:5rem;height:8.8rem;float:left;">
                        <div style="width: 5rem;height: 1.92rem;line-height: 1.9rem;font-weight:bold;color:rgba(52,105,219,1);background-color:#D6D65B;margin-top:1.5rem;
                          border-radius:0.33rem;">
                          流动比率
                        </div>
                        <div style="width: 5rem;height: 1.92rem;line-height: 1.9rem;font-weight:bold;color:rgba(52,105,219,1);background-color:#D6D65B;margin-top:1.5rem;
                         border-radius:0.33rem;">
                         速动比率
                        </div>
                      </div>
                      <div style="width:6rem;height:8.8rem;float:left;">
                        <div style="width:3rem;height:6.48rem;margin-top:0.91rem;border-right:1px dashed #3469DB;float:left;">
                          <div style="width:3rem;height:1rem;font-size:0.8rem;font-weight:bold;color:rgba(52,105,219,1);padding-top:1.2rem;text-right:right;">
                            {{reportData.item36?reportData.item36.toFixed(2):''}}倍</div>
                          <div style="width:3rem;height:1rem;font-size:0.8rem;font-weight:bold;color:rgba(52,105,219,1);padding-top:2.4rem;text-right:right;">
                            {{reportData.item37?reportData.item37.toFixed(2):''}}倍</div>
                        </div>
                        <div style="width:2.9rem;height:8.8rem;font-size:1.3rem;font-weight:bold;color:rgba(52,105,219,1);margin-top:0.91rem;
                          border-radius:0.33rem;float:left;">
                          <div style="width:3rem;height:1rem;font-size:0.8rem;font-weight:bold;color:rgba(52,105,219,1);padding-top:1.2rem;text-align: left;">
                            <img src="../../static/imgs/long.png" alt="资金" style="width:100%;height:100%;margin-left:2px;" v-if="reportData.item36>reportData.item37"> 
                            <img src="../../static/imgs/small.png" alt="资金" style="width:50%;height:100%;margin-left:2px;" v-else> 
                          </div>
                          <div style="width:3rem;height:1rem;font-size:0.8rem;font-weight:bold;color:rgba(52,105,219,1);padding-top:2.4rem;text-align:left;">
                            <img src="../../static/imgs/long.png" alt="资金" style="width:100%;height:100%;margin-left:2px;" v-if="reportData.item36<reportData.item37">
                            <img src="../../static/imgs/small.png" alt="资金" style="width:50%;height:100%;margin-left:2px;" v-else> 
                          </div>
                        </div>
                      </div>
                   </div>
                   <div class="rowppp wow fadeInRight" style="width:3rem;height:9.9rem;margin: 2rem auto 0;">
                      <img src="../../static/imgs/money3.png" alt="资金" style="width:3.19rem;height:3.19rem;margin-top: 5rem;">                    
                   </div>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 偿债能力 end -->
      <!-- 投资收益 start -->
      <van-row>
        <van-col span="24">
          <div class="stepFive">              
              <div class="stepFiveContent">
                <div class="title title5 wow fadeInUp">
                  <img src="../../static/imgs/Incomefrominvestment.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/5.png" alt="投资收益"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div class="wow fadeInUp" style="height:13.8rem;width:50%;float:left;">
                  <div style="width:10rem;height:2.04remfont-size:0.93rem;margin-top:1.71rem;font-weight:bold;color:rgba(52,105,219,1);">
                    每股收益EPS-基本{{reportData.item38?reportData.item38.toFixed(2):''}}元 
                  </div>
                  <div style="height: 8rem;width: 8rem;float: right;" class="fiveItem">
                    <van-circle v-model="reportData.item39" layer-color="#E5E5E5" color="#3C5BD5" :rate="reportData.item39"  :speed="100" :stroke-width="60" size="100%" :text="reportData.item39+'%'"/>
                  </div>
                </div>
                <div class="wow fadeInUp" style="height:10.1rem;width:50%;float:left;">
                  <div style="height: 8rem;width: 8rem;margin: 0 auto;">
                    <img src="../../static/imgs/shares.png" alt=""  style="width:5.87rem; height:5.87rem;vertical-align:middle;">
                  </div>
                  <div class="line">
                    净资产收益率ROE(加权) 
                    </div>                  
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 投资收益 end -->
      <!-- 市场表现 start -->
      <van-row>
        <van-col span="24">
          <div class="stepSix">              
              <div class="stepSixContent">
                <div class="title title6 wow fadeInUp">
                  <img src="../../static/imgs/MarketPerformance.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/6.png" alt="市场表现"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div id="id5" class="wow fadeInUp" style="height:11.31rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">市值</span>
                    </div>
                    <myEachert :echartObj="echeartData05" id="echartId5" v-if="showEchertSix1"></myEachert>
                </div>
                <div id="id6" class="wow fadeInUp" style="height:11.31rem;width:100%;">
                    <div style="width:6.51rem;height:1.63rem;background:rgba(59,122,253,1);border-radius:3rem;margin-left:1.46rem;margin-top:2.6rem;">
                      <span style="font-size:1.17rem;font-weight:400;color:rgba(255,246,0,1);">股东户数</span>
                    </div>
                    <myEachert :echartObj="echeartData06" unit="万户" id="echartId6" v-if="showEchertSix2"></myEachert>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 市场表现 end -->
      <!-- 分红情况 start -->
      <van-row>
        <van-col span="24">
          <div class="stepSeven">              
              <div class="stepSevenContent">
                <div class="title title7 wow fadeInUp">
                  <img src="../../static/imgs/Dividendsituation.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/7.png" alt="分红情况"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div class="wow fadeInUp" style="height:6rem;width:100%;" v-if="reportData.fhfa.fhfa">
                    <div class="DividendSituationP"><!---->
                      <div class="DividendSituation">
                        <img src="../../static/imgs/OperationImg.png" alt="分红方案"  style="width:100%; height:3.24rem;vertical-align:middle;">
                        <div style="position:absolute;top:-0.65rem;left:1.46rem;width: 10.7rem;height: 0.72rem;font-size:0.74rem;font-weight:400;color:#fff;text-align:left;">
                          分红方案
                        </div>
                        <div style="position: absolute;top: 3.7rem;left: 1.45rem;width: 11.7rem;height: 1.41rem;line-height: 1.41rem;font-size: 0.9rem;font-weight: 400; color: rgb(255, 246, 0);
                          text-align: left;overflow: hidden;">{{reportData.fhfa.fhfa}}</div>
                      </div>
                    </div>
                    <div class="DividendSituation2">
                      <img src="../../static/imgs/Dividend.png" alt="周转统计"  style="width:4.53rem; height:4.58rem;vertical-align:middle;" v-if="!reportData.fhfa.fhje">
                    </div>
                </div>
                <div class="wow fadeInUp" style="height:6rem;width:100%;" v-if="reportData.fhfa.fhje">
                  <div class="DividendSituationP"><!---->
                    <div class="DividendSituation">
                      <img src="../../static/imgs/OperationImg.png" alt="每10股派10元(含税)"  style="width:100%; height:3.24rem;vertical-align:middle;text-align:left;">
                      <div style="position:absolute;top:-0.65rem;left:1.46rem;width: 10.7rem;height: 0.72rem;font-size:0.74rem;font-weight:400;color:#fff;text-align:left;">
                        年度累计分红总额（已宣告）
                      </div>
                      <div style="position: absolute;top: 3.7rem;left: 1.45rem;width: 11.7rem;height: 1.41rem;line-height: 1.41rem;font-size: 0.9rem;font-weight: 400; color: rgb(255, 246, 0);
                          text-align: left;overflow: hidden;">{{formatMoneyData(reportData.fhfa.fhje*10000).num}}{{formatMoneyData(reportData.fhfa.fhje*10000).unit}}</div>
                    </div>
                  </div>
                  <div class="DividendSituation2">
                    <img src="../../static/imgs/Dividend.png" alt="分红"  style="width:4.53rem; height:4.58rem;vertical-align:middle;">
                  </div>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 分红情况 end -->
      <!-- 十大股东 start -->
      <van-row>
        <van-col span="24">
          <div class="stepEight">              
              <div class="stepEightContent">
                <div class="title title8 wow fadeInUp">
                  <img src="../../static/imgs/TenShareholder.png" alt=""  style="width:1.27rem; height:1.13rem;vertical-align:middle;">
                  <img src="../../static/imgs/8.png" alt="十大股东"  style="width:4.5rem; height:1.2rem;vertical-align:middle;">
                </div>
                <div style="width:100%;" id="tenGD">
                  <!-- -->
                  <transition-group appear name="list" tag="ul" class="content" v-if="show">                  
                    <li style="width:100%;height:3rem;" v-for="(item,index) in reportData.sdgd"  :key="index"  :class="`animation-${index+1}`">
                      <div style="width:12.5rem;hight:2rem;float:left;margin-left: 0.45rem;">
                        <div style="height:1.5rem;line-height:1.5rem;font-size:0.6rem;font-weight:bold;color:rgba(37,132,230,1);text-align:left;width: 100%;
                          overflow: hidden;">{{index+1}}、{{item.gdmc}}</div>
                        <van-progress :percentage="item.zgbl" stroke-width="8" />
                      </div>
                      <div style="width:4rem;heigt:auto;float:left;"> 
                        <div style="width:4rem;font-size:0.46rem;font-weight:bold;color:rgba(37,132,230,1);" v-if="index==0">持股数量<br/>(万股)</div>
                        <div style="width:4rem;height:1rem;line-height:1.4rem;font-size:0.45rem;font-weight:400;color:rgba(37,132,230,1);text-align:center;"
                        :class="{paddingTop:index!=0}">{{item.cgsl}}</div>
                      </div>
                      <div style="width:4rem;heigt:auto;float:left;"> 
                      <div style="width:4rem;font-size:0.46rem;font-weight:bold;color:rgba(37,132,230,1);" v-if="index==0">占总股本<br/>比例</div>
                        <div style="width:4rem;height:1rem;line-height:1.4rem;font-size:0.45rem;font-weight:400;color:rgba(37,132,230,1);text-align:center;"
                        :class="{paddingTop:index!=0}">{{item.zgbl}}%</div>
                      </div>
                      <div style="clear:both;"></div>
                    </li>
                  </transition-group> 
                  <!-- <transition-group tag="ul">                  
                    <li style="width:100%;height:auto;" v-for="(item,index) in reportData.sdgd"  :key="index" class="wow fadeInLeft" data-wow-duration="3s" data-wow-delay="5s" >
                      <div style="width:14rem;hight:2rem;float:left;margin-left: 0.9rem;">
                        <div style="height:1.5rem;line-height:1.5rem;font-size:0.6rem;font-weight:bold;color:rgba(37,132,230,1);text-align:left;">{{index+1}}、{{item.gdmc}}</div>
                        <van-progress :percentage="item.zgbl" stroke-width="8" />
                      </div>
                      <div style="width:3.52rem;heigt:auto;float:left;"> 
                        <div style="width:4rem;font-size:0.46rem;font-weight:bold;color:rgba(37,132,230,1);">持股数量<br/>({{formatGuData(item.cgsl).unit}})</div>
                        <div style="width:4rem;height:1rem;line-height:1.4rem;font-size:0.51rem;font-weight:400;color:rgba(37,132,230,1);text-align:cebter;">{{formatGuData(item.cgsl).num}}</div>
                      </div>
                      <div style="width:3.52rem;heigt:auto;float:left;"> 
                      <div style="width:3.52rem;font-size:0.46rem;font-weight:bold;color:rgba(37,132,230,1);">占总股本<br/>比例</div>
                        <div style="width:4rem;height:1rem;line-height:1.4rem;font-size:0.51rem;font-weight:400;color:rgba(37,132,230,1);text-align:cebter;">{{item.zgbl}}%</div>
                      </div>
                      <div style="clear:both;"></div>
                    </li>
                  </transition-group> -->
                  <div style="clear:both;"></div>
                </div>
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 十大股东 end -->
      <!-- 免责声明  start-->
      <van-row>
        <van-col span="24">
          <div class="tip">              
              <div style="height:4.5rem;padding-top: 2rem;">
                <!-- <div class="tipTitle">免责声明  </div>
                <p style="height:11.3rem;width:100%;margin: 0 auto;text-align:left;text-indent:25px">
                  “大财读年报”中各项指标均来源于Wind，具体内容以上市公司公告为准。在任何情况下上述内容并不构成对任何人的投资建,
                  免责声明 ，具体内容以上市公司公告为准。
                </p> -->
                <!-- <img src=""/> -->
                <img src="../../static/imgs/tip.png" alt="免责声明"  style="width:100%; height:100%;vertical-align:middle;">
              </div>
            </div>
        </van-col>
      </van-row>
      <!-- 免责声明  end-->
      <div style="width:100%;height:8.16rem;">
        <!-- searchLogo -->
        <!-- <img src="../../static/imgs/searchLogo.png" alt="盈利能力"  style="width:5.5rem; height:4.5rem;vertical-align:middle;"> -->
      </div>
    </div>    
  </div>
</template>
<script>
// import anime from 'animejs/lib/anime.es.js';
import wx from 'weixin-js-sdk'
import {comparativeData} from '@/libs/common';
import {WOW} from 'wowjs';
import $ from 'jquery'
export default {
  data () {
    return {
      items:[],
      searchValue:'',
      isShowLooding:false,
      showSearch:false,
      isShowSearch:false,
      currentRate:30,
      echartObj:{        
        xAxisData: [],
        seriesBarData:[],
        serieslineData: []      
      },
      echeartData01:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      echeartData02:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      echeartData03:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      echeartData04:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      echeartData05:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      echeartData06:{
        xAxisData: [],
        seriesBarData:[],
        serieslineData: [] 
      },
      showEchert:false,
      reportData:{
        fhfa:{},
        sdgd:[],
        item03:0,
        item04:0,
        item35:0,
        item39:0,
      },
      scrollTop:'',
      show:false,
      showEchertThree1:false,
      showEchertThree2:false,
      showEchertThree3:false,
      showEchertThree4:false,
      showEchertSix1:false,
      showEchertSix2:false,
      imgUrl: require('../../static/imgs/shareImg.jpg'),
      gpdm:'',
    }
  },
  created(){
    // var url=window.location.href;
    // var theRequest = {};
    // if(url.indexOf("?")!=-1){
    // 　　var str = url.split("?");
    // 　　for(var i=0;i<str.length;i++){
    //       theRequest[str[i].split("=")[0]] = decodeURI(str[i].split("=")[1]);
    //     }   
    // }
    this.gpdm= this.$route.params.gpdm?this.$route.params.gpdm:'002936.SZ';
    this.getReportData();        
  },
  mounted (){
    // this.$nextTick(()=>{
    //   new WOW({live: false}).init();
    // });
    window.addEventListener('scroll', this.scrollToTop)
  },
  methods:{ 
    scrollToTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientW=document.body.clientWidth;
      let clientH=document.documentElement.clientHeight-100;
      let echart1=document.getElementById('id1').offsetTop-scrollTop;
      let echart2=document.getElementById('id2').offsetTop-scrollTop;
      let echart3=document.getElementById('id3').offsetTop-scrollTop;
      let echart4=document.getElementById('id4').offsetTop-scrollTop;
      let echart5=document.getElementById('id5').offsetTop-scrollTop;
      let echart6=document.getElementById('id6').offsetTop-scrollTop;
      let tenGD=document.getElementById('tenGD').offsetTop-scrollTop;
      // console.log(document.getElementById('id1').offsetTop+'-'+scrollTop+'='+echart1+'----------------------  '+clientH)
      // console.log('滚动条高'+scrollTop,'屏宽'+clientW)
      if(echart1<clientH){
          this.showEchertThree1=true;
      }
      if(echart2<clientH){
        this.showEchertThree2=true;
      }
      if(echart3<clientH){
        this.showEchertThree3=true;
      }
      if(echart4<clientH){
        this.showEchertThree4=true;
      }
      if(echart5<clientH){
        this.showEchertSix1=true;
      }
      if(echart6<clientH){
        this.showEchertSix2=true;
      }
      if(tenGD<clientH){
        this.show=true;
      }else{
        this.show=false;
      }  
    },
    changeBusiness(){//更换企业按钮事件
      this.isShowLooding=true;
    },  
    search(){//搜索企业      
        this.$http.request({
          method:'POST',
          url:'/ygnb2019/search',
          data:{'keyname':this.searchValue}
        }).then((data)=>{
          if(data.status===200){
            this.items=data.data.data;
            // console.log(data.data.data);
          }else{
            
          }
        }).catch((err)=>{
          console.log(err);
        });
    },
    selectionItem(items){//选中一项
        this.showSearch=false;
        this.searchValue='';
        this.items=[];
        this.isGetData(items); 
    },
    isGetData(items){//加载读报数据 
        this.$http.request({
          method:'POST',
          url:'/ygnb2019/info',
          data:{'gpdm':items.gpdm}
        }).then((data)=>{
          console.log(data.data)
          if(data.status===200&&data.data.code!='-104'){
            this.isShowLooding=false;
            this.gpdm= items.gpdm;   
            this.getReportData();    
          }else{
            this.$dialog.alert({
                message: '您搜索的企业年报尚未报出'
              });
          }
        }).catch((err)=>{
          console.log(err);
        });
    },
    getReportData() {    //加载读报数据 
      // this.isShowLooding=true;
      this.$http.request({
        method:'POST',
        url:'/ygnb2019/info',
        data:{'gpdm':this.gpdm}
      }).then((data)=>{
        if(data.status===200){
          this.isShowLooding=false;          
          this.success(data.data.data);
          this.initBaseData();
        }else{

        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    detailNumber(val){//保留二位小數
      if (val) {        
        return  Math.round(val*100)/100;
      } else {
        return 0;
      }
    },
    success(data){
      console.log(data)
      this.reportData=data;
      this.showEchertThree1=false;
      this.showEchertThree2=false;
      this.showEchertThree3=false;
      this.showEchertThree4=false;
      this.showEchertSix1=false;
      this.showEchertSix2=false;
      this.reportData.item03=this.detailNumber(data.item03);
      this.reportData.item04=this.detailNumber(data.item04);
      this.reportData.item35=this.detailNumber(data.item35);
      this.reportData.item39=this.detailNumber(data.item39);
      let xAxisData= ['2015', '2016', '2017', '2018', '2019'];
      this.echeartData01={
        xAxisData:xAxisData,
        seriesBarData:this.formatEchertData(data.data01),
        serieslineData: data.tb01
      };
      this.echeartData02={
        xAxisData:xAxisData,
        seriesBarData:this.formatEchertData(data.data02),
        serieslineData: data.tb02 
      };
      this.echeartData03={
        xAxisData:xAxisData,
        seriesBarData:this.formatEchertData(data.data03),
        serieslineData: data.tb03
      };
      this.echeartData04={
        xAxisData:xAxisData, 
        seriesBarData:this.formatEchertData(data.data04),
        serieslineData: data.tb04
      };
      this.echeartData05={
        xAxisData:xAxisData,
        seriesBarData:this.formatEchertData(data.data05),
        serieslineData: data.tb05 
      };
      this.echeartData06={
        xAxisData:xAxisData,
        seriesBarData:data.data06,
        serieslineData: data.tb06 
      };
      this.$nextTick(()=>{
        new WOW({live: false}).init();
      });
    },
    formatEchertData(items){//统一将万元以元换算
      let NewArray=[];
      for(let i=0;i<items.length;i++){
        let item=items[i]*10000;
        NewArray.push(item)
      }
      return NewArray;
    },   
    formatMoneyData(item){
        function unitConvert(num) {
          var moneyUnits = ["元", "万元", "亿元", "万亿"]
          var dividend = 10000;
          var curentNum = num;
          //转换数字
          var curentUnit = moneyUnits[0];
          //转换单位
          for (var i = 0; i <4; i++) {
          curentUnit = moneyUnits[i]
          if(strNumSize(curentNum)<5){
          break;
          }
          curentNum = curentNum / dividend
          }
          var m = {num: 0, unit: ""}
          m.num = curentNum.toFixed(2)
          m.unit = curentUnit;
          return m;
        }

        function strNumSize(tempNum){
          var stringNum = tempNum.toString()
          var index = stringNum.indexOf(".")
          var newNum = stringNum;
          if(index!=-1){
          newNum = stringNum.substring(0,index)
          }
          return newNum.length
        }
        if(item&&item!=0){
          var data=unitConvert(item);
          return data;
        }else{
          return {
            num:0,
            unit:'元'
          };
        }        
    },
    formatGuData(item){
        function unitConvert(num) {
          var moneyUnits = ["元", "万股", "亿股", "万股"]
          var dividend = 10000;
          var curentNum = num;
          //转换数字
          var curentUnit = moneyUnits[0];
          //转换单位
          for (var i = 0; i <4; i++) {
          curentUnit = moneyUnits[i]
          if(strNumSize(curentNum)<5){
          break;
          }
          curentNum = curentNum / dividend
          }
          var m = {num: 0, unit: ""}
          m.num = curentNum.toFixed(2)
          m.unit = curentUnit;
          return m;
        }

        function strNumSize(tempNum){
          var stringNum = tempNum.toString()
          var index = stringNum.indexOf(".")
          var newNum = stringNum;
          if(index!=-1){
          newNum = stringNum.substring(0,index)
          }
          return newNum.length
        }
        if(item&&item!=0){
          var data=unitConvert(item);
          return data;
        }else{
          return {
            num:0,
            unit:'股'
          };
        }      
    },
    comparativeData(val,arr){
      if(val&&arr&&arr.length>2){
          let index=arr.findIndex((value,index,arr)=>{
            if(val==value){
              return index;
            }            
          });
          if(index>=1){
            if(val>arr[index-1]){
              return 'red';
            }else if(val<arr[index-1]){
              return 'green';
            }
          }
      }      
    },
    initBaseData(){
      this.$http.request({
        method:'POST',
        url:'tools/wxshares',
        data:{'url':window.location.href.split('#')[0]}
      }).then((data)=>{
        if(data.status===200){
          this.weChatShare(data.data.data);
        }else{
        }
      }).catch((err)=>{
        console.log(err);
      });
    },
    weChatShare(params){
      let self=this;  
      wx.config({
        debug: false, 
        appId: params.appid, // 必填，公众号的唯一标识
        timestamp:params.timestamp, // 必填，生成签名的时间戳
        nonceStr: params.noncestr, // 必填，生成签名的随机串
        signature: params.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] 
      });
      wx.ready(function(){
        var params={
          title: '一图读懂上市公司年报', 
          desc: '大财读年报—大河财立方和中原证券联合出品', 
          link:'https://expand.dahecube.com/dhclf/ygnb2019/'+self.gpdm, 
          imgUrl: 'https://att.dahecube.com/202003/clfzk.jpg', 
          success: function (rep) {
            console.log(rep)
          }
        }
        console.log (self.gpdm)
        wx.updateAppMessageShareData (params);
        wx.updateTimelineShareData(params);
      });
      wx.error(function(res){ 
          console.log("好像出错了！！",res);  
      });  
    },
    baseBillion(item){//以亿元
      if(item){
        var val = (item/100000000).toFixed(2);
        return val;
      }else{
        return 0;
      }
      
    }


  }  
}
import './report.css'
</script>
<style>
.paddingTop{
  padding-top:20px;
}
/*.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

 .list-item {
  transition: all 5s;
  display: inline-block;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateX(-50px);
}
.list-leave-active {
  position: absolute;
} */
</style>
<style lang="scss" scoped>
.searchModel{
  // background:url('../../static/imgs/searchBg.jpg') no-repeat;
  background: #3b7cf5;
  background-size: cover;
  background-position-x: center;
  width:100%;height:100%;
  position:fixed;
}
$grid-columns: 10; 
.content {
  padding: 0.3rem;
  // .box {
  //   width: 100%;
  //   height: 2rem;
  //   background: red;
  //   margin-bottom: 0.3rem;
  //   box-shadow: 0 0 0.2rem rgba($color: #000000, $alpha: 1);
  // }

  @for $i from 1 through $grid-columns {
    $time: ($i * 100+200) + ms;
    .animation-#{$i} {
      transition: all 0.5s linear;
      animation-name: toLeft; // toBottom
      animation-duration: 0.5s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
      animation-fill-mode: both;
      animation-delay: $time;
    }
  }
}
@keyframes toLeft{
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
// 方向 下-->上
@keyframes toTop {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
// 方向 上-->下
@keyframes toBottom {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>