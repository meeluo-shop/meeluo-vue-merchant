<template>
  <div class="wechat-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">微信支付配置</span>
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
          <el-form-item label="微信支付商户号" prop="mch_id">
            <el-input
              v-model="form.mch_id"
              placeholder="请输入微信支付商户号"
            ></el-input>
            <div class="remark">微信支付商户号，MCHID</div>
          </el-form-item>
          <el-form-item label="微信支付密钥" prop="api_key">
            <el-input
              v-model="form.api_key"
              type="password"
              placeholder="请输入微信支付密钥"
            ></el-input>
            <div class="remark">微信支付密钥，APIKEY</div>
          </el-form-item>
          <el-form-item label="微信支付证书">
            <el-button
              icon="el-icon-document-copy"
              type="primary"
              size="small"
              @click="checkFile"
            >
              {{ fileName ? "重新上传" : "选择文件" }}
            </el-button>
            <span style="color: #838fa1; padding-left: 10px">
              {{ fileName }}
            </span>
            <input
              id="fileinput"
              type="file"
              style="display: none"
              @change="checkFileSure"
            />
            <div class="remark">
              请上传 apiclient_cert.p12 文件，支持微信退款功能
            </div>
          </el-form-item>
          <!-- <el-form-item prop="apiclient_cert" label="apiclient_cert.pem">
            <el-input
              v-model.trim="form.apiclient_cert"
              type="textarea"
              autocomplete="off"
              rows="5"
            ></el-input>
            <div class="remark">
              使用文本编辑器打开apiclient_cert.pem文件，将文件的全部内容复制进来
            </div>
          </el-form-item>
          <el-form-item prop="apiclient_key" label="apiclient_key.pem">
            <el-input
              v-model.trim="form.apiclient_key"
              type="textarea"
              autocomplete="off"
              rows="5"
            ></el-input>
            <div class="remark">
              使用文本编辑器打开apiclient_key.pem文件，将文件的全部内容复制进来
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getPayment,
    setPayment,
    getPaymentCert,
    uploadPaymentCert,
  } from "@/api/wechat";

  export default {
    name: "WechatPaymentSetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        fileName: null,
        form: {},
        rules: {
          mch_id: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信支付商户号",
            },
          ],
          api_key: [
            {
              required: true,
              trigger: "blur",
              message: "请输入微信支付密钥",
            },
          ],
          // apiclient_cert: [
          //   {
          //     required: true,
          //     trigger: "blur",
          //     message: "请输入apiclient_cert.pem证书内容",
          //   },
          // ],
          // apiclient_key: [
          //   {
          //     required: true,
          //     trigger: "blur",
          //     message: "请输入apiclient_key.pem证书内容",
          //   },
          // ],
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
        const [payment, cert] = await Promise.all([
          getPayment(),
          getPaymentCert(),
        ]);
        this.form = Object.assign({}, payment.data);
        this.fileName = cert.data ? cert.data.file_name : null;
        this.listLoading = false;
      },
      checkFile() {
        document.querySelector("#fileinput").click();
      },
      checkFileSure(val) {
        this.fileName = document.querySelector("#fileinput").files[0].name;
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
              await setPayment(this.form);
              const selector = document.querySelector("#fileinput");
              if (selector.files[0]) {
                const formData = new FormData();
                formData.append("file", selector.files[0]);
                await uploadPaymentCert(formData);
              }
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
