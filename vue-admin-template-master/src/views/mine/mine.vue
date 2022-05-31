<template>
   <div>
   <div class="mine" v-show="change">
      <div><img src="../../../public/heigui.jpg" alt=""></div>
      <div class="rooterInfo">
         <div class="name">
            管理员昵称:{{}}
         </div>
         <div class='account'>
            管理员账户:{{}}
         </div>
         <div class='date'>
            注册日期:{{}}
         </div>
      </div>
      <el-button type="primary" @click="change=false">修改</el-button>
   </div>

   <div class="mine-change" v-show='!change'>
      <div><img src="../../../public/heigui.jpg" alt=""></div>
      <el-upload
         class="avatar-uploader"
         action=none
         :http-request='uploadfile'
         :show-file-list="false"
         :on-success="handleAvatarSuccess"
         :before-upload="beforeAvatarUpload">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="rooterInfo">
         <div class="name">
            <div>管理员昵称:</div>
            <div>
               <el-input v-model="rootername" placeholder="请输入内容"></el-input>
            </div>
         </div>
      </div>

      <div class="btn">
         <el-button type="primary" @click="saveRooterInfo">保存</el-button>
         <el-button type="primary" @click="close">取消</el-button>
      </div>
   </div>


   </div>
</template>

<script>
export default {
   name:'mine',
   data() {
      return {
         change:true,
         rootername:'',
         imgUrl:''
      };
   },

   mounted() {
      
   },

   methods:{
      close(){
         this.change = true
         this.rootername = ''
      },

      saveRooterInfo(){

      },

      handleAvatarSuccess(e){
         console.log(e);
      },
      
      beforeAvatarUpload(e){
         console.log(e);
      },

      uploadfile(e){
         console.log(e);
      }
   }
}
</script>

<style lang="scss" scoped>
.mine-change{
   margin: 20px;
   img{
      height: 90px;
      width: 90px;
      border-radius: 15px;
   }
   .name{
         margin-top:20px;
         display:flex;
         align-items:center;
         width: 400px;
   }

   .btn{
      margin-top:20px;
   }

   .avatar-uploader .el-upload {
    border: 10px dashed #1d1c1c;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

 .mine {
   margin: 20px;
   img{
      height: 90px;
      width: 90px;
      border-radius: 15px;
   }
   .rooterInfo{
      margin:20px 0;
      width: 60vw;
      display: flex;
      font-size: 18px;
      align-self:flex-start;
      .name{
         width: 20vw;
      }
      .date{
         width: 20vw;
      }
      .account{
         width: 20vw;
      }
   }
}

</style>