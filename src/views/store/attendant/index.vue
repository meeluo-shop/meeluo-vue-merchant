<template>
  <div class="roleManagement-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">客服信息设置</span>
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
          <el-form-item label="客服名称" prop="name">
            <el-input
              v-model.trim="form.name"
              style="width: 360px; max-width: 100%"
              placeholder="请输入客服名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="客服微信号" prop="wechat_id">
            <el-input
              v-model.trim="form.wechat_id"
              style="width: 360px; max-width: 100%"
              placeholder="请输入客服微信号"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信二维码" prop="wechat_qrcode">
            <vab-image-input v-model="image"></vab-image-input>
            <div slot="tip" class="remark el-upload__tip">
              请上传客服微信号个人二维码
            </div>
          </el-form-item>
          <el-form-item label="客服电话" prop="phone">
            <el-input
              v-model.trim="form.phone"
              style="width: 360px; max-width: 100%"
              placeholder="请输入客服电话"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注说明" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :autosize="{ minRows: 4 }"
              rows="4"
              placeholder="请输入备注说明"
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
  import VabImageInput from "@/extra/Upload/ImageInput";
  import { getAttendant, setAttendant } from "@/api/attendant";

  export default {
    name: "AttendantSetting",
    components: { VabImageInput },
    data() {
      return {
        image: null,
        labelPosition: "right",
        listLoading: true,
        form: {},
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入客服名称" },
          ],
          wechat_id: [
            { required: true, trigger: "blur", message: "请输入客服微信号" },
          ],
          wechat_qrcode: [
            { required: true, trigger: "blur", message: "请上传微信号二维码" },
          ],
        },
      };
    },
    watch: {
      image(image) {
        if (image) {
          this.form.wechat_qrcode = image.url;
        } else {
          this.form.wechat_qrcode = "";
        }
      },
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
        const { data } = await getAttendant();
        this.form = Object.assign({}, data);
        if (data.wechat_qrcode) {
          this.image = {
            url: data.wechat_qrcode,
          };
        }
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
              await setAttendant(this.form);
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
