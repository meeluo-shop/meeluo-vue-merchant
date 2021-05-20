<template>
  <div class="roleManagement-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">运费设置</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="18">
        <el-form
          ref="form"
          v-loading="listLoading"
          :label-position="labelPosition"
          :model="form"
          label-width="180px"
        >
          <el-form-item label="运费组合策略： " required prop="combination">
            <el-radio-group v-model="form.combination">
              <div class="combination">
                <el-radio :label="1">叠加</el-radio>
                <span>
                  订单中的商品有多个运费模板时，将每个商品的运费之和订为订单总运费
                </span>
              </div>
              <div class="combination">
                <el-radio :label="2">以最低运费结算</el-radio>
                <span>
                  订单中的商品有多个运费模板时，取订单中运费最少的商品的运费计为订单总运费
                </span>
              </div>
              <div class="combination">
                <el-radio :label="3">以最高运费结算</el-radio>
                <span>
                  订单中的商品有多个运费模板时，取订单中运费最多的商品的运费计为订单总运费
                </span>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getSetting, editSetting } from "@/api/delivery";

  export default {
    name: "DeliverySetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        form: {
          combination: 1,
        },
      };
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
    async created() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        const { data } = await getSetting();
        this.form = Object.assign({}, data);
        this.listLoading = false;
      },
      async onSubmit() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        try {
          await editSetting(this.form);
          this.$baseMessage("保存成功", "success");
          loading.close();
          this.fetchData();
        } catch (err) {
          loading.close();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-form-item--small .el-form-item__label {
    padding-right: 30px;
  }
  .combination {
    font-size: 14px;
    line-height: 38px;
    margin-bottom: 15px;

    span {
      display: block;
      color: #838fa1;
      font-size: 13px;
    }
  }
</style>
