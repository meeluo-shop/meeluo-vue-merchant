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
              v-model="formLabelAlign.not_pay_auto_cancel_day"
              style="margin-right: 12px"
              size="large"
            ></el-input-number>
            <span class="text">天后自动关闭</span>
            <div class="remark">
              订单下单未付款，n天后自动关闭，设置0天不自动关闭
            </div>
          </el-form-item>
          <el-form-item required label="已发货订单">
            <el-input-number
              v-model="formLabelAlign.delivered_auto_sure_day"
              style="margin-right: 12px"
              size="large"
            ></el-input-number>
            <span class="text">天后确定自动收货</span>
            <div class="remark">
              如果在期间未确认收货，系统自动完成收货，设置0天不自动收货
            </div>
          </el-form-item>
          <!-- <el-form-item required label="已完成订单">
            <el-input-number
              v-model="formLabelAlign.finish_allow_service_day"
              style="margin-right: 12px"
              size="large"
            ></el-input-number>
            <span class="text">天内允许申请售后</span>
            <div class="remark">
              订单完成后 ，用户在n天内可以发起售后申请，设置0天不允许申请售后
            </div>
          </el-form-item> -->
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getOrderLogisics, updataOrderLogisics } from "@/api/orderlogistics";
  export default {
    name: "",
    data() {
      return {
        labelPosition: "right",
        formLabelAlign: {
          not_pay_auto_cancel_day: "",
          delivered_auto_sure_day: "",
          finish_allow_service_day: "",
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
        this.formLabelAlign.not_pay_auto_cancel_day =
          data.not_pay_auto_cancel_day;
        this.formLabelAlign.delivered_auto_sure_day =
          data.delivered_auto_sure_day;
        this.formLabelAlign.finish_allow_service_day =
          data.finish_allow_service_day;
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
