<template>
  <div class="wechat-container">
    <part-header>
      <span slot="title">设置被扫码回复</span>
    </part-header>
    <el-divider></el-divider>
    <el-row :gutter="20" class="section-wrap">
      <el-card class="wechat-wrap wechat" body-style="padding:0; width: 100%;">
        <div class="wechat-header">公众号</div>
        <section class="view-body">
          <div class="time-wrapper"><span class="time">9:36</span></div>
          <div class="view-item clearfix">
            <div class="avatar fl">
              <img src="@/assets/wechat/head.gif" />
            </div>
            <div class="box-content fl">
              <div>{{ replyForm.title || "请输入回复标题" }}</div>
              <div style="display: flex; padding-top: 4px">
                <div style="font-size: 12px; color: #777; padding-right: 10px">
                  {{ replyForm.introduction || "请输入回复描述" }}
                </div>
                <img
                  style="width: 48px; height: 48px"
                  :src="replyForm.image_url || defaultImage"
                />
              </div>
            </div>
          </div>
          <!--
            <div class="view-item news-box" :class="{show:values.type=='news'}" v-if="values.dataGroup.news.length >0">
              <div class="vn-content" v-if="values.dataGroup.news.length ==1">
                <div class="vn-title">{{values.dataGroup.news[0].title}}</div>
                <div class="vn-time">{{values.dataGroup.news[0].date}}</div>
                <div class="vn-picture" :style="{backgroundImage: 'url('+values.dataGroup.news[0].image+')'}"></div>
                <div class="vn-picture-info">{{values.dataGroup.news[0].description}}</div>
                <div class="vn-more">
                  <a :href="values.dataGroup.news[0].url">阅读原文</a>
                </div>
              </div> 
              <div class="vn-content" v-else>
                <div class="con-item-box">
                  <div class="vn-picture" :style="{backgroundImage: 'url('+values.dataGroup.news[0].image+')'}"></div>
                  <div class="first-title">{{values.dataGroup.news[0].title}}</div>
                </div>
                <div class="con-item-list clearfix" v-for="(newinfos,index) in values.dataGroup.news" v-if="index>0">
                  <div class="list-tit-info fl">{{newinfos.title}}</div>
                  <div class="list-pic fr" :style="{backgroundImage: 'url('+newinfos.image+')'}"></div>
                </div>
              </div>
            </div>
            -->
        </section>
      </el-card>

      <el-card class="ml340">
        <template slot="header">
          <span>设置被扫码回复</span>
        </template>
        <el-form
          ref="replyForm"
          :label-position="labelPosition"
          :model="replyForm"
          :rules="replyFormRules"
          label-width="100px"
          :style="{ 'margin-right': '60px' }"
        >
          <el-form-item label="回复标题：" prop="title">
            <el-input v-model="replyForm.title"></el-input>
          </el-form-item>
          <el-form-item label="回复图片：" prop="image_url">
            <vab-image-input v-model="image"></vab-image-input>
            <div slot="tip" class="el-upload__tip">
              文件最大2Mb，支持bmp/png/jpeg/jpg/gif格式
            </div>
          </el-form-item>
          <el-form-item label="回复描述：" prop="introduction">
            <el-input
              v-model="replyForm.introduction"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="save">
          <el-button type="primary" size="medium" @click="handleSave">
            保存
          </el-button>
          <el-button size="medium" @click="routerBack">取消</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import { getScanCodeReply, setScanCodeReply } from "@/api/wechat";
  import { uuid } from "@/utils/index";
  import { mount } from "sortablejs";
  import VabImageInput from "@/extra/Upload/ImageInput";

  export default {
    name: "WechatOfficialReplyScanCode",

    components: { VabImageInput },
    data() {
      return {
        defaultImage: require(`@/assets/wechat/banner_01.jpg`),
        image: null,
        detail: {},
        labelPosition: "right",
        listLoading: true,
        replyForm: {
          image_url: null,
          title: "",
          introduction: "",
        },
        replyFormRules: {
          title: [
            { required: true, message: "请输入回复标题", trigger: "blur" },
          ],
          introduction: [
            { required: true, message: "请输入回复描述", trigger: "blur" },
          ],
          image_url: [
            { required: true, message: "请选择回复图片", trigger: "blur" },
          ],
        },
      };
    },

    watch: {
      image(image) {
        if (image) {
          this.replyForm.image_url = image.url;
        } else {
          this.replyForm.image_url = null;
        }
      },
    },
    async mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1000) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
      await this.fetchData();
    },
    methods: {
      textInput() {
        this.$forceUpdate();
      },
      routerBack() {
        this.$router.back(-1);
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getScanCodeReply();
        this.detail = data;
        this.replyForm.title = data.title;
        this.replyForm.introduction = data.introduction;
        if (data.image_url) {
          this.replyForm.image_url = data.image_url;
          this.image = { url: data.image_url };
        }
        this.listLoading = false;
      },
      async handleSave() {
        this.$refs["replyForm"].validate(async (valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            try {
              await setScanCodeReply(this.replyForm);
              this.$baseMessage("保存成功", "success");
              loading.close();
            } catch (err) {
              this.$baseMessage(err.message, "error");
              loading.close();
            }
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .tip {
    font-size: 12px;
    color: #838fa1;
  }
  .ac {
    border: 1px solid #44b549 !important;
  }
  .save {
    text-align: center;
  }
  .no-data {
    height: 568px;
    line-height: 568px;
    text-align: center;
  }
  li {
    list-style: none;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ml340 {
    min-width: 320px;
    // margin-left: 340px;
  }
  .wechat-wrap {
    float: left;
    margin-right: 20px;
    width: 320px;
    height: 568px;
    position: relative;
    background: #f5f5f5;

    .wechat-header {
      height: 64px;
      background: url("~@/assets/wechat/mobile_head.png") no-repeat;
      text-align: center;
      color: #fff;
      line-height: 86px;
      overflow: hidden;
    }
    .wechat-footer {
      width: 100%;
      height: 50px;
      background: url("~@/assets/wechat/mobile_foot.png") no-repeat;
      text-align: center;
      color: #fff;
      line-height: 50px;
      position: absolute;
      left: 0;
      bottom: 0;
      .wechat-menus {
        height: 100%;
        margin: 0;
        padding-left: 42px;
        cursor: pointer;
        // overflow: hidden;
        color: #333;
        border-top: 1px solid #dee5e7;
        & > li {
          float: left;
          width: 33.3%;
          height: 100%;
          span {
            width: 100%;
            padding: 0 6px;
            display: inline-block;
          }
          border-right: 1px solid #dee5e7;
          position: relative;
          .wechat-sub-menus {
            width: 100%;
            padding-left: 0;
            position: absolute;
            left: 0;
            bottom: 64px;
            border: 1px solid #dee5e7;
            &::after {
              content: "";
              position: absolute;
              width: 10px;
              height: 10px;
              background: #fff;
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transform: rotate(45deg);
              bottom: -6px;
              border-bottom: 1px solid #dee5e7;
              border-right: 1px solid #dee5e7;
              left: 50%;
              margin-left: -5px;
            }
            li {
              width: 100%;
              height: 50px;
              border-bottom: 1px solid #dee5e7;
              &:nth-last-child(1) {
                border-bottom: 0;
              }
            }
            .sub-meuns-add {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
  .wechat .view-body {
    padding: 10px;
    background-color: #f5f5f5;
    height: 500px;
  }
  .wechat .view-body .time-wrapper {
    margin-bottom: 10px;
    text-align: center;
  }
  .wechat .view-body .time-wrapper .time {
    display: inline-block;
    color: #f5f5f5;
    display: inline-block;
    color: #f5f5f5;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 12px;
  }
  .wechat .view-body .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
  .wechat .fl {
    float: left;
  }
  .wechat .view-body .view-item .avatar {
    width: 40px;
    height: 40px;
  }
  .wechat .view-body .view-item .avatar img {
    max-width: 100%;
    height: auto;
  }
  .wechat .view-body .view-item .box-content {
    position: relative;
    max-width: 72%;
    min-height: 40px;
    margin-left: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 1.5;
    border-radius: 5px;
  }
  .wechat .view-body .view-item .box-content .picbox {
    max-width: 100%;
  }
  .wechat .view-body .view-item .box-content:before {
    content: "";
    position: absolute;
    left: -13px;
    top: 11px;
    display: block;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #ccc;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .wechat .view-body .view-item .box-content:after {
    content: "";
    content: "";
    position: absolute;
    left: -12px;
    top: 11px;
    display: block;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #f5f5f5;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  /* 图文 */
  .wechat .view-body .view-item.news-box {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
  }
  .wechat .view-body .view-item .vn-content {
    padding: 0;
  }
  .wechat .view-body .view-item .vn-content .vn-title {
    line-height: 1.5;
    font-size: 16px;
  }
  .wechat .view-body .view-item .vn-content .vn-time {
    padding: 5px 0;
    font-size: 12px;
    color: #999;
  }
  .wechat .view-body .view-item .vn-content .vn-picture {
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position: center center;
    border-radius: 5px 5px 0 0;
  }
  .wechat .view-body .view-item .vn-content .vn-picture-info {
    line-height: 22px;
    color: #7b7b7b;
    padding: 0;
    display: block;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    font-size: 12px;
    white-space: nowrap;
  }
  .wechat .view-body .view-item .vn-more {
    display: block;
    padding: 10px 0 0;
    border-top: 1px solid #dddddd;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .wechat .view-body .view-item .vn-content .con-item-box {
    position: relative;
  }
  .wechat .view-body .view-item .vn-content .con-item-box .first-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /*background: rgba(0,0,0,.8);*/
    color: #fff;
    text-indent: 1em;
  }
  .wechat .view-body .view-item .vn-content .con-item-list {
    margin-top: 10px;
    margin: 6px 10px 0 10px;
    border-top: 1px solid #fbfbfb;
  }
  .wechat .view-body .view-item .vn-content .con-item-list .list-tit-info {
    width: 70%;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .wechat .view-body .view-item .vn-content .con-item-list .list-pic {
    width: 20%;
    min-height: 50px;
    background-size: cover;
    background-position: center center;
  }

  /* 音乐 */
  .wechat .view-body .view-item.music-box .box-content {
    position: relative;
    width: 100%;
    background: #080;
    color: #fff;
    border-color: #080;
  }
  .wechat .view-body .view-item.music-box .box-content p {
    width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .wechat .view-body .view-item.music-box .box-content .music-icon {
    position: absolute;
    right: 11px;
    top: 50%;
    width: 30px;
    height: 30px;
    background: #0a0;
    text-align: center;
    line-height: 30px;
    margin-top: -15px;
    font-size: 16px;
  }

  .wechat .view-body .view-item.music-box .box-content:after {
    display: none;
  }
  .wechat .view-body .view-item.music-box .box-content:before {
    border-top: 10px solid #080;
  }
  /* 视频 */
  .wechat .view-body .view-item.video-box {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .wechat .view-body .view-item.video-box .vn-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
