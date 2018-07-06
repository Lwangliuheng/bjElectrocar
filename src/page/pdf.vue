<style scoped>
  
</style>
<template>
  <div>
    
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        

      }
    },
    watch:{
     

    },
    created(){
      
    },
    mounted() {
       this.$confirm(564564654, '温馨提示', {
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
    },
    methods: {
        getData(){
          const  paramData = {};
          this.$ajax.post(this.ajaxUrl+"/getValidaCode",paramData)
           .then(response => {
             console.log(response,22222)
             if(response.data.rescode == 200){
                var url  = "";
                window.open(url);
             }else{
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
           })
        }
    },
    components: {
      
    },
  }

</script>

