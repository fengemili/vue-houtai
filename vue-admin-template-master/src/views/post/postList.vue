<template>
    <div>
        <div class="search"> 
        <el-input  v-model="keyword" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" circle @click="getPostList"></el-button>
        <el-button icon="el-icon-close" circle @click="closeSearch" :disabled='isSearch'></el-button>
        </div>

    <!-- 立即展示 -->
    <Optionbox v-show="isSearch"/>

    <!-- 搜索后展示 -->
    <el-table
    v-show="!isSearch"
        :data="searchPostList"
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
            <el-button type="primary" icon="el-icon-reading" size="mini" @click="showPostList(row)"></el-button>
        </template>
        </el-table-column>

    </el-table>
        <Pagnation :limit="limit" :offset="offset" :total="total" v-show="!isSearch" :keyword="keyword"/>

        <Drawer ref='drawer'/>
    </div>
    
</template>

<script>
import Optionbox from '../../components/postOptionBox'
import Drawer from '../../components/drawer'
import Pagnation from '../../components/pagnation/pagnation'

export default {
    name:"postList",
    data() {
        return {
            searchPostList: [],
            keyword:'',
            isSearch:true,
            limit:5,
            offset:1,
            total:0
        };
    },
    components:{ Optionbox, Drawer, Pagnation },
    mounted(){
        
    },
    methods:{
        //帖子搜索函数
        async getPostList(){
            let data = {}
            data.keyword = this.keyword
            data.limit = this.limit
            data.offset = this.offset
            await this.$store.dispatch('searchPostList',data);
            this.isSearch = false
            this.rootGetPostdata()
        },

        //向vuex获取搜索到的数据
        async rootGetPostdata(){
            this.searchPostList = await this.$store.state.post.searchPostList
            this.total = await this.$store.state.post.searchCount
        },

        //关闭搜索
        closeSearch(){
            this.isSearch = true
            this.searchPostList = []
            this.keyword = ''
        },

        //显示侧边栏详细信息
        async showPostList(row) {
            console.log(row._id);
            this.$refs.drawer.drawerData = row;
            this.$refs.drawer.drawer = true;
            await this.$store.dispatch('getReplyList',row._id);
            let replyList = await this.$store.state.post.replyList
            console.log(replyList);
            this.$refs.drawer.replyList = replyList;
            console.log(replyList,123456);
        },

        //删除某一个帖子
        async deletePost(row){
            await this.$store.dispatch('deletePost',row._id)
            this.$message({
              message: '帖子删除成功',
              type:'success'
            })
            this.searchPost()
        }
    }
}
</script>

<style>
      .search{
         display: flex;
         margin: 20px 15px;
         width: 70%;
      }

</style>