<style scoped>
  .detail_wrap{
    width:100%;
    height:100vh;
    background-color: #f8f8f8;
    padding-top:3vh;
    overflow: scroll;
  }
  .list_one{
    background-color: #fff;
    padding:0px 0.3rem;
     margin-bottom:0.2rem;
  }
  .list_top{
    border-bottom:1px solid #f8f8f8;
  }
  .list_top_content{
     font-size: 19px;
     padding:0.2rem 0px;
     color:#333333;
  }
  .list_top_content span{
     color:#333333;
  }
  .list_content_wrap{
    position: relative;
  }
  .left{
    float:left;
  }
  .examine{
      position: absolute;
      width:1.4rem;
      height:0.7rem;
      text-align:center;
      line-height: 0.7rem;
      background-color: #096fd4;
      border-radius: 4px;
      color:#fff;
      top:-0.8rem;
      font-size: 13px;
      right:-0.2rem;
      margin-top:1rem;
  }
  .list_content{
    padding:0.3rem 0px;
  }
  .list_content_wrod{
      font-size: 18px;
      padding-bottom:0.1rem;
  }
  .list_content_wrod span{
     color:#adadad;
  }
  .right{
    float:right;
  }
  .list_top_right{
    font-size: 16px;
    padding:0.2rem 0px;
    
  }
  .blue{
    color:#096fd4;
  }
  .red{
    color:#f20011;
  }
  .clearfix:after{
   content:".";/*加一段内容*/
   display:block;/*让生成的元素以块级元素显示，占满剩余空间*/
   height:0;/*避免生成的内容破坏原有布局高度*/
   clear:both;/*清除浮动*/
   visibility:hidden;/*让生成的内容不可见*/
  }
  .clearfix{zoom:1;/*为IE6，7的兼容性设置*/}
</style>
<template>
  <div class="detail_wrap">
      <ul class="list_one" v-for="item in dutyData"> 
          <li class="list_top clearfix">
             <p class="list_top_content left">
                <span>生成时间：</span>
                <span>{{fmtDate(item.createTime)}}</span>
             </p>
            <!--  <p class="right list_top_right" v-bind:class="{ blue: isBlue, red: !isBlue }">
              有效
            </p> -->
            <p class="right list_top_right blue" v-if="item.type">
               有效
             </p>
             <p class="right list_top_right red" v-if="!item.type">
               作废
             </p>
          </li>
          <li class="list_content_wrap clearfix">
             <div class="left list_content">
                <p class="list_content_wrod">
                   <span>文书编号：</span>
                   <span>{{item.num}}</span>
                </p>
                <p class="list_content_wrod">
                   <span>身份证号：</span>
                   <span>{{item.licenseNo}}</span>
                </p>
             </div>
             <div class="examine" @click="goUrl($event,item.url)">
               查看详情
             </div>
          </li>
      </ul>
      <!-- <a class="media" href="http://172.16.1.225:8080/file/pdf\2018-06-29\1062901166453194.pdf"></a>  -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
      return{
        dutyData:"",
        isBlue:true
      }
    },
  watch:{

  },
    created(){
  
    },
    mounted() {
      this.dutyData = JSON.parse(localStorage.getItem('setDutyData'));
      console.log(this.dutyData);
    },
    methods: {
      fmtDate(obj){
          var date =  new Date(obj);
          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
      goUrl(e,url){
        // window.location.href = url;
        window.open(url);
      },
      open4(resdes) {
          this.$message({
                showClose: true,
                message: resdes,
                type: 'error'
              });
        },
        open2(resdes){
           this.$message({
                showClose: true,
                message: resdes,
                type: 'success'
              });
        },
       open6() {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        });
      },
     
        },
      components: {
      },
    }
</script>
