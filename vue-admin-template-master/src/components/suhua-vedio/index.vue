<template>
  <div>

  <el-table
    :data="videoList"
    border
    style="width: 100%">

    <el-table-column
      prop="createdAt"
      label="日期"
      width="180">
    </el-table-column>

    <el-table-column
      prop="rooter.username"
      label="用户"
      width="180">
    </el-table-column>

    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>

    <el-table-column
      prop="porp"
      label="视频">
      <template slot-scope="{row,$index}">
          <video :src="row.videoUrl" style="width:100px;height:100px" controls="controls"></video>
      </template>
    </el-table-column>

    <el-table-column
      prop="edit"
      label="操作">
      <template slot-scope="{row,$index}">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteVideo(row)"></el-button>
        <el-button type="primary" icon="el-icon-reading" size="mini" @click="showVideoInfo(row)"></el-button>
      </template>
    </el-table-column>
    
  </el-table>
  <Pagnation :limit="limit" :offset="offset" :tag="tag" :total="total" />

  <Drawer ref='drawer'/>
  </div>
  
</template>

<script>
import Drawer from '../../components/drawer-video'
import Pagnation from '../../components/pagnation/pagnation'

  export default {
    name:"video-suhua",
    components:{ Drawer, Pagnation},
    data() {
      return {
        limit:5,
        offset:1,
        total:0,
        tag:'速滑',
        videoList:[]
      }
    },
    mounted(){
      this.getVideoList()
    },

    // computed:{
    //   videoList(){
    //     return this.$store.state.video.videoList.video
    //   },
    // },
    
    methods:{
      //给drawer组件传视频信息
      async showVideoInfo(row) {
          console.log(row._id);
          await this.$store.dispatch('getMessageList',row._id);
          this.$refs.drawer.drawerData = row;
          console.log(this.$refs.drawer.drawerData,1);
          let replyList = await this.$store.state.video.messageList
          this.$refs.drawer.replyList = replyList;
          console.log(replyList,123456)
          this.$refs.drawer.drawer = true;
      },

      //删除某个视频
      async deleteVideo(row){
        await this.$store.dispatch('deleteVideo',row._id)
        this.$message({
              message: '该视频删除成功',
              type:'success'
        })
        this.getVideoList()
      },

      //向服务器请求数据获取视频数据
      async getVideoList(){
        let data = {}
        data.tag = this.tag
        data.limit = this.limit
        data.offset = this.offset
        await this.$store.dispatch('getVideoList',data)
        this.getVideoData()
      },
      
      //从vuex中获取数据
      async getVideoData(){
        this.videoList = await this.$store.state.video.videoList
        this.total = await this.$store.state.video.count
        
      }

    }

  }
</script>

<style lang="scss" scoped>

</style>