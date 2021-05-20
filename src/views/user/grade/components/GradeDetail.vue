<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="480px"
    @close="close"
  >
    <el-card class="box-card" shadow="never" body-style="padding: 0 20px;">
      <div class="text item">
        <span class="item-title">等级名称：</span>
        {{ grade.name }}
      </div>
      <div class="text item">
        <span class="item-title">会员级别：</span>
        {{ grade.weight }}
      </div>
      <div class="text item">
        <span class="item-title">升级条件：</span>
        充值金额满 {{ grade.upgrade }} 元
      </div>
      <div class="text item">
        <span class="item-title">等级权益：</span>
        折扣率 {{ grade.equity / 10 }} 折
      </div>
      <div class="text item">
        <span class="item-title">是否默认：</span>
        <el-radio-group v-model="grade.is_default">
          <el-radio disabled :label="0">否</el-radio>
          <el-radio disabled :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="text item">
        <span class="item-title">创建时间：</span>
        {{ formatTime(grade.created_at) }}
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getDetail } from "@/api/grade";
  import dayjs from "dayjs";

  export default {
    name: "GradeManagementDetail",
    data() {
      return {
        grade: {},
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
        this.grade = data;
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
