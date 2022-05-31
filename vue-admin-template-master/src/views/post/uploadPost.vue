<template>
    <div class="body">
        <p>标题：</p><el-input class="post-title" v-model="title" placeholder="请输入标题" autofocus='true' clearable></el-input>

        <p>内容：</p></p><el-input
        class="post-content"
        type="textarea"
        :rows='10'
        placeholder="请输入内容"
        v-model="content"
        minlength='1'
        >
        </el-input>

        <div class="check-box">
            <p>类型：</p>
            <el-radio v-model="tag" label="新手">新手</el-radio>
            <el-radio v-model="tag" label="刹车">刹车</el-radio>
            <el-radio v-model="tag" label="平花">平花</el-radio></el-radio>
            <el-radio v-model="tag" label="速滑">速滑</el-radio>
        </div>

        <div class="upload">
            <p>图片：</p>
            <el-upload
            ref='upload'
            action="none"
            :http-request='uploadfile'
            multiple
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <el-button type="primary" @click="sendPost">发布</el-button>
        <el-button>清空</el-button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            content: '',
            dialogImageUrl: '',
            dialogVisible: false,
            tag:"新手",
            imageList:[]
        };
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file,4564897);
      },

      uploadfile(e){
        this.imageList.push(e.file);
        console.log(this.imageList);
      },

      sendPost(){
          
          let formData = new FormData();
          formData.append('rooter',localStorage.getItem('rooterId'))
          formData.append('title',this.title);
          formData.append('tag',this.tag);
          formData.append('body',this.content);
          for (let i = 0; i < this.imageList.length; i++) {
              formData.append('imageList',this.imageList[i])
              
          }
          this.$store.dispatch('sendArticle', formData);
          this.title =''
          this.content = ''
          this.dialogVisible = false
          this.dialogImageUrl = ''
          this.imageList=[]
          this.$refs.upload.clearFiles()
          this.tag='新手'
        
      }

    }
}
</script>

<style lang="scss" scoped>
    .body{
        font-size: 14px;
        margin:20px;
        .post-title{
            width:60%;
        }
        .post-content{
            width:60%;
            height: 40%;
            margin-bottom: 10px;
        }
        .upload{
            margin:20px 0;
        }
    }
</style>