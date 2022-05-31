<template>
    <el-tabs type="border-card" @tab-click='changeType'>
        <el-tab-pane label="新手"><Xinshou/></el-tab-pane>
        <el-tab-pane label="刹车"><Shache/></el-tab-pane>
        <el-tab-pane label="平花"><Pinghua/></el-tab-pane>
        <el-tab-pane label="速滑"><Suhua/></el-tab-pane>
    </el-tabs>
</template>

<script>
import Xinshou from '../xinshou/xinshou'
import Shache from '../shache/shache'
import Pinghua from '../pinghua/pinghua'
import Suhua from '../suhua/suhua'


export default {
    name:"postOptionBox",
    components:{ Xinshou, Shache, Suhua, Pinghua },
    data() {
        return {
            type:'',
        }
    },
    methods:{
        changeType(tag,event){
            // console.log(tag,event);
            
        }
    }
}
</script>

<style>

</style>