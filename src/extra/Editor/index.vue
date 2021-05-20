<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <vab-upload ref="imageManager" @on-select="selectImage"></vab-upload>
  </div>
</template>

<script>
  /**
   * docs:
   * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
   */
  import plugins from "./plugins";
  import toolbar from "./toolbar";
  import load from "./dynamicLoadScript";
  import VabUpload from "@/extra/Upload";
  // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
  const tinymceCDN =
    "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.5/tinymce.min.js";
  export default {
    name: "Tinymce",
    components: { VabUpload },
    props: {
      id: {
        type: String,
        default: function () {
          return (
            "vue-tinymce-" +
            +new Date() +
            ((Math.random() * 1000).toFixed(0) + "")
          );
        },
      },
      value: {
        type: String,
        default: "",
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return [];
        },
      },
      menubar: {
        type: String,
        default: "file edit insert view format table",
      },
      height: {
        type: [Number, String],
        required: false,
        default: 360,
      },
      width: {
        type: [Number, String],
        required: false,
        default: "auto",
      },
    },
    data() {
      return {
        editor: null,
        hasChange: false,
        hasInit: false,
        tinymceId: this.id,
        fullscreen: false,
        languageTypeList: {
          zh: "zh_CN",
          en: "en",
          es: "es_MX",
          ja: "ja",
        },
      };
    },
    computed: {
      containerWidth() {
        const width = this.width;
        if (/^[\d]+(\.[\d]+)?$/.test(width)) {
          // matches `100`, `'100'`
          return `${width}px`;
        }
        return width;
      },
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() =>
            window.tinymce.get(this.tinymceId).setContent(val || "")
          );
        }
      },
    },
    mounted() {
      this.init();
    },
    activated() {
      if (window.tinymce) {
        this.initTinymce();
      }
    },
    deactivated() {
      this.destroyTinymce();
    },
    destroyed() {
      this.destroyTinymce();
    },
    methods: {
      showImageManager() {
        this.$refs["imageManager"].showImgManager();
      },
      selectImage(img) {
        const that = this;
        // Open window
        that.editor.windowManager.open({
          title: "插入图片",
          body: [
            {
              type: "textbox",
              name: "id",
              value: img.id,
              hidden: true,
            },
            {
              type: "textbox",
              name: "url",
              value: img.url,
              label: "图片地址",
            },
            { type: "textbox", name: "desc", label: "图片描述" },
            {
              type: "textbox",
              name: "width",
              value: "100%",
              label: "图片宽度",
            },
            { type: "textbox", name: "height", label: "图片高度" },
          ],
          onsubmit: function (e) {
            const { id, url, desc, width, height } = e.data;
            // Insert content when the window form is submitted
            that.editor.execCommand(
              "mceInsertContent",
              false,
              '<img alt="' +
                desc +
                '" width="' +
                width +
                '" height="' +
                height +
                '" src="' +
                url +
                '" data-image-id="' +
                id +
                '"/>'
            );
            that.$emit("selectImage", e.data);
            // that.editor.insertContent("Title: " + JSON.stringify(e.data));
          },
        });
      },
      init() {
        // dynamic load tinymce from cdn
        load(tinymceCDN, (err) => {
          if (err) {
            this.$message.error(err.message);
            return;
          }
          this.initTinymce();
        });
      },
      resetChangeStatus() {
        this.hasChange = false;
      },
      initTinymce() {
        const _this = this;
        tinymce.PluginManager.add("imagemanager", function (editor, url) {
          // Add a button that opens a window
          editor.addButton("imagemanager", {
            text: "",
            icon: "image",
            onclick: function () {
              _this.editor = editor;
              _this.showImageManager();
            },
          });
          return {
            getMetadata: function () {
              return {
                name: "imagemanager plugin",
                url: "http://exampleplugindocsurl.com",
              };
            },
          };
        });
        window.tinymce.init({
          selector: `#${this.tinymceId}`,
          language: this.languageTypeList["zh"],
          height: this.height,
          body_class: "panel-body ",
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: "clean",
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: "square",
          advlist_number_styles: "default",
          imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
          default_link_target: "_blank",
          link_title: false,
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          init_instance_callback: (editor) => {
            if (_this.value) {
              editor.setContent(_this.value);
            }
            _this.hasInit = true;
            editor.on("NodeChange Change KeyUp SetContent", () => {
              this.hasChange = true;
              this.$emit("input", editor.getContent());
            });
          },
          setup(editor) {
            editor.on("FullscreenStateChanged", (e) => {
              _this.fullscreen = e.state;
            });
          },
          // it will try to keep these URLs intact
          // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
          // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
          convert_urls: false,
          // 整合七牛上传
          // images_dataimg_filter(img) {
          //   setTimeout(() => {
          //     const $image = $(img);
          //     $image.removeAttr('width');
          //     $image.removeAttr('height');
          //     if ($image[0].height && $image[0].width) {
          //       $image.attr('data-wscntype', 'image');
          //       $image.attr('data-wscnh', $image[0].height);
          //       $image.attr('data-wscnw', $image[0].width);
          //       $image.addClass('wscnph');
          //     }
          //   }, 0);
          //   return img
          // },
          // images_upload_handler(blobInfo, success, failure, progress) {
          //   progress(0);
          //   const token = _this.$store.getters.token;
          //   getToken(token).then(response => {
          //     const url = response.data.qiniu_url;
          //     const formData = new FormData();
          //     formData.append('token', response.data.qiniu_token);
          //     formData.append('key', response.data.qiniu_key);
          //     formData.append('file', blobInfo.blob(), url);
          //     upload(formData).then(() => {
          //       success(url);
          //       progress(100);
          //     })
          //   }).catch(err => {
          //     failure('出现未知问题，刷新页面，或者联系程序员')
          //     console.log(err);
          //   });
          // },
        });
      },
      destroyTinymce() {
        const tinymce = window.tinymce.get(this.tinymceId);
        if (this.fullscreen) {
          tinymce.execCommand("mceFullScreen");
        }
        if (tinymce) {
          tinymce.destroy();
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value);
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent();
      },
      imageSuccessCBK(arr) {
        arr.forEach((v) =>
          window.tinymce
            .get(this.tinymceId)
            .insertContent(`<img class="wscnph" src="${v.url}" >`)
        );
      },
    },
  };
</script>
<style lang="scss">
  .mce-branding {
    display: none !important;
  }
  .mce-flow-layout-item > div {
    white-space: initial !important;
  }
  .mce-window-head .mce-title {
    font-size: 14px !important;
  }
  div.mce-edit-area {
    border-right: 1px solid #dcdfe6 !important;
  }
  .mce-panel {
    border-left: 0 !important;
    border-right: 0 !important;
    border-bottom: 0 !important;
    border-top: 1px solid #dcdfe6 !important;
    background-color: #fff;
  }
  .mce-window {
    z-index: 500 !important;
  }
  #mce-modal-block {
    z-index: 498 !important;
  }
  // .mce-window-body {
  //   max-width: 98% !important;
  // }
  // .mce-window {
  //   max-width: 98% !important;
  // }
</style>
<style lang="scss" scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
  }
  .tinymce-container {
    ::v-deep {
      .mce-fullscreen {
        z-index: 10000;
      }
    }
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
  }
  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }
  .editor-upload-btn {
    display: inline-block;
  }
</style>
