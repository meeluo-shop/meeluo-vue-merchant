<template>
  <div class="roleManagement-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">充值设置</span>
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
          <el-form-item label="自动匹配套餐" prop="allow_auto_match_set_meal">
            <el-radio-group v-model="form.allow_auto_match_set_meal">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="允许自定义金额" prop="allow_custom_amount">
            <el-radio-group v-model="form.allow_custom_amount">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="充值说明" prop="recharge">
            <el-input
              v-model="form.recharge"
              type="textarea"
              :autosize="{ minRows: 4 }"
              rows="4"
              placeholder="请输入充值说明"
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
  import { getSetting, editSetting } from "@/api/recharge";

  export default {
    name: "TransactionRechargeSetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        form: {},
        rules: {
          allow_custom_amount: [
            {
              required: true,
              trigger: "blur",
              message: "请选择是否允许自定义金额",
            },
          ],
          allow_auto_match_set_meal: [
            {
              required: true,
              trigger: "blur",
              message: "请选择是否自动匹配套餐",
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
