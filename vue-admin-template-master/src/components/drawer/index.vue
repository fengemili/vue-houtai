<template>
  <!-- 帖子评论区 -->
  <el-drawer
    :title="drawerData.title"
    :visible.sync="drawer"
    direction="rtl"
    :before-close="handleClose">
    <div class="drawer-body"   style="overflow:scroll">
      <div class="userInfo">
        <img class="avart" :src="drawerData.author.image" alt="">
        <div class="userInfo-right">
          <p class="userId">{{drawerData.author.username}}</p>
          <p class="creatTime">{{drawerData.createdAt}}</p>
        </div>
      </div>
      <div class="content-box" >
          <p class="description">{{drawerData.body}}</p>
          <img v-for="(img,index) in drawerData.imageList" :src="img" alt="">
      </div>

      <div class="reply-body" >
        <div class="reply-box" v-for="(replys,index) in replyList" :key="index">
            <div class="reply-userInfo">
              <img class="reply-avart" :src="replys.author.image" alt="">
              <p class="reply-name">{{replys.author.username || replys.author.rootname}}</p>
              <!-- 标识管理员 -->
              <i  v-show='replys.author.account' class="el-icon-user-solid icon">管理员大大</i>
            </div>
            <div class="reply-center">
            <p class="reply-content">{{replys.reply}}</p>
            <i class="el-icon-delete delete" @click="deleteThisReply(replys)"></i>
            </div>
            <div class="line"></div>
        </div>
      </div >

      <div class="input-box">
        <el-input class="reply-content" v-model="reply" placeholder="请输入内容"></el-input>
        <el-button class="el-btn" type="primary" @click="sendReply">发送</el-button>
      </div>

      </div>


    </el-drawer>
</template>

<script>
export default {
    name:"drawer",
    data() {
        return {
          drawer: false,
          drawerData:{
            author: {}
          },
          reply:'',
          replyList:[]
        };
    },
    mounted() {
        
    },

    methods:{
        //关闭侧边栏
        handleClose(){
            this.replyList=[]
            this.drawer = false
        },

        async getReplyList(){
            //向服务器获取最新评论列表
            await this.$store.dispatch('getReplyList',this.drawerData._id)
            this.replyList = await this.$store.state.post.replyList
        },

        //发布评论
        async sendReply(){
            let formdata = {}
            formdata.reply = this.reply
            formdata.rooterId = localStorage.getItem("rooterId")
            formdata.post_id = this.drawerData._id
            //向服务器发请求存储评论
            await this.$store.dispatch('sendReply',formdata)
            this.reply = ''
            this.getReplyList()
        },

        //删除评论
        async deleteThisReply(replyId){
          console.log(replyId);
          await this.$store.dispatch('deleteReply',replyId._id)
          this.$message({
            message: '评论删除成功',
            type:"success"
          })
          this.getReplyList()
        }
    }
}
</script>


<style lang="scss" scoped>

  .drawer-body {
    display:flex;
    flex-direction:column;
    margin: 10px;
    height: 660px;
    .userInfo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      border: 1px solid #000;
      box-shadow:  2px 2px 5px #000;
      border-radius:5px;
      padding:10px;
      .avart{
        width:50px;
        height:50px;
        border-radius: 5px;
      }
      .userInfo-right{
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 10px;
        margin-left: 20px;
      }
    }

     .content-box {
       width: 100%;
       margin-top:10px;
       border: 1px solid #000;
       box-shadow:  2px 2px 5px #000;
       border-radius:5px;
       padding:10px;
       
       .description{
         font-size: 18px;
       }
       img {
         width:120px;
         height:120px;
       }
    }

    .reply-body{
      margin-top:20px;
      margin-bottom: 50px;
      border: 1px solid #000;
      border-radius:5px;
      box-shadow:  2px 2px 5px #000;
      padding:10px;
      .reply-box{
        display:flex;
        flex-direction:column;
        margin-top: 10px;
        .line{
          border-bottom: 1px solid #000;
        }
        .reply-userInfo{
          display:flex;
          align-items:center;
          .icon{
            margin-left:150px;
          }
          .reply-avart{
            height:40px;
            width:40px;
            border-radius:15px;
            margin-right: 30px;
          }
          
        }

        .reply-center{
          display:flex;
          justify-content:space-between;
          align-items: center;
        }
      }
    }

    .input-box{
      margin-top:10px;
      display:flex;
      position: fixed;
      bottom: 0;
      width:425px;
      
    }
  }

  

 
  
</style>