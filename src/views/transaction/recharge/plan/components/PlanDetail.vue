<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="420px"
    @close="close"
  >
    <el-card class="box-card" shadow="never" body-style="padding: 0 20px;">
      <div class="text item">
        <span class="item-title">套餐名称：</span>
        {{ detail.name }}
      </div>
      <div class="text item">
        <span class="item-title">套餐金额：</span>
        {{ detail.recharge_amount }}
      </div>
      <div class="text item">
        <span class="item-title">赠送金额：</span>
        {{ detail.donation_amount }}
      </div>
      <div class="text item">
        <span class="item-title">创建时间：</span>
        {{ formatTime(detail.created_at) }}
      </div>
      <div class="text item">
        <span class="item-title">更新时间：</span>
        {{ formatTime(detail.updated_at) }}
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getDetail } from "@/api/recharge";
  import dayjs from "dayjs";

  export default {
    name: "PlanDetail",
    data() {
      return {
        detail: {},
        title: "",
        dialogFormVisible: false,
      };
    },
    methods: {
      async showDetail(row) {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const { data } = await getDetail(row.id);
        loading.close();
        this.detail = data;
        this.title = row.name;
        this.dialogFormVisible = true;
      },
      close() {
        this.dialogFormVisible = false;
      },
      formatTime(time) {
        return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-card {
    border: none;
  }
  .text {
    line-height: 42px;
  }
  .item-title {
    display: inline-block;
    margin-right: 16px;
    text-align: right;
    color: #99a9bf;
  }
  .demo-image__preview {
    display: inline-block;
    vertical-align: top;
  }
</style>
