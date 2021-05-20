<template>
  <div class="wrap">
    <!-- 支付方式设置 -->
    <el-row>
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">支付方式设置</span>
        </part-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="18">
        <el-form
          class="form"
          :label-position="labelPosition"
          label-width="180px"
        >
          <el-form-item required label="微信支付：">
            <el-radio-group v-model="enableWechatPay" @change="onSubmit">
              <el-radio-button :label="false">关闭</el-radio-button>
              <el-radio-button :label="true">开启</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="余额支付：">
            <el-radio-group v-model="enableBalancePay" @change="onSubmit">
              <el-radio-button :label="false">关闭</el-radio-button>
              <el-radio-button :label="true">开启</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="线下付款：">
            <el-radio-group v-model="enableOfflinePay" @change="onSubmit">
              <el-radio-button :label="false">关闭</el-radio-button>
              <el-radio-button :label="true">开启</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getOrderPayTypeSetting,
    setOrderPayTypeSetting,
  } from "@/api/menuorders";
  export default {
    name: "",
    data() {
      return {
        labelPosition: "right",
        enableWechatPay: true,
        enableBalancePay: true,
        enableOfflinePay: true,
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
      async onSubmit(a, b) {
        const payTypeList = [];
        if (this.enableWechatPay) {
          payTypeList.push(10);
        }
        if (this.enableBalancePay) {
          payTypeList.push(20);
        }
        if (this.enableOfflinePay) {
          payTypeList.push(99);
        }
        // if (!payTypeList.length) {
        //   this.$baseMessage("请至少选择一种支付方式", "error");
        // }
        await setOrderPayTypeSetting({
          pay_type_list: payTypeList,
        });
        this.$baseMessage("保存成功", "success");
      },
      async fetchDate() {
        const { data } = await getOrderPayTypeSetting();
        const payTypeList =
          data && data.pay_type_list ? data.pay_type_list : [];
        this.enableWechatPay = payTypeList.includes(10);
        this.enableBalancePay = payTypeList.includes(20);
        this.enableOfflinePay = payTypeList.includes(99);
      },
    },
  };
</script>

<style scoped>
  .wrap {
    padding: 20px;
  }
  .text {
    padding-left: 20px;
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
