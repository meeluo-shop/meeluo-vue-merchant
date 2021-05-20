<template>
  <div class="image-input-list-container">
    <div class="image-list">
      <ul>
        <li
          v-if="!disabled"
          class="input-box"
          :style="`width: ${width}; height: ${width}`"
        >
          <div class="ope-box" @click="handleSelectImage">
            <i class="el-icon-plus"></i>
          </div>
        </li>
        <li
          v-for="(item, index) in value"
          :key="index"
          :style="`width: ${width}; height: ${width}`"
          class="item-box"
        >
          <el-image
            :style="`
          width: 100%;
          height: 100%;
          margin-right: 10px;
          vertical-align: bottom;
          border-radius: 3px;
        `"
            class="upload-box"
            :src="item.url"
            :preview-src-list="[item.url]"
          ></el-image>
          <div v-if="!disabled" class="close-btn" @click="deleteImage(item)">
            <i class="el-icon-error"></i>
          </div>
        </li>
      </ul>
    </div>
    <vab-upload
      ref="imageManager"
      :max-length="maxLength"
      :images="value"
      @on-select="selectImage"
    ></vab-upload>
  </div>
</template>

<script>
  import VabUpload from "@/extra/Upload";

  export default {
    name: "ImageListInput",
    components: { VabUpload },
    props: {
      maxLength: {
        type: Number,
        default: 50,
      },
      value: {
        type: Array,
        default: function () {
          return [];
        },
      },
      width: {
        type: String,
        default: "100px",
      },
      height: {
        type: String,
        default: "100px",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    methods: {
      handleSelectImage() {
        this.$refs["imageManager"].showImgManager();
      },
      selectImage(data) {
        this.$emit("input", data);
        this.$emit("change", data);
      },
      deleteImage(item) {
        const images = [...this.value];
        for (const index in images) {
          if (images[index].id === item.id) {
            images.splice(index, 1);
            continue;
          }
        }
        this.$emit("input", images);
        this.$emit("change", images);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .image-input-list-container {
    width: 100%;
    height: 100%;
    padding: 6px 0;
    .image-list {
      display: inline-block;
      height: 100%;
      margin-right: 10px;
      ul {
        height: 100%;
        padding: 0;
        margin: 0;
        li {
          position: relative;
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #dcdfe5;
          border-radius: 3px;
          float: left;
          &.item-box {
            &:hover {
              .close-btn {
                display: block;
              }
            }
            .close-btn {
              position: absolute;
              top: -6px;
              right: -6px;
              z-index: 10;
              display: none;
              width: 14px;
              height: 14px;
              line-height: 14px;
              color: #666;
              cursor: pointer;
            }
          }
          &.input-box {
            vertical-align: bottom;
            border: #e3e2e5 dashed 1px;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
              color: #2589ff;
              border-color: #2589ff;
            }
            .ope-box {
              display: flex;
              display: -webkit-flex;
              -webkit-align-items: center;
              align-items: center;
              -webkit-justify-content: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
