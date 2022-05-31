<template>
    <div>
        <div class="search"> 
            <el-input  v-model="keyword" placeholder="请输入内容"></el-input>
            <el-button class='search-btn' icon="el-icon-search" circle @click="getVideoList"></el-button>
            <el-button icon="el-icon-close" circle @click="closeSearch" :disabled='isSearch'></el-button>
        </div>

        <Optionbox v-show='isSearch'/>

    <el-table
    v-show='!isSearch'
        :data="searchVideoList"
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
            <el-button type="primary" icon="el-icon-reading" size="mini" @click="showVideoList(row)"></el-button>
        </template>
        </el-table-column>
    
    </el-table>
        <!-- 分页器 -->
        <Pagnation :limit="limit" :offset="offset" :total="total" v-show="!isSearch" :keyword="keyword"/>

        <!-- 侧边框用来展示详细信息 -->
        <Drawer ref='drawer'/>
    </div>
</template>

<script>
import Optionbox from '../../components/vedioOptionBox'
import Drawer from '../../components/drawer-video/index'
import Pagnation from '../../components/pagnation/pagnation'

export default {
    name:"veidoList",
    data() {
        return {
            searchVideoList: [],
            keyword: '',
            isSearch:true,
            limit:5,
            offset:1,
            total:0
        };
    },
    components: { Optionbox, Drawer, Pagnation },
    methods: {
        //视频搜索函数
        async getVideoList(){
            let data = {}
            data.keyword = this.keyword
            data.limit = this.limit
            data.offset = this.offset
            await this.$store.dispatch('searchVideoList',data)
            this.searchVideoList = await this.$store.state.video.searchVideoList
            this.isSearch = false
            this.rootGetVideodata()
        },

        //向vuex获取搜索到的视频数据
        async rootGetVideodata(){
            this.searchVideoList = await this.$store.state.video.searchVideoList
            this.total = await this.$store.state.video.searchCount
        },

        //关闭搜索
        closeSearch(){
            this.isSearch = true
            this.searchVideoList = []
            this.keyword = ''
        },

        //展示侧边栏 并向drawer传递数据
        async showVideoList(row) {
            await this.$store.dispatch('getMessageList',row._id);
            this.$refs.drawer.drawerData = row;
            console.log(this.$refs.drawer.drawerData,5885888);
            let replyList = await this.$store.state.video.messageList
            this.$refs.drawer.replyList = replyList;
            console.log(replyList,123456);
            this.$refs.drawer.drawer = true;
        },

        //删除某个视频
        async deleteVideo(row){
            await this.$store.dispatch('deleteVideo',row._id)
            this.$message({
                message: '该视频删除成功',
                type:'success'
            })
            this.searchVideo()
        },
        }
}
</script>

<style lang='scss'>
    .search{
        display: flex;
        margin: 20px 15px;
        width: 70%;
        .search-btn {
            margin-left:15px;
        }
    }

</style>