<template>
  <div class="wechat-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">微信公众号配置</span>
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
          <el-form-item label="账号ID" prop="wechat_id">
            <el-input
              v-model="form.wechat_id"
              placeholder="请输入微信公众号账号ID"
            ></el-input>
            <div class="remark">微信公众号账号ID</div>
          </el-form-item>
          <el-form-item label="APP_ID" prop="app_id">
            <el-input
              v-model="form.app_id"
              placeholder="请输入微信公众号appid"
            ></el-input>
            <div class="remark">微信公众号应用ID</div>
          </el-form-item>
          <el-form-item label="SECRET" prop="secret">
            <el-input
              v-model="form.secret"
              type="password"
              placeholder="请输入微信公众号secret"
            ></el-input>
            <div class="remark">微信公众号开发密钥</div>
          </el-form-item>
          <el-form-item label="Token" prop="token">
            <el-input
              v-model="form.token"
              type="text"
              placeholder="请输入微信公众号服务器token"
            ></el-input>
            <div class="remark">
              微信公众号服务器token，登陆微信公众平台，选择开发->基本配置->服务器配置进行配置，url设置为：http://game.meeluo.com/api/common/wechat/callback/notify/20/{{
                merchant.id
              }}
            </div>
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
  import { getOfficialAccount, setOfficialAccount } from "@/api/wechat";

  export default {
    name: "WechatOfficialAccountSetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        form: {},
        merchant: this.$store.getters["passport/merchant"],
        rules: {
          wechat_id: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信公众号账号id",
            },
          ],
          app_id: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信公众号appid",
            },
          ],
          secret: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信公众号secret",
            },
          ],
          token: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信公众号token",
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
        const { data } = await getOfficialAccount();
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
              await setOfficialAccount(this.form);
              this.$baseMessage("保存成功", "success");
              loading.close();
              this.fetchData();
            } catch (err) {
              loading.close();
            }
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
  }
</style>
