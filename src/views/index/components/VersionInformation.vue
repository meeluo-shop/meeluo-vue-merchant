<template>
  <el-card class="version-information" shadow="hover">
    <div slot="header">
      <span>
        <vab-remix-icon icon-class="information-line"></vab-remix-icon>
        信息
      </span>
      <el-tag class="card-header-tag">部署时间:{{ updateTime }}</el-tag>
    </div>
    <el-scrollbar>
      <table class="table">
        <tr>
          <td>vue</td>
          <td>{{ dependencies["vue"] }}</td>
          <td>@vue/cli</td>
          <td>{{ devDependencies["@vue/cli-service"] }}</td>
        </tr>
        <tr>
          <td>vuex</td>
          <td>{{ dependencies["vuex"] }}</td>
          <td>vue-router</td>
          <td>{{ dependencies["vue-router"] }}</td>
        </tr>
        <tr>
          <td>element-ui</td>
          <td>{{ dependencies["element-ui"] }}</td>
          <td>axios</td>
          <td>{{ dependencies["axios"] }}</td>
        </tr>
        <tr>
          <td>授权渠道</td>
          <td colspan="3">
            <el-popover trigger="hover" width="300">
              <div style="text-align: center">
                <img alt="" src="@/assets/skm.jpg" width="200px" />
                <br />
                付款后加QQ 1204505056 获取下载权限，是否购买pro填是即可
              </div>
              <el-button slot="reference" type="warning">获取授权</el-button>
            </el-popover>
            <el-popover trigger="hover" width="300">
              <div style="text-align: center">
                <img alt="" src="@/assets/skm3.jpg" width="200px" />
                <br />
                付款后加QQ 1204505056 获取加群资格，是否购买VIP填是即可
              </div>
              <el-button slot="reference" type="warning">加入VIP</el-button>
            </el-popover>
            <!--  <a
              href="https://github.com/vue-admin-beautiful/vue-admin-beautiful-pro"
              target="_blank"
            >
              <el-button type="primary">下载</el-button>
            </a> -->
            <a
              href="http://beautiful.panm.cn/vue-admin-beautiful"
              target="_blank"
            >
              <el-button type="primary">开源免费版</el-button>
            </a>
          </td>
        </tr>
      </table>
    </el-scrollbar>
  </el-card>
</template>
<script>
  import { dependencies, devDependencies } from "*/package.json";

  export default {
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        dependencies: dependencies,
        devDependencies: devDependencies,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .version-information {
    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        padding: 9px 15px;
        overflow: hidden;
        font-size: 14px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
</style>
