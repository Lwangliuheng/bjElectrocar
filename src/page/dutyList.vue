<style scoped>
  .list_wrap{
    width:100%;
    height:100vh;
    background-color: #f8f8f8;
    font-size: 15px;
  }
  .clearfix:after{
   content:".";/*加一段内容*/
   display:block;/*让生成的元素以块级元素显示，占满剩余空间*/
   height:0;/*避免生成的内容破坏原有布局高度*/
   clear:both;/*清除浮动*/
   visibility:hidden;/*让生成的内容不可见*/
  }
  .clearfix{zoom:1;/*为IE6，7的兼容性设置*/}
  .list_top{
    padding-top:80px;
    max-width:900px;
    background-color: #fff;
    margin:0px auto 10px ;
    height:300px;
  }
  .list_content{
    max-width:900px;
    background-color: #fff;
    margin:0 auto;
    height:400px;
  }
  .one_wrap{
    position:relative;
    width:600px;
    margin:0px auto 10px ;
  }
  .oneList{
    margin-right:20px;
  }
  .one{
    margin-bottom:30px;
  }
  .yzm_wrap{
      padding-top:7px;
      position:absolute;
      top:58px;
      right:-90px;
      text-decoration: underline;
      color:#096fd4;
  }
 .left{
  float:left;
 }
   .input_box{
    width:200px;
    height:30px;
    font-size: 14px;
    border:1px solid #b6b6b6;
   }
   .inquire_but{
      width:100px;
      height:30px;
      text-align:center;
      line-height: 30px;
      background-color: #096fd4;
      border-radius: 4px;
      color:#fff;
      font-size: 15px;
     }
     .but_wrap{
      width:300px;
      margin-left:350px;
      margin-top:30px;
     }
     .footer{
       color:#ed0303;
       font-size: 14px;
       margin-left:261px;
       margin-top:30px;
     }
     .word{
      display: inline-block;
      width:90px;
      text-align:right;
     }
     .table_wrap{
      width:700px;
      margin:0 auto;
      padding-top:40px;
     }
  .table th{
    color: #2EAB3B;
    background: #ECF8F5;
    border: none;
  }
  .tWord{
    font-size: 30px;
    text-align: center;
    line-height: 300px;
    color:#b6b6b6;
  }
  .xzBut{
    width:60px;
    height:30px;
    margin:10px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    border-radius:4px;
    color:#fff;
    background-color: #096fd4;
  }
  .blue{
    color:#096fd4;
  }
  .red{
    color:#f20011;
  }
