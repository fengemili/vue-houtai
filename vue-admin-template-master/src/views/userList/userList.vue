<template>
   <div class="body">
      <div class="search"> 
         <el-input  v-model="keyword" placeholder="请输入内容"></el-input>
         <el-button icon="el-icon-search" circle @click="searchUser"></el-button>
         <el-button icon="el-icon-close" circle @click="closeSearch" :disabled='isSearch'></el-button>
      </div>

  <!-- 立刻展示 -->
  <el-table
    v-show="isSearch"
    :data="userList"
    border
    style="width: 100%">
    <el-table-column
      prop="createdAt"
      label="注册日期"
      width="180">
    </el-table-column>

   <el-table-column
      prop="image"
      label="头像"
      width="180">
      <template slot-scope="{row,$index}">
          <img :src="row.image" alt="" style="width:100px;height:100px">
      </template>
    </el-table-column>

    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>

    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>

        <el-table-column
      prop="edit"
      label="编辑">
      <template slot-scope="{row,$index}">
        <!-- 禁言状态 -->
        <el-button type="danger" icon="el-icon-turn-off-microphone" size="mini" v-if="row.bio!=1" @click="changeState(row)"></el-button>
        <!-- 非禁言状态 -->
        <el-button icon="el-icon-turn-off-microphone" size="mini" v-if="row.bio == 1" @click="changeState(row)"></el-button>
        <!-- 功能未知 -->
        <!-- <el-button type="primary" icon="el-icon-reading" size="mini" @click=""></el-button> -->
      </template>
    </el-table-column>

  </el-table>

  <!-- 搜索后展示 -->
  <el-table
  v-show="!isSearch"
    :data="searchUserList"
    border
    style="width: 100%">
    <el-table-column
      prop="createdAt"
      label="注册日期"
      width="180">
    </el-table-column>

   <el-table-column
      prop="image"
      label="头像"
      width="180">
      <template slot-scope="{row,$index}">
          <img :src="row.image" alt="" style="width:100px;height:100px">
      </template>
    </el-table-column>

    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>

    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>

        <el-table-column
      prop="edit"
      label="编辑">
      <template slot-scope="{row,$index}">
        <!-- 禁言状态 -->
        <el-button type="danger" icon="el-icon-turn-off-microphone" size="mini" v-if="row.bio!=1" @click="searchChangeState(row)"></el-button>
        <!-- 非禁言状态 -->
        <el-button icon="el-icon-turn-off-microphone" size="mini" v-if="row.bio == 1" @click="searchChangeState(row)"></el-button>
        <!-- 功能未知 -->
        <!-- <el-button type="primary" icon="el-icon-reading" size="mini" @click=""></el-button> -->
      </template>
    </el-table-column>

  </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword:"",
        userList:[],
        isSearch:true,
        searchUserList:[]
      }
    },
    async mounted() {
      //页面挂载时申请数据
      await this.$store.dispatch('getUserList')
      this.userList = await this.$store.state.userList.userList
    },


    methods: {

      //改变搜索到的用户状态
      async searchChangeState(row){
        // 1代表权限正常  2代表禁言
        console.log(row);
        const _id = row._id
        const data = {}
        data._id = row._id
        if(row.bio == 1){
          data.bio = 2
          this.$message({
            message: "用户已禁言",
            type: 'warning'
          })
        }else{
          data.bio = 1
          this.$message({
            message: "用户已解除禁言",
            type: 'success'
          })
        }
        await this.$store.dispatch('changeState',data)
        await this.searchUser()
      },

      //改变用户状态
      async changeState(row){
        // 1代表权限正常  2代表禁言
        console.log(row);
        const _id = row._id
        const data = {}
        data._id = row._id
        if(row.bio == 1){
          data.bio = 2
          this.$message({
            message: "用户已禁言",
            type: 'warning'
          })
        }else{
          data.bio = 1
          this.$message({
            message: "用户已解除禁言",
            type: 'success'
          })
        }
        await this.$store.dispatch('changeState',data)
        await this.getUserList()
      },

      //获取用户列表
      async getUserList(){
        await this.$store.dispatch('getUserList')
        this.userList = await this.$store.state.userList.userList
      },

      //用户搜索函数
      async searchUser(){
        await this.$store.dispatch('searchUserList', this.keyword);
        this.searchUserList = await this.$store.state.userList.searchUserList
        this.isSearch = false
      },

      //关闭搜索
      closeSearch(){
        this.isSearch = true
        this.searchUserList = []
        this.keyword = ''
      }
    },
  }
</script>

<style lang="scss">
   .body {
      width: 98%;
      margin: 0 auto;
      .search{
         display: flex;
         margin: 20px 0;
         width: 70%;
      }
   }
</style>