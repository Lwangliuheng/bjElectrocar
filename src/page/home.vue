<style scoped>
     .gray_wrap{
       background: rgba(0,0,0,0.3);
    width:100%;
    position: fixed;
    overflow: scroll;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 201;
     }
     .content_wrap{
      position:fixed;
      bottom:0px;
      width:100%;
      background-color: #f8f8f8;
      height:80vh;
     }
     .list_one{
      padding:0px 0.3rem;
      width:94%;
      margin:0 auto;
      margin-top:0.4rem;
      background-color: #fff;
     }
     .li_one{
      width:100%;
      border-bottom:1px solid #f8f8f8;
      padding:0.2rem 0px 0.2rem 2rem;
      cursor:pointer;
     }
     .li_one_te{
      border-bottom:none;
     }
     .img{
        width:50px;
        height:50px;
        border:1px dashed red;
        vertical-align:middle;
        margin-right:0.4rem;
     }
     .li_wrod{
      font-size: 16px;
     }
</style>
<template>
  <div>
     <div class="gray_wrap">
        <div class="content_wrap">
            <ul class="list_one">
               <li class="li_one">
                  <img src="" class="img">
                  <span class="li_wrod">个人申报</span>
               </li>
               <li class="li_one">
                  <img src="" class="img">
                  <span class="li_wrod">单位预录入</span>
               </li>
               <li class="li_one li_one_te">
                  <img src="" class="img">
                  <span class="li_wrod">历史申请记录</span>
               </li>
            </ul>
        </div>
     </div>
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
       
      }
    },
    mounted() {
     
    },
    created(){
    

    },
    watch:{
     

    },
    methods: {
      
    },
    components: {
      
    },
  }

</script>

