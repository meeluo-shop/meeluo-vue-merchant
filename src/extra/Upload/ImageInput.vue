<template>
  <div class="image-input-container">
    <div
      v-if="value && miniStyle"
      class="image-box"
      :style="`
          width: ${width};
          height: ${height};`"
    >
      <el-image
        :style="`
          width: 100%;
          height: 100%;
          margin-right: 10px;
          vertical-align: bottom;
          border-radius: 3px;
          border: 1px solid #dcdfe5;
        `"
        class="upload-box"
        :src="value.url"
        :preview-src-list="[value.url]"
      ></el-image>
      <div v-if="!disabled" class="close-btn" @click="clearImage">
        <i class="el-icon-error"></i>
      </div>
    </div>
    <div v-else-if="value">
      <el-image
        :style="`
          width: ${width};
          height: ${height};
          margin-right: 10px;
          vertical-align: bottom;
          border-radius: 3px;
          border: 1px solid #dcdfe5;
        `"
        class="upload-box"
        :src="value.url"
        :preview-src-list="[value.url]"
      ></el-image>
      <el-button
        v-if="!disabled"
        type="primary"
        icon="el-icon-edit"
        circle
        @click="showImageManager"
      ></el-button>
      <el-button
        v-if="!disabled && !hideDelete"
        type="danger"
        icon="el-icon-delete"
        circle
        @click="clearImage"
      ></el-button>
    </div>
    <div
      v-else
      class="upload-box"
      :style="`line-height: ${height}; width: ${width}; height: ${height}`"
      @click="showImageManager"
    >
      <vab-remix-icon icon-class="add-fill"></vab-remix-icon>
    </div>
    <vab-upload ref="imageManager" @on-select="selectImage"></vab-upload>
  </div>
</template>

<script>
  import VabUpload from "@/extra/Upload";
  export default {
    name: "UploadImageInput",
    components: { VabUpload },
    props: {
      width: {
        type: String,
        default: "100px",
      },
      height: {
        type: String,
        default: "100px",
      },
      value: {
        type: Object,
        default: null,
      },
      miniStyle: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      hideDelete: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    methods: {
      selectImage(img) {
        this.$emit("input", img);
        this.$emit("select", img);
      },
      showImageManager() {
        this.$refs["imageManager"].showImgManager();
      },
      clearImage() {
        this.$emit("input", null);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .upload-box {
    position: relative;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    &:hover {
      border-color: #409eff;
    }
  }
  .image-box {
    position: relative;
    margin: 10px 0;

    .upload-box {
      margin-right: 0px;
    }

    &:hover {
      .close-btn {
        display: block;
      }
    }
    .close-btn {
      position: absolute;
      cursor: pointer;
      top: -6px;
      right: -6px;
      z-index: 10;
      display: none;
      width: 14px;
      height: 14px;
      line-height: 14px;
      color: #666;
    }
  }
</style>
