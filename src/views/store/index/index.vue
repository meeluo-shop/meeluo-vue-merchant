<template>
  <div class="store-index-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">门店设置</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="18">
        <el-form
          ref="form"
          v-loading="listLoading"
          :rules="rules"
          :label-position="labelPosition"
          :model="form"
          label-width="180px"
        >
          <el-form-item label="店铺名称" prop="name">
            <el-input
              v-model="form.store_name"
              maxlength="100"
              style="width: 360px; max-width: 100%"
              @input="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺描述" prop="remark">
            <el-input
              v-model="form.store_desc"
              type="textarea"
              autocomplete="off"
              rows="3"
              @input="inputChange"
            ></el-input>
          </el-form-item>
          <el-form-item label="店铺图标" prop="logo">
            <vab-image-input v-model="storeLogo"></vab-image-input>
          </el-form-item>
          <el-form-item label="门头照片" prop="door_photo">
            <vab-image-input v-model="doorPhoto"></vab-image-input>
          </el-form-item>
          <el-form-item label="门店二维码">
            <el-image
              style="width: 200px"
              :src="qrcodeUrl"
              :preview-src-list="[qrcodeUrl]"
            />
            <router-link
              v-if="allow_private_wechat"
              to="/officialAccount/reply/scancode"
            >
              <el-button
                style="margin-left: 20px; position: relative; top: -22px"
                type="primary"
              >
                设置扫码回复
              </el-button>
            </router-link>
            <div class="remark">
              应用推广二维码，鼠标右键，选择“图片另存为”保存到本地
            </div>
          </el-form-item>
          <el-form-item label="联系人" prop="liaison">
            <el-input
              v-model="form.liaison"
              maxlength="50"
              style="width: 360px; max-width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input
              v-model="form.phone"
              maxlength="25"
              style="width: 360px; max-width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择城市">
            <el-cascader
              v-model="regionData"
              :options="regions"
              filterable
              style="width: 360px; max-width: 100%"
              @change="regionSelect"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input
              v-model="form.address"
              maxlength="200"
              style="width: 360px; max-width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item label="经纬度">
            <el-tooltip effect="dark" content="在地图中获取" placement="top">
              <el-input
                v-model="longitudeAndLatitude"
                disabled
                style="width: 360px; max-width: 100%"
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="获取经纬度">
            <iframe
              id="geoPage"
              width="100%"
              height="410"
              border="0"
              :src="src"
            ></iframe>
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
  import { uuid } from "@/utils/index";
  import { getDetail, doEdit } from "@/api/store";
  import { getRegion } from "@/api/region";
  import { isPhone } from "@/utils/validate";
  import { getQRCode } from "@/api/jsonp";
  import { getMerchantQRCode } from "@/api/wechat";

  export default {
    name: "StoreIndex",
    components: { VabImageInput },
    data() {
      const checkPhone = (rule, value, callback) => {
        callback(isPhone(value) ? undefined : new Error("请输入正确的手机号"));
      };
      return {
        allow_private_wechat: 1,
        qrcodeVal: null,
        qrcodeUrl: null,
        labelPosition: "right",
        listLoading: true,
        storeLogo: null,
        doorPhoto: null,
        form: {
          logo: "",
          door_photo: "",
          liaison: "",
          phone: "",
          address: "",
          longitude: "",
          latitude: "",
          name: "",
          remark: "",
          county_code: "",
          province_code: "",
          city_code: "",
        },
        src: "",
        regions: [],
        regionData: [],
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入店铺名称" },
          ],
          // logo: [
          //   { required: true, trigger: "blur", message: "请上传店铺图标" },
          // ],
          liaison: [
            { required: true, trigger: "blur", message: "请输入联系人" },
          ],
          phone: [
            {
              required: true,
              // validator: checkPhone,
              trigger: "blur",
              message: "请输入联系电话",
            },
          ],
          address: [
            { required: true, trigger: "blur", message: "请输入详细地址" },
          ],
        },
      };
    },
    computed: {
      longitudeAndLatitude() {
        return `${this.form.latitude}, ${this.form.longitude}`;
      },
    },
    watch: {
      storeLogo(thumbnail) {
        if (thumbnail) {
          this.form.logo = thumbnail.url;
        } else {
          this.form.logo = null;
        }
      },
      doorPhoto(thumbnail) {
        if (thumbnail) {
          this.form.door_photo = thumbnail.url;
        } else {
          this.form.door_photo = null;
        }
      },
    },
    async mounted() {
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
      if (!window["StoreIndexMapCallback"]) {
        const mapCallbackName = uuid();
        that.src = `/map.html?callback=${mapCallbackName}`;
        window[mapCallbackName] = function (latitude, longitude) {
          that.form.longitude = longitude;
          that.form.latitude = latitude;
        };
        window["StoreIndexMapCallback"] = true;
      }
      const merchant = this.$store.getters["passport/merchant"];
      this.allow_private_wechat = merchant.allow_private_wechat;
      try {
        const qrcodeResp = await getMerchantQRCode();
        if (qrcodeResp.code !== 0) {
          this.$message.error(
            qrcodeResp.msg || qrcodeResp.error || "二维码获取失败"
          );
          return;
        }
        if (qrcodeResp.data) {
          this.qrcodeVal = qrcodeResp.data.url;
        } else {
          this.$message.error("二维码获取失败，请先配置微信公众号");
          return;
        }
        this.qrcodeUrl = await getQRCode({
          data: this.qrcodeVal,
          logo: merchant.logo || null,
        });
        // loading.close();
      } catch (err) {
        console.error(err);
        // loading.close();
      }
    },
    async created() {
      const [regions] = await Promise.all([
        this.initRegion(),
        this.fetchData(),
      ]);
      this.regions = regions;
    },
    methods: {
      inputChange(e) {
        this.$forceUpdate();
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getDetail();
        this.$store.commit("passport/setMerchant", data);
        this.storeLogo = data.logo ? { url: data.logo } : null;
        this.doorPhoto = data.door_photo ? { url: data.door_photo } : null;
        this.form.liaison = data.liaison;
        this.form.logo = data.logo;
        this.form.door_photo = data.door_photo;
        this.form.phone = data.phone;
        this.form.address = data.address;
        this.form.longitude = data.longitude;
        this.form.latitude = data.latitude;
        this.form.name = data.name;
        this.form.remark = data.remark;
        this.form.store_name = data.store_name || data.name;
        this.form.store_desc = data.store_desc || data.remark;
        this.form.province_code = String(data.province_code);
        this.form.city_code = String(data.city_code);
        this.form.county_code = String(data.county_code);
        this.listLoading = false;
        this.regionData = [
          this.form.province_code,
          this.form.city_code,
          this.form.county_code,
        ];
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
              this.form = Object.assign(this.form, {
                longitude: `${this.form.longitude}`,
                latitude: `${this.form.latitude}`,
              });
              const { data } = await doEdit(this.form);
              this.$baseMessage("门店信息更新成功！", "success");
              await this.fetchData();
              loading.close();
            } catch (err) {
              loading.close();
            }
          }
        });
      },
      async initRegion() {
        this.listLoading = true;
        const data = await getRegion();
        this.listLoading = false;
        return data;
      },
      regionSelect() {
        this.form.province_code = this.regionData[0];
        this.form.city_code = this.regionData[1];
        this.form.county_code = this.regionData[2];
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
