<template>
  <div class="roleManagement-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">积分设置</span>
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
          :rules="rules"
          label-width="180px"
        >
          <el-form-item label="积分赠送额度" prop="gift_ratio">
            <el-tooltip
              class="item"
              content="如：1元可转换10积分，0为不赠送"
              placement="top"
            >
              <el-input
                v-model.trim="form.gift_ratio"
                style="width: 280px"
                type="number"
                placeholder="可转换的积分数量"
                autocomplete="off"
              >
                <template slot="prepend">消费1元可转换</template>
                <template slot="append">积分</template>
              </el-input>
            </el-tooltip>
            <div class="remark">如：1元可转换10积分，0为不赠送</div>
          </el-form-item>
          <el-form-item label="积分抵扣额度" prop="discount_ratio">
            <el-tooltip
              class="item"
              content="如：1积分可抵扣0.01元，0为不抵扣"
              placement="top"
            >
              <el-input
                v-model.trim="form.discount_ratio"
                type="number"
                style="width: 280px"
                placeholder="可抵扣的积分数量"
                autocomplete="off"
              >
                <template slot="prepend">1积分可抵扣</template>
                <template slot="append">元</template>
              </el-input>
            </el-tooltip>
            <div class="remark">如：1积分可抵扣0.01元，0为不抵扣</div>
          </el-form-item>
          <el-form-item label="积分说明" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :autosize="{ minRows: 4 }"
              rows="4"
              placeholder="请输入积分说明"
            ></el-input>
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
  import { getSetting, editSetting } from "@/api/points";

  export default {
    name: "TransactionPointsSetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        form: {},
        rules: {
          gift_ratio: [
            {
              required: true,
              trigger: "blur",
              message: "请输入积分赠送额度",
            },
          ],
          discount_ratio: [
            {
              required: true,
              trigger: "blur",
              message: "请输入积分抵扣额度",
            },
          ],
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
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
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
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .remark {
    color: #838fa1;
    font-size: 13px;
    margin-top: 10px;
  }
</style>
