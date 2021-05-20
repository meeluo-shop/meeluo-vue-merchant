<template>
  <div class="page-variable-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">页面变量</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <ul>
        <li class="link-item">
          <div class="row page-name">
            用户昵称：
            <span class="x-color-black">${nickname}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            用户头像：
            <span class="x-color-black">${avatar}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            用户余额：
            <span class="x-color-black">${balance}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            用户积分：
            <span class="x-color-black">${points}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            用户会员等级：
            <span class="x-color-black">${gradeName}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户门店名称：
            <span class="x-color-black">${storeName}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户门店描述：
            <span class="x-color-black">${storeDesc}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户联系电话：
            <span class="x-color-black">${merchantPhone}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户详细地址：
            <span class="x-color-black">${address}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户所属省份：
            <span class="x-color-black">${provinceName}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户所属城市：
            <span class="x-color-black">${cityName}</span>
          </div>
        </li>
        <li class="link-item">
          <div class="row page-name">
            商户所属县区：
            <span class="x-color-black">${countyName}</span>
          </div>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "PagevariableList",
    data() {
      return {};
    },
    created() {},
  };
</script>
<style lang="scss" scoped>
  .page-variable-container {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .link-item {
      border-bottom: 1px dashed #eee;
      font-size: 13px;
      color: #333;
      line-height: 25px;
      padding: 10px 15px;

      .page-name {
        color: #1890ff;
        font-size: 14px;
      }

      .x-color-green {
        color: #13ce66;
      }

      .x-color-gray {
        color: #828282;
      }

      .x-color-red {
        color: #f00;
      }

      .x-color-black {
        color: #333;
      }
    }
  }
</style>
