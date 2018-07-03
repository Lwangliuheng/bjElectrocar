<style scoped>
     .duty_wrap{
        width:100%;
        height:100vh;
        background-color: #f8f8f8;
        padding-top:3vh;
     }
     .dutyContent{
        /*height:99vh;*/
        background-color: #fff;
     }
     .list_one{
       overflow: hidden;
       font-size: 18px;
       padding:13px 0px;
       border-bottom:1px solid #f8f8f8;
     }
     .left{
      float:left;
     }
     .list_name{
       width:2.6rem;
       text-align: left;
       padding-left:0.3rem;
     }
     .input_box{
      width:100%;
      height:30px;
      font-size: 16px;
     }
     .yzm{
       width:2.5rem;
       margin-right:20px;
     }
     .yzm_input{
      width:100%;
     }
     .yzm_but{
      color:#096fd4;
      font-size: 16px;
      line-height: 30px;
      text-decoration: underline;
     }
     .list_input{
      width:4rem;
     }
     .inquire_but{
      width:4rem;
      height:0.9rem;
      text-align:center;
      line-height: 0.9rem;
      background-color: #096fd4;
      border-radius: 4px;
      color:#fff;
      margin:0 auto;
      font-size: 15px;
      margin-top:1rem;
     }
     .footer{
       color:#ed0303;
       font-size: 14px;
       padding:1rem 0.4rem;
       text-align: center;
     }
</style>
<template>
  <div class="duty_wrap">
     <div class="dutyContent">
         <ul class="list_one">
             <li class="left list_name">
                文书编号：
             </li>
             <li class="left list_input">
                <input type="text" name="" class="input_box" placeholder="请输入文书编号" v-on:blur="writChange">
             </li>
         </ul> 
         <ul class="list_one">
             <li class="left list_name">
                身份证号：
             </li>
             <li class="left list_input">
                <input type="text" name="" class="input_box" placeholder="请输入身份证号" v-on:blur="carChange">
             </li>
         </ul> 
         <ul class="list_one">
             <li class="left list_name">
                手机号：
             </li>
             <li class="left list_input">
                <input type="text" name="" class="input_box" placeholder="请输入手机号" v-on:blur="phoneChange">
             </li>
         </ul> 
         <ul class="list_one">
             <li class="left list_name">
                验证码：
             </li>
             <li class="left yzm">
                <input type="text" name="" class="input_box yzm_input" placeholder="请输入验证码" v-on:blur="authChange">
             </li>
             <li class="left yzm_but" @click="gainAuthCode">
                 {{authValue}}
             </li>
         </ul> 
     </div>
    <div class="inquire_but" v-on:click="registerButton">
       查询
    </div>
    <div class="footer">
       提示：以上信息需与生成责任认定书时填写的内容一致， 请您仔细核对
    </div>
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
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
    mounted() {
     
    },
    created(){
    

    },
    watch:{
     

    },
    methods: {
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
                   localStorage.setItem('setDutyData',list);
                   this.$router.push("/detail");
               }else{
                   this.$message({
                    showClose: true,
                    message: '验证失败！',
                    type: 'error'
                  });
               }
             }, err => {
               console.log(err);
             })
             .catch((error) => {
              
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
             this.writNum = '';
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
              this.idCarNum = '';
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
             this.authCode = '';
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
             this.phoneNum = '';
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

