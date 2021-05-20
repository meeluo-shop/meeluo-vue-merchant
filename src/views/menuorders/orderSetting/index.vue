<template>
  <div class="wrap">
    <!-- 订单流程设置 -->
    <el-row>
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">订单流程设置</span>
        </part-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="18">
        <el-form
          class="form"
          :label-position="labelPosition"
          label-width="180px"
          :model="formLabelAlign"
        >
          <el-form-item required label="未支付订单">
            <el-input-number
              v-model="formLabelAlign.not_pay_auto_cancel_min"
              style="margin-right: 12px"
              size="large"
            ></el-input-number>
            <span class="text">分钟后自动关闭</span>
            <div class="remark">
              订单下单未付款，n分钟后自动关闭，设置0不自动关闭
            </div>
          </el-form-item>
          <el-form-item required label="已支付订单">
            <el-input-number
              v-model="formLabelAlign.finished_auto_sure_hour"
              style="margin-right: 12px"
              size="large"
            ></el-input-number>
            <span class="text">小时后自动设置为完成</span>
            <div class="remark">
              已支付或餐后支付的订单提交后，超过n小时未主动处理，则自动完成，设置0不自动完成
            </div>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getOrderLogisics, updataOrderLogisics } from "@/api/menuorders";
  export default {
    name: "",
    data() {
      return {
        labelPosition: "right",
        formLabelAlign: {
          not_pay_auto_cancel_min: "",
          finished_auto_sure_hour: "",
        },
      };
    },
    created() {
      this.fetchDate();
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1200) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
    },
    methods: {
      async onSubmit() {
        await updataOrderLogisics(this.formLabelAlign);
        this.$baseMessage("保存成功", "success");
      },
      async fetchDate() {
        const { data } = await getOrderLogisics();
        this.formLabelAlign.finished_auto_sure_hour =
          data.finished_auto_sure_hour;
        this.formLabelAlign.not_pay_auto_cancel_min =
          data.not_pay_auto_cancel_min;
      },
    },
  };
</script>

<style scoped>
  .wrap {
    padding: 20px;
  }
  .page_header {
    border-bottom: 1px solid #ccc;
  }
  .form {
    padding: 50px 0;
  }
  .remark {
    color: #838fa1;
    font-size: 13px;
    margin-top: 4px;
  }
</style>
