<template style="overflow:auto;">
  <el-row :gutter="20" style="margin-top: 110px;" v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
    <el-col :span="18">
      <div style="display: flex;flex-direction: column;align-items: center;">
        <el-card style="width: 800px; margin: 5px;" :body-style="{ padding: '10px' }" v-for="(data,index) in dataList" :key="index">
          <div style="margin: 8px;display: flex;flex-direction: row;align-items: center;">
            <el-avatar shape="square" style="width: 24px;height: 24px;margin-right: 15px;">A</el-avatar>{{data.nickname}}
          </div>
          <div style="margin: 8px;">
            <nuxt-link :to="'/qa/'+data.id" class="ContentItem-title">
              {{data.title}}
            </nuxt-link>
          </div>
          <div style="margin: 8px;">
            <span class="problem-item-content" v-html="data.content"></span>
          </div>
          <div style="margin: 8px;">
            <el-button type="primary" v-if="!data.canThumbup" @click="thumbup(data.id,index)" plain style="padding: 9px;margin-right: 35px;"><i class="el-icon-caret-top"></i>赞同 {{data.thumbup}}</el-button>
            <el-button type="primary" v-if="data.canThumbup" disabled style="padding: 9px;margin-right: 35px;"><i class="el-icon-caret-top"></i>已赞同 {{data.thumbup}}</el-button>
            <i class="el-icon-chat-dot-round"></i> {{data.reply}}条回答
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="display: flex;flex-direction: column;align-items: flex-start;">
        <el-card style="width: 300px;">
          <div style="display: flex;flex-direction: row;justify-content: space-around;">
            <nuxt-link to="/qa/qa-submit"><el-button type="text"><i class="el-icon-chat-line-round" style="margin-bottom: 15px;"></i><div>提问题</div></el-button></nuxt-link>
            <nuxt-link to="/treehole/treehole-submit"><el-button type="text"><i class="el-icon-umbrella" style="margin-bottom: 15px;"></i><div>写树洞</div></el-button></nuxt-link>
            <el-button type="text" @click="gatheringHandle"><i class="el-icon-basketball" style="margin-bottom: 15px;"></i><div>办活动</div></el-button>
          </div>
        </el-card>
      </div>
      <gathering-add v-if="gatheringVisible" ref="gathering"></gathering-add>
    </el-col>
  </el-row>
</template>
<script>
  import qaApi from '@/api/qa'
  import {getUser} from '@/utils/auth'
  import GatheringAdd from '../gathering/gathering-add'
  export default {
      data(){
          return{
              gatheringVisible: false,
              pageNo: 1,
              busy: false,
              user:{}
          }
      },
      asyncData(){
          return qaApi.page(1,3).then(res => {
              return { dataList: res.data.data.rows }
          })
      },
      created(){
          this.user = getUser()
          qaApi.page(1,3).then(res =>{
              this.dataList = res.data.data.rows
          })
      },
      methods:{
          load(){
              this.busy = true
              this.pageNo++
              qaApi.page(this.pageNo,2).then(res => {
                  this.dataList = this.dataList.concat(res.data.data.rows)
                  if (res.data.data.rows.length > 0){
                      this.busy = false
                  }
              })
          },
          thumbup(id,index){
              if (this.user.token === undefined){
                  this.$message({
                      message:'请登录！',
                      type: "error",
                      offset: 100,
                      duration: 1000,
                      onClose: function () {
                          location.href='/login'
                      }
                  })
              }else {
                  qaApi.thumbup(id).then(res => {
                      if (res.data.flag){
                          this.dataList[index].thumbup ++
                          this.dataList[index].canThumbup = true
                      }
                      this.$message({
                          message:res.data.message,
                          offset:100,
                          type:res.data.flag?'success':'error'
                      })
                  })
              }
          },
          gatheringHandle () {
              this.gatheringVisible = true
              this.$nextTick(() => {
                  this.$refs.gathering.init()
              })
          }
      },
      components: {
          GatheringAdd
      }
  }
</script>
<style>
  .ContentItem-title:hover {
    color: #175199;
  }
  .ContentItem-title{
    color: inherit;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    font-synthesis: style;
    line-height: 1.6;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .problem-item-content{
    word-break: break-word;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
</style>
