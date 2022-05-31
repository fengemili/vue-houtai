<template>
    <el-pagination
    background
    layout="prev, pager, next"
    @current-change="getPostList"
    :page-size="5"
    :total="total">
    </el-pagination>
</template>

<script>
export default {
    name:"pagination",

    props:['limit','offset','tag','total','keyword'],
    
    data() {
        return {
        };
    },

    // watch:{
    //     total(newvalue,oldvalue){
    //         console.log(newvalue,123);
    //         this.total = newvalue
    //     }
    // },

    methods:{
        async getPostList(e){
            console.log(e);
            let data = {}
            data.limit = this.limit
            data.offset = e
            data.tag = this.tag
            data.keyword = this.keyword
            //不能直接调用父函数，因为父函数的offset不会变。
                let postChildFn = eval(this.$parent.getPostdata)
                let postRootFn = eval(this.$parent.rootGetPostdata)
                let videoChildFn = eval(this.$parent.getVideoData)
                let videoRootFn = eval(this.$parent.rootGetVideodata)
            //当子组件的分页请求 --- 帖子
                if(typeof(postChildFn) == 'function'){
                    await this.$store.dispatch('getPostList',data)
                    this.$parent.getPostdata()
                }

            //父组件的分页请求 --- 帖子
                if(typeof(postRootFn ) == 'function'){
                    await this.$store.dispatch('searchPostList',data)
                    this.$parent.rootGetPostdata()
                }

            //当子组件的分页请求 --- 视频
                if(typeof(videoChildFn ) == 'function'){
                    await this.$store.dispatch('getVideoList',data)
                    this.$parent.getVideoData()
                }

            //当父组件组件的分页请求 --- 视频
                if(typeof(videoRootFn ) == 'function'){
                    await this.$store.dispatch('searchVideoList',data)
                    this.$parent.rootGetVideodata()
                }
        }
    }

}
</script>

<style>

</style>