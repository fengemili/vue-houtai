<template>
    <div class="body">
        <p>标题：</p><el-input class="post-title" v-model="title" placeholder="请输入标题" autofocus='true' clearable></el-input>

        <p>简介:</p><el-input
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
            <p>视频：</p>
            <el-upload
                ref='upload'
                class="upload-demo"
                drag
                action="none"
                :http-request='uploadfile'
                :on-remove="handleRemove"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传视频文件文件</div>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible">
            <video width="100%" :src="dialogImageUrl"></video>
            </el-dialog>
        </div>
        <el-button type="primary" @click="sendPost">发布</el-button>
        <el-button>清空</el-button>

    </div>
</template>

<script>
export default {
  name:"uploadvideo",
  data() {
    return {
      title: "",
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      tag: "新手",
      video: '',
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },


    uploadfile(e) {
      this.video = e.file;
      console.log(this.video);
    },

    sendPost() {
      if(this.title == ''){
        this.$message({
          message: '标题不能为空',
          type: 'error'
        });
        return;
      }else if(this.content == ''){
        this.$message({
          message: '简介不能为空',
          type: 'error'
        });
        
      }else if(this.video == ''){
        this.$message({
          message: '视频文件不能为空',
          type: 'error'
        });
      }else{
        let formData = new FormData();
        formData.append("rooter", localStorage.getItem("rooterId"));
        formData.append("title", this.title);
        formData.append("tag", this.tag);
        formData.append("body", this.content);
        formData.append("video", this.video);
        this.$store.dispatch("sendVideo", formData);
        this.title = "";
        this.content = "";
        this.dialogVisible = false;
        this.dialogImageUrl = "";
        this.imageList = [];
        this.$refs.upload.clearFiles();
        this.tag = "新手";
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  font-size: 14px;
  margin: 20px;
  .post-title {
    width: 60%;
  }
  .post-content {
    width: 60%;
    height: 40%;
    margin-bottom: 10px;
  }
  .upload {
    margin: 20px 0;
  }
}
</style>