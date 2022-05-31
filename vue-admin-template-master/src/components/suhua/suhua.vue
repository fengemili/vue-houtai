<template>
  <div>
  <el-table
    :data="xinshouList"
    border
    style="width: 100%">

    <el-table-column
      prop="createdAt"
      label="日期"
      width="180">
    </el-table-column>

    <el-table-column
      prop="author.username"
      label="用户"
      width="180">
    </el-table-column>

    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>

    <el-table-column
      prop="porp"
      label="图片">
      <template slot-scope="{row,$index}">
          <img v-show="row.imageList.length!=0" v-for="(img,index) in row.imageList" :src="img" alt="" style="width:100px;height:100px">
      </template>
    </el-table-column>

    <el-table-column
      prop="edit"
      label="操作">
      <template slot-scope="{row,$index}">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletePost(row)"></el-button>
        <el-button type="primary" icon="el-icon-reading" size="mini" @click="showPostInfo(row)"></el-button>
      </template>
    </el-table-column>
    
  </el-table>

  <Pagnation :limit="limit" :offset="offset" :tag="tag" :total="total"/>

  <Drawer ref='drawer'/>
  </div>
  
</template>

<script>
import Drawer from '../../components/drawer'
import Pagnation from '../../components/pagnation/pagnation'

  export default {
    name:"suhua",
    components:{ Drawer, Pagnation },
    data() {
      return {
        xinshouList:[],
        tag:'速滑',
        limit:5,
        offset:1,
        total:0
      }
    },
    mounted(){
      this.getPostList()
    },
    // computed:{
    //   xinshouList(){
    //     return this.$store.state.post.xinshou
    //   },    
    // },
    
    methods:{

      //获取平花帖子列表
      async getPostList(){
          let data = {}
          data.tag = this.tag
          data.limit = this.limit
          data.offset = this.offset
          await this.$store.dispatch('getPostList',data)
          this.getPostdata()
      },

      //从store中获取数据到页面中
      async getPostdata(){
          this.xinshouList = await this.$store.state.post.xinshou
          this.total = await this.$store.state.post.count
      },


      //展示侧边栏的详细信息 并给drawer组件传递详细信息
      async showPostInfo(row) {
        await this.$store.dispatch('getReplyList',row._id);
        this.$refs.drawer.drawerData = row;
        let replyList = await this.$store.state.post.replyList
        this.$refs.drawer.replyList = replyList;
        this.$refs.drawer.drawer = true;
      },

        //删除某一个帖子
        async deletePost(row){
            await this.$store.dispatch('deletePost',row._id)
            this.$message({
              message: '帖子删除成功',
              type:'success'
            })
            this.getPostList()
        }

    }

  }
</script>

<style lang="scss" scoped>

</style>