<template>
    <div class="searchModel" style="position:absolute;">
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
      <img src="../../static/imgs/searchLogo.png" alt="大河财立方.财力方智库" style="width: 10rem;height: 4rem;margin-top: 8rem;">  
      </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
        searchValue:'',
        showSearch:false,
        items:[]
      }
    },
    created(){
      this.searchValue='';
      this.items=[];
    },
    methods:{
      search(){//搜索企业      
        this.$http.request({
          method:'POST',
          url:'/ygnb2019/search',
          data:{'keyname':this.searchValue}
        }).then((data)=>{
          if(data.status===200){
            this.items=data.data.data;
            console.log(data.data.data);
          }else{
            
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      selectionItem(items){//选中一项
        this.showSearch=false;
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
            this.$router.push({
              name: 'enterpriseReport',
              params: {
                // gpmc: items.gpmc,
                gpdm: items.gpdm,
              }
            })   
            localStorage.setItem('gpdm', items.gpdm);         
          }else{
            this.$dialog.alert({
                message: '您搜索的企业年报尚未报出'
              });
          }
        }).catch((err)=>{
          console.log(err);
        });
      }
  }
}
</script>
<style scoped>
.searchModel{background:url('../../static/imgs/searchBg.jpg') no-repeat;background-size: cover;background-position-x: center;width:100%;height:100%;position:fixed;}
</style>
    