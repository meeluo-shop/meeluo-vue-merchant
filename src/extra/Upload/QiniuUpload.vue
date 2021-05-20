<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="720px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="upload">
      <el-alert
        :closable="false"
        :title="`支持jpg、jpeg、png格式，单次可最多选择${limit}张图片，每张不可大于${size}M，如果大于${size}M会自动为您过滤`"
        type="info"
      ></el-alert>
      <br />
      <el-upload
        ref="upload"
        class="upload-content"
        :name="name"
        :action="action"
        :on-change="handleChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :multiple="true"
        :auto-upload="false"
        :accept="typeList"
        :limit="limit"
        list-type="picture-card"
        :close-on-click-modal="false"
      >
        <i slot="trigger" class="el-icon-plus"></i>
        <el-dialog
          title="查看大图"
          append-to-body
          :visible.sync="dialogVisible"
        >
          <div style="padding-bottom: 20px !important">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </div>
        </el-dialog>
      </el-upload>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
      style="position: relative; padding-right: 15px; text-align: right"
    >
      <div
        v-if="show"
        style="position: absolute; top: 10px; left: 15px; color: #409eff"
      >
        正在上传中... 当前上传成功数:{{ imgSuccessNum }}张 当前上传失败数:{{
          imgErrorNum
        }}张
      </div>
      <el-button type="primary" @click="handleClose">关闭</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        :loading="loading"
        @click="submitUpload"
      >
        开始上传
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import * as qiniu from "qiniu-js";
  import { getToken, upload } from "@/api/resource";
  import { sourceBaseUrl } from "@/config/settings";

  export default {
    name: "QiniuUpload",
    props: {
      url: {
        type: String,
        default: "/upload",
        required: true,
      },
      name: {
        type: String,
        default: "file",
        required: true,
      },
      limit: {
        type: Number,
        default: 50,
        required: true,
      },
      size: {
        type: Number,
        default: 1,
        required: true,
      },
      /**
       * @description 是否压缩
       * */
      isCompress: {
        type: Boolean,
        default: false,
      },
      /**
       * @description 前提条件是压缩的情况下，使用压缩质量
       * */
      quality: {
        type: Number,
        default: 1,
      },
      group: {
        type: Number,
        default: null,
      },
      userId: {
        type: Number,
        default: function () {
          const user = this.$store.getters["passport/user"];
          return user.id;
        },
      },
      merchantId: {
        type: Number,
        default: function () {
          const merchant = this.$store.getters["passport/merchant"];
          return parseInt(merchant.id);
        },
      },
    },
    data() {
      return {
        show: false,
        loading: false,
        dialogVisible: false,
        dialogImageUrl: "",
        action: "",
        fileList: [],
        picture: "picture",
        imgNum: 0,
        imgSuccessNum: 0,
        imgErrorNum: 0,
        allImgNum: 0,
        typeList: "image/png, image/jpeg, image/gif, .svg",
        title: "",
        dialogFormVisible: false,
        subscription: null,
        token: "",
        domain: sourceBaseUrl,
        imgList: [],
        storage: 10, // 10 七牛云
        type: 10, // 10 图片
      };
    },
    computed: {
      percentage() {
        if (this.allImgNum === 0) return 0;
        return this.$baseLodash.round(this.imgNum / this.allImgNum, 2) * 100;
      },
    },
    methods: {
      async submitUpload() {
        this.token = await this.getToken();
        this.fileList.forEach(async (item) => {
          await this.uploadImg(item.raw);
        });
      },
      handleChange(file, fileList) {
        if (file.size > 1048576 * this.size) {
          fileList.map((item, index) => {
            if (item === file) {
              fileList.splice(index, 1);
            }
          });
        }
        this.fileList = fileList;
        this.allImgNum = fileList.length;
      },
      handleProgress(res, file, fileList) {
        console.log("progress:", res, file, fileList);
        this.loading = true;
        this.show = true;
      },
      async handleSuccess(res, file, fileList) {
        this.loading = false;
        console.log("success:", res, file, fileList);
        this.imgNum = this.imgNum + 1;
        this.imgSuccessNum = this.imgSuccessNum + 1;
        const getFileName = (key) => {
          key = key || "";
          const arr = key.split("/");
          return arr.length > 1 ? arr[1] : arr[0];
        };
        if (!this.group || parseInt(this.group) === 0) {
          this.imgList.push({
            storage: this.storage,
            url: `${this.domain}${res.key}`,
            name: getFileName(res.key),
            uuid: res.uuid,
            size: res.fsize,
            type: this.type,
            extension: res.extension,
          });
        } else {
          this.imgList.push({
            storage: this.storage,
            url: `${this.domain}${res.key}`,
            name: getFileName(res.key),
            uuid: res.uuid,
            size: res.fsize,
            type: this.type,
            extension: res.extension,
            group_id: this.group,
          });
        }
        if (fileList.length === this.imgNum) {
          try {
            const { code, data, msg, error } = await upload({
              files: this.imgList,
              group_id: this.group,
            });
            console.log(code, data, msg);
            if (code === 0) {
              this.$baseMessage(
                `上传完成! 共上传${fileList.length}张图片`,
                "success"
              );
              this.handleClose();
            } else {
              this.$baseMessage(msg || error, "error");
            }
            this.$emit("fetchData");
            this.imgList = []; // 清空
            this.show = false;
          } catch (err) {
            this.$baseMessage(err, "error");
            this.show = false;
          }
        }
      },
      handleError(err, file, fileList) {
        console.log("error:", err, file, fileList);
        this.imgNum = this.imgNum + 1;
        this.imgErrorNum = this.imgErrorNum + 1;
        let errMsg = `文件[${file.name}]上传失败`;
        if (err.code === 614) {
          errMsg = "当前文件名已存在，请修改文件名后再上传";
        }
        this.$baseMessage(errMsg, "error");
        this.loading = false;
        this.show = false;
      },
      handleRemove(file, fileList) {
        this.imgNum = this.imgNum - 1;
        this.allNum = this.allNum - 1;
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$baseMessage(
          `当前限制选择 ${this.limit} 个文件，本次选择了
             ${files.length}
             个文件`,
          "error"
        );
      },
      handleShow(data) {
        this.title = "批量上传";
        this.dialogFormVisible = true;
      },
      handleClose() {
        this.fileList = [];
        this.picture = "picture";
        this.allImgNum = 0;
        this.imgNum = 0;
        this.imgSuccessNum = 0;
        this.imgErrorNum = 0;
        this.dialogFormVisible = false;
      },
      async getToken() {
        const { data } = await getToken();
        return data;
      },
      async uploadImg(file) {
        const token = this.token;
        const putExtra = {
          fname: file.name,
          mimeType: file.type,
          customVars: {
            "x:group": this.group,
            "x:merchantId": this.merchantId,
            "x:userId": this.userId,
            "x:extension": /\.[^\.]+$/.exec(file.name),
          },
        };
        const config = {
          useCdnDomain: false,
        };
        if (this.isCompress) {
          const options = {
            quality: 0.92,
            noCompressIfLarger: true,
          };
          qiniu.compressImage(file, options).then((data) => {
            const observable = qiniu.upload(
              data.dist,
              this.merchantId + "/" + putExtra.fname,
              token,
              putExtra,
              config
            );
            this.subscription = observable.subscribe(
              this.observer(file, this.fileList)
            ); // 上传开始
          });
        } else {
          const observable = qiniu.upload(
            file,
            this.merchantId + "/" + putExtra.fname,
            token,
            putExtra,
            config
          );
          this.subscription = observable.subscribe(
            this.observer(file, this.fileList)
          );
        }
      },
      observer(file, fileList) {
        let that = this;
        return {
          next(res) {
            that.handleProgress(res, file, fileList);
          },
          error(err) {
            that.handleError(err, file, fileList);
          },
          complete(res) {
            that.handleSuccess(res, file, fileList);
          },
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .upload {
    height: 340px;
    overflow: scroll;

    .upload-content {
      .el-upload__tip {
        display: block;
        height: 30px;
        line-height: 30px;
      }

      ::v-deep {
        .el-upload--picture-card {
          width: 128px;
          height: 128px;
          margin: 3px 8px 8px 8px;
          border: 2px dashed #c0ccda;
        }

        .el-upload-list--picture {
          margin-bottom: 20px;
        }

        .el-upload-list--picture-card {
          .el-upload-list__item {
            width: 128px;
            height: 128px;
            margin: 3px 8px 8px 8px;
          }
        }
      }
    }
  }
</style>