</style>
<template>
  <div class="list_wrap">
       <div class="list_top">
         <ul class="one_wrap clearfix">
             <li class="left oneList one">
              <span class="word">文书编号：</span><input type="text" name="" v-model="writNum"  class="input_box" placeholder="请输入文书编号" v-on:blur="writChange">
             </li>
             <li class="left one">
             <span class="word">身份证号：</span><input type="text" name="" v-model="idCarNum" class="input_box" placeholder="请输入身份证号" v-on:blur="carChange">
             </li>
             <li class="left oneList">
             <span class="word">手机号：</span><input type="text" name="" v-model="phoneNum"  class="input_box" placeholder="请输入手机号" v-on:blur="phoneChange">
             </li>
             <li class="left">
             <span class="word">验证码：</span><input type="text" name="" v-model="authCode" class="input_box" placeholder="请输入验证码" v-on:blur="authChange">
             </li>
             <li class="left yzm_wrap" @click="gainAuthCode">{{authValue}}</li>
         </ul>
          <div class="clearfix but_wrap">
            <div class="inquire_but left" style="margin-right:30px;" v-on:click="registerButton">
               查询
            </div>
             <div class="inquire_but left" v-on:click="resetButton">
               重置
            </div>
          </div>
          <div class="footer">
             提示：以上信息需与生成责任认定书时填写的内容一致， 请您仔细核对
          </div>
       </div>
       <div class="list_content">
          <div v-if="!listStatus" class="tWord">
            暂无数据
          </div>
          <div class="table_wrap" v-if="listStatus">
         
        <table class="table" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #bbb;">
                <thead>
                <tr>
                  <th style="width:18%;">
                    序号
                  </th>
                  <th  style="width:18%;">
                    生成时间
                  </th>
                  <th  style="width:18%;margin:0px 6px;">
                    文书编号
                  </th>
                  <th  style="width:18%;">
                    身份证号
                  </th>
                  <th  style="width:18%;">
                    状态
                  </th>
                  <th  style="width:18%;">
                    操作
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in listData">
                  <td>{{index+1}}</td>
                  <td>{{fmtDate(item.createTime)}}</td>
                  <td style="padding:0px 10px;">{{item.num}}</td>
                  <td style="padding:0px 10px;">{{item.licenseNo}}</td>
                  <td>
                    <span class="blue" v-if="item.type">有效</span>
                    <span class="red" v-if="!item.type">作废</span>
                  </td>
                  <td>
                    <span class="xzBut" @click="goUrl($event,item.url)">下载</span>
                  </td>
                </tr>
                </tbody>
        </table>
          </div>
       </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
      return{
        listStatus:false,
         listData:'',
         verifyStaus:false,
         phoneNumState:false,
         phoneNum:"",
         writStatus:false,
         writNum:"",
         idCarStatus:false,
         idCarNum:"",
         authValueState:true,
         authCodeState:false,
         authCode:"",
         countdown:60,//计时器
         authValue:"获取验证码",
      }
    },
  watch:{

  },
    created(){
  
    },
    mounted() {
    
    },
    methods: {
       goUrl(e,url){
        // window.location.href = url;
        window.open(url);
      },
       fmtDate(obj){
          var date =  new Date(obj);
          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
      //重置按钮
      resetButton(e){
        this.writStatus = false;
        this.writNum = '';
        this.idCarStatus = false;
        this.idCarNum = '';
        this.authCodeState = false;
        this.authCode = '';
        this.phoneNumState = false;
        this.phoneNum = '';
        this.listStatus = false;
        this.listData = [];
      },
        //注册按钮点击
        registerButton(e){
          
          if(!this.writStatus){
               this.$message({
                showClose: true,
                message: '请输入正确的文书编号',
                type: 'error'
              });
              return
           };
           if(!this.idCarStatus){
               this.$message({
                showClose: true,
                message: '请输入正确的身份证号',
                type: 'error'
              });
              return
           };
           if(!this.phoneNumState){
               this.$message({
                showClose: true,
                message: '请输入正确的手机号',
                type: 'error'
              });
              return
           };
           if(!this.authCodeState){
               this.$message({
                showClose: true,
                message: '请输入正确的验证码',
                type: 'error'
              });
              return
           };
           var paramData = {
              num:this.writNum,
              licenseNo:this.idCarNum,
              phone:this.phoneNum,
              code:this.authCode
            }
            this.$ajax.post(this.ajaxUrl+"/list",paramData)
             .then(response => {
               if(response.data.rescode == 200){
                  console.log(response.data,"list");
                   var list = JSON.stringify(response.data.list);
                   if(response.data.list.length > 0){
                       this.listStatus = true;
                   }else{
                       this.listStatus = false;
                   };
                   this.listData = response.data.list;
                   localStorage.setItem('setDutyData',list);
               }else{
                  this.listStatus = false;
                   this.$message({
                    showClose: true,
                    message: '验证失败！',
                    type: 'error'
                  });
               }
             }, err => {
              this.listStatus = false;
               console.log(err);
             })
             .catch((error) => {
                this.listStatus = false;
             })
          
        },
        //短信验证码轮训
        settime(){
         var that = this;
         if (this.countdown == 0) { 
             this.authValueState = true;
             this.authValue="获取验证码"; 
             this.countdown = 60; 
             return;
         } else { 
             this.authValueState = false;   
             this.authValue="重新发送(" + this.countdown + ")"; 
             this.countdown--; 
         } 
         
         setTimeout(function() { 
             that.settime() }
             ,1000) 
        },
        //获取短信验证码
        gainAuthCode(){
         if(!this.writStatus){
               this.$message({
                showClose: true,
                message: '请输入正确的文书编号',
                type: 'error'
              });
              return
           };
           if(!this.idCarStatus){
               this.$message({
                showClose: true,
                message: '请输入正确的身份证号',
                type: 'error'
              });
              return
           };
           if(!this.phoneNumState){
               this.$message({
                showClose: true,
                message: '请输入正确的手机号',
                type: 'error'
              });
              return
           };
         if(this.authValueState){
            var paramData = {
              num:this.writNum,
              licenseNo:this.idCarNum,
              phone:this.phoneNum
            }
            console.log(paramData,"短信验证码数据")
            this.$ajax.post(this.ajaxUrl+"/getValidaCode",paramData)
             .then(response => {
               console.log(response,22222)
               if(response.data.rescode == 200){
                  this.settime();
                  this.verifyStaus = true;
               }else{
                this.verifyStaus = false;
                 //解决进入空白问题
                this.$confirm(response.data.resdes, '温馨提示', {
                             confirmButtonText: '确定',
                             showCancelButton:false,
                             customClass:"tsk",
                             type: 'warning',
                             showClose:false,
                             center: true
                     }).then(() => {
                         //alert(222222)
                     }).catch(() => {
                     });
               }
             }, err => {
               console.log(err);
             })
             .catch((error) => {
                this.verifyStaus = false;
             })
         }
        },
        writChange(e){
           var writNum = $.trim(e.target.value);
           var r = /^[A-Za-z0-9]+$/;
          if (!r.test(writNum)) {
             this.$message({
                showClose: true,
                message: '请输入正确的文书编号',
                type: 'error'
              });
             this.writStatus = false;
             // this.writNum = '';
          }else{
             this.writStatus = true;
             this.writNum = writNum;
          }
        },
        carChange(e){
            var idCar = $.trim(e.target.value);
            var r =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!r.test(idCar)) {
              this.$message({
                showClose: true,
                 message: '请输入正确的身份证号',
                 type: 'error'              
               });
              this.idCarStatus = false;
              // this.idCarNum = '';
            }else{
              this.idCarStatus = true;
              this.idCarNum = idCar;
           }
        },
        //短信验证码
        authChange(e){
           var auth = $.trim(e.target.value);
           var r = /^\d{6}\b/;
          if (!r.test(auth)) {
             this.$message({
                showClose: true,
                message: '请输入正确的验证码',
                type: 'error'
              });
             this.authCodeState = false;
             // this.authCode = '';
          }else{
             this.authCodeState = true;
             this.authCode = auth;
          }
        },
        phoneChange(e){
           var phone = $.trim(e.target.value);
           var r = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
           if (!r.test(phone)) {
             this.$message({
                showClose: true,
                message: '请输入正确的手机号',
                type: 'error'              
              });
             this.phoneNumState = false;
             // this.phoneNum = '';
           }else{
             this.phoneNumState = true;
             this.phoneNum = phone;
          }
        },
     
        },
      components: {
      },
    }
</script>
