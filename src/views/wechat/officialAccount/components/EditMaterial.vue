<template>
  <div class="wechat-container">
    <part-header>
      <span slot="title">
        {{ detail_id ? "编辑" : "添加" }}{{ titleMap[type] }}
      </span>
    </part-header>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="type === '1' ? 24 : 18">
        <template v-if="type === '1'">
          <el-form
            ref="textForm"
            :model="textForm"
            label-position="top"
            :rules="textFormRules"
            label-width="180px"
          >
            <el-form-item label="素材集名称" prop="name">
              <el-input
                v-model="textForm.name"
                style="width: 1080px; max-width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-row :gutter="20" class="section-wrap" style="overflow: hidden">
            <div
              style="
                width: 400px;
                max-width: 100%;
                float: left;
                padding-left: 10px;
                padding-right: 10px;
              "
            >
              <el-card :body-style="{ padding: '14px', cursor: 'pointer' }">
                <template slot="header">文章列表</template>
                <el-image
                  :src="articleInfo.src ? articleInfo.src.url : ''"
                  @click="sectionClick(articleInfo, -1)"
                >
                  <!-- :preview-src-list="articleInfo.previewList" -->
                  <template slot="error">
                    <img
                      style="width: 100%"
                      :src="errorImg"
                      @click="sectionClick(articleInfo, -1)"
                    />
                  </template>
                </el-image>
                <h4
                  class="ellipsis"
                  :title="articleInfo.title"
                  @click="sectionClick(articleInfo, -1)"
                >
                  {{ articleInfo.title }}
                </h4>
                <el-card
                  v-for="(item, index) in sectionList"
                  :key="index"
                  class="section-list"
                  :body-style="{ padding: '12px' }"
                  @click.native.stop="sectionClick(item, index)"
                >
                  <i
                    v-if="sectionList.length > 1"
                    class="el-icon-error close"
                    @click.stop="delSection(item, index)"
                  ></i>
                  <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="16">
                      <h6 class="ellipsis" :title="item.title">
                        {{ item.title }}
                      </h6>
                      <span class="ellipsis" :title="item.digest">
                        {{ item.digest }}
                      </span>
                    </el-col>
                    <el-col :span="8">
                      <el-image :src="item.src ? item.src.url : ''">
                        <!-- :preview-src-list="item.previewList" -->
                        <template slot="error">
                          <img style="width: 100%" :src="errorImg" />
                        </template>
                      </el-image>
                    </el-col>
                  </el-row>
                </el-card>
                <!-- <div v-for="(item, index) in sectionList" :key="index"></div> -->
                <el-button
                  style="width: 100%"
                  icon="el-icon-plus"
                  size="medium"
                  @click="addSection"
                >
                  添加
                </el-button>
              </el-card>
            </div>
            <div
              style="
                padding-left: 10px;
                padding-right: 10px;
                width: 700px;
                float: left;
                max-width: 100%;
              "
            >
              <el-card>
                <template slot="header">文章内容编辑</template>
                <el-form
                  ref="articleForm"
                  :model="articleForm"
                  :label-position="labelPosition"
                  :rules="articleFormRules"
                  label-width="82px"
                >
                  <el-form-item label="标题：" prop="title">
                    <el-input v-model="articleForm.title"></el-input>
                  </el-form-item>
                  <el-form-item label="作者：" prop="author">
                    <el-input v-model="articleForm.author"></el-input>
                  </el-form-item>
                  <el-form-item label="封面：" prop="src">
                    <!-- {{ posterImage }} -->
                    <vab-image-input v-model="posterImage"></vab-image-input>
                    <p class="describe">
                      文件最大2Mb，支持bmp/png/jpeg/jpg/gif格式
                      <br />
                      首条封面建议尺寸750*319像素
                      <br />
                      下一条封面尺寸为长宽相等的正方形
                    </p>
                  </el-form-item>
                  <el-form-item label="摘要：" prop="digest">
                    <el-input v-model="articleForm.digest"></el-input>
                  </el-form-item>
                  <!-- {{ articleForm.content }} -->
                  <el-form-item label="正文：" prop="content">
                    <vab-editor
                      ref="content-editor"
                      v-model="articleForm.content"
                      :height="300"
                      @selectImage="selectImage"
                    />
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-row>
        </template>
        <template v-else-if="type === '2' || type === '3' || type === '4'">
          <el-form
            ref="resourceForm"
            :model="resourceForm"
            :label-position="labelPosition"
            :rules="resourceFormRules"
            label-width="180px"
          >
            <el-form-item label="素材名称：" prop="name">
              <el-input v-model="resourceForm.name"></el-input>
            </el-form-item>
            <el-form-item
              v-if="type === '4'"
              label="素材描述："
              prop="introduction"
            >
              <el-input
                v-model="resourceForm.introduction"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="type === '2' && !detail_id"
              label="选择素材："
              prop="src"
            >
              <vab-image-input v-model="image"></vab-image-input>
              <div slot="tip" class="el-upload__tip">
                <p class="describe">
                  文件最大2Mb，支持bmp/png/jpeg/jpg/gif格式
                </p>
              </div>
            </el-form-item>
            <el-form-item
              v-if="type === '2' && detail_id"
              label="选择素材："
              prop="src"
            >
              <vab-image-input v-model="updateImage"></vab-image-input>
              <div slot="tip" class="el-upload__tip">
                <p class="describe">
                  文件最大2Mb，支持bmp/png/jpeg/jpg/gif格式
                </p>
              </div>
            </el-form-item>
            <el-form-item
              v-if="type === '3' && !detail_id"
              label="选择素材："
              prop="src"
            >
              <el-upload
                ref="upload"
                class="upload-demo"
                :headers="uploadHeaders"
                accept="audio/mpeg,audio/x-ms-wma,audio/wav,audio/amr"
                :action="`${baseURL}merchant/wechat/material/voice/create?name=${resourceForm.name}`"
                :auto-upload="false"
                :limit="1"
                :on-change="onChange"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  <p class="describe">
                    文件最大2Mb，播放长度不超过60s，支持mp3/wma/wav/amr格式
                  </p>
                </div>
              </el-upload>
            </el-form-item>
            <template v-if="type === '3' && detail_id">
              <el-form-item label="选择素材：" prop="src">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :headers="uploadHeaders"
                  accept="audio/mpeg,audio/x-ms-wma,audio/wav,audio/amr"
                  :action="`${baseURL}merchant/wechat/material/voice/update/${detail_id}?name=${resourceForm.name}`"
                  :auto-upload="false"
                  :limit="1"
                  :on-change="onChange"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                >
                  <el-button size="small" type="primary">重新上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    <p class="describe">
                      文件最大2Mb，播放长度不超过60s，支持mp3/wma/wav/amr格式
                    </p>
                  </div>
                </el-upload>
              </el-form-item>
            </template>
            <el-form-item
              v-if="type === '4' && !detail_id"
              label="选择素材："
              prop="src"
              :required="false"
            >
              <el-upload
                ref="upload"
                class="upload-demo"
                :headers="uploadHeaders"
                accept="video/mp4"
                :action="`${baseURL}merchant/wechat/material/video/create?name=${resourceForm.name}&introduction=${resourceForm.introduction}`"
                :auto-upload="false"
                :limit="1"
                :on-change="onChange"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  文件最大10Mb，只支持MP4格式
                </div>
              </el-upload>
            </el-form-item>
            <template v-if="type === '4' && detail_id">
              <el-form-item label="选择素材：" prop="src">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :headers="uploadHeaders"
                  accept="video/mp4"
                  :action="`${baseURL}merchant/wechat/material/video/update/${detail_id}?name=${resourceForm.name}&introduction=${resourceForm.introduction}`"
                  :auto-upload="false"
                  :limit="1"
                  :on-change="onChange"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                >
                  <el-button size="small" type="primary">重新上传</el-button>
                  <a
                    style="padding-left: 8px"
                    @click="downloadFile(resourceForm.url)"
                  >
                    下载素材
                  </a>
                  <div slot="tip" class="el-upload__tip">
                    文件最大10Mb，只支持MP4格式
                  </div>
                </el-upload>
              </el-form-item>
            </template>
          </el-form>
        </template>
        <template v-else-if="type === '5'">
          <el-form
            ref="messageForm"
            :model="messageForm"
            :label-position="labelPosition"
            :rules="messageFormRules"
            label-width="180px"
            :style="{ 'margin-right': '100px' }"
          >
            <el-form-item label="消息类型：" prop="type">
              <el-select
                v-model="messageForm.type"
                placeholder="请选择消息类型"
              >
                <el-option
                  v-for="item in messageTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消息标题：" prop="title">
              <el-input v-model="messageForm.title"></el-input>
            </el-form-item>
            <el-form-item
              v-for="(item, index) in messageFormMap[messageForm.type] || []"
              :key="index"
              v-model="messageForm[item.prop]"
              :label="`${item.title}：`"
              :prop="item.prop"
              :rules="[
                {
                  required: true,
                  message: `${item.type === 'radio' ? '请选择' : '请输入'}${
                    item.title
                  }`,
                },
              ]"
            >
              <el-input
                v-if="item.type === 'textarea'"
                type="textarea"
                :rows="3"
              ></el-input>
              <el-input
                v-else-if="item.type === 'input'"
                v-model="messageForm[item.prop]"
              ></el-input>
              <el-radio-group
                v-else-if="item.type === 'radio'"
                v-model="messageForm[item.prop]"
              >
                <el-radio
                  v-for="list in item.list"
                  :key="list.value"
                  :label="list.value"
                >
                  {{ list.label }}
                </el-radio>
              </el-radio-group>
              <span v-if="item.tip" v-html="item.tip"></span>
            </el-form-item>
          </el-form>
        </template>
        <div class="save">
          <el-button type="primary" size="medium" @click="handleSave">
            保存
          </el-button>
          <el-button size="medium" @click="routerBack">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabImageInput from "@/extra/Upload/ImageInput";
  import VabEditor from "@/extra/Editor";
  import { baseURL, tokenName } from "@/config/settings";
  import store from "@/store";
  import {
    addMaterialText,
    getMaterialTextDetail,
    updateMaterialText,
    addMaterialImage,
    getMaterialImageDetail,
    updateMaterialImage,
    addMaterialVoice,
    getMaterialVoiceDetail,
    updateMaterialVoice,
    addMaterialVideo,
    getMaterialVideoDetail,
    updateMaterialVideo,
  } from "@/api/wechat";
  export default {
    name: "MaterialEdit",
    components: { VabImageInput, VabEditor },
    data() {
      return {
        labelPosition: "right",
        image: null,
        updateImage: null,
        type: "",
        detail_id: "",
        titleMap: {
          1: "图文素材",
          2: "图片素材",
          3: "语音素材",
          4: "视频素材",
          5: "群发消息",
        },
        errorImg: require("@/assets/login_images/background.jpg"),
        textForm: {
          name: "",
        },
        textFormRules: {
          name: [
            { required: true, message: "请输入素材集名称", trigger: "blur" },
          ],
        },
        posterImage: undefined,
        articleForm: {
          src: "",
          // previewList: [],
          title: "",
          author: "",
          digest: "",
          content: "",
        },
        articleFormRules: {
          title: [{ required: true, message: "请输入标题", trigger: "blur" }],
          src: [{ required: true, message: "请选择封面", trigger: "change" }],
          digest: [{ required: true, message: "请输入摘要", trigger: "blur" }],
          content: [{ required: true, message: "请输入正文", trigger: "blur" }],
        },
        resourceForm: {
          src: "",
          // previewList: [],
          name: "",
          introduction: "",
        },
        resourceFormRules: {
          name: [
            { required: true, message: "请输入素材名称", trigger: "blur" },
          ],
          introduction: [
            { required: true, message: "请输入素材描述", trigger: "blur" },
          ],
          src: [{ required: true, message: "请选择素材", trigger: "change" }],
        },
        articleInfo: {
          src: undefined,
          // src: require("@/assets/login_images/background.jpg"),
          // previewList: [],
          title: "封面标题",
          author: "",
          digest: "",
          content: "",
        },
        articleBaseItem: {
          src: undefined,
          // previewList: [],
          title: "",
          author: "",
          digest: "",
          content: "",
        },
        sectionList: [],
        messageForm: {
          type: "1",
        },
        messageFormRules: {
          type: [
            { required: true, message: "请选择消息类型", trigger: "change" },
          ],
          title: [
            { required: true, message: "请输入消息标题", trigger: "blur" },
          ],
          introduction: [
            { required: true, message: "请输入消息内容", trigger: "blur" },
          ],
        },
        messageTypeData: [
          {
            value: "1",
            label: "图文消息",
          },
          {
            value: "2",
            label: "文本消息",
          },
          {
            value: "3",
            label: "图片消息",
          },
          {
            value: "4",
            label: "视频消息",
          },
          {
            value: "5",
            label: "语音消息",
          },
          {
            value: "6",
            label: "音乐消息",
          },
          {
            value: "7",
            label: "卡券消息",
          },
        ],
        messageFormMap: {
          1: [
            {
              title: "消息内容 MEDIA_ID",
              prop: "MEDIA_ID",
              tip: `获取  <a href="#/officialAccount/material/imageTxt">图文素材MEDIA_ID</a>`,
              type: "textarea",
            },
            {
              title: "判定为转载时",
              prop: "reprint",
              type: "radio",
              list: [
                { label: "停止群发", value: "1" },
                { label: "继续群发", value: "2" },
              ],
            },
          ],
          2: [
            {
              title: "消息内容",
              prop: "MEDIA_ID",
              type: "textarea",
            },
          ],
          3: [
            {
              title: "消息内容 MEDIA_ID",
              prop: "MEDIA_ID",
              tip: `获取  <a href="#/officialAccount/material/image">图片素材MEDIA_ID</a>`,
              type: "textarea",
            },
            {
              title: "推荐语",
              prop: "recommend",
              type: "input",
            },
            {
              title: "开启评论",
              prop: "reprint",
              type: "radio",
              list: [
                { label: "开启", value: "1" },
                { label: "关闭", value: "2" },
              ],
            },
            {
              title: "谁可评论",
              prop: "reprint",
              type: "radio",
              list: [
                { label: "粉丝", value: "1" },
                { label: "所有人", value: "2" },
              ],
            },
            {
              title: "素材描述",
              prop: "recommend",
              type: "input",
            },
          ],
          4: [
            {
              title: "消息内容 MEDIA_ID",
              prop: "MEDIA_ID",
              tip: `获取  <a href="#/officialAccount/material/video">视频素材MEDIA_ID</a>`,
              type: "textarea",
            },
          ],
          5: [
            {
              title: "消息内容 MEDIA_ID",
              prop: "MEDIA_ID",
              tip: `获取  <a href="#/officialAccount/material/voice">语音素材MEDIA_ID</a>`,
              type: "textarea",
            },
          ],
          6: [
            {
              title: "消息内容 MEDIA_ID",
              prop: "MEDIA_ID",
              type: "textarea",
            },
          ],
          7: [
            {
              title: "消息内容 CARD_ID",
              prop: "CARD_ID",
              type: "textarea",
            },
          ],
        },
        baseURL,
        uploadHeaders: {
          [tokenName]: store.getters["passport/token"],
        },
      };
    },
    watch: {
      posterImage(image) {
        console.log("image", image);
        if (image) {
          // this.articleForm.imageId = image.id;
          this.articleForm.src = image;
          this.$refs.articleForm.clearValidate("src");
        } else {
          this.articleForm.src = undefined;
        }
      },
      image(image) {
        console.log("image", image);
        if (image) {
          this.resourceForm.src = image.id;
        } else {
          this.resourceForm.src = "";
        }
      },
      updateImage(image) {
        console.log("updateImage", image);
        if (image) {
          this.resourceForm.src = image.id;
        } else {
          this.resourceForm.src = "";
        }
      },
    },
    async created() {
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

      const { params } = this.$route;
      this.type = params.type;
      this.detail_id = params.detail_id;
      if (this.detail_id) {
        let Api = "";
        switch (this.type) {
          case "1":
            this.articleForm = this.articleInfo;
            Api = getMaterialTextDetail;
            break;
          case "2":
            Api = getMaterialImageDetail;
            break;
          case "3":
            Api = getMaterialVoiceDetail;
            this.resourceFormRules.src[0].required = false;
            break;
          case "4":
            Api = getMaterialVideoDetail;
            this.resourceFormRules.src[0].required = false;
            break;
          default:
            break;
        }

        const detail = await Api(this.detail_id);
        console.log("detail", detail);
        if (detail.code === 0) {
          const data = detail.data || {};
          if (this.type === "1") {
            this.textForm.name = data.name;
            const material_text_list = data.material_text_list || [];
            console.log(material_text_list);
            material_text_list.forEach((item) => {
              // TODO 图片url没返回,返回赋上值就好了
              if (item.resource_id) {
                item.src = item.resource;
              }
            });
            this.articleInfo = material_text_list.length
              ? material_text_list[0]
              : undefined;
            this.articleForm = this.articleInfo;
            this.posterImage = this.articleForm.src;
            this.sectionList = material_text_list.slice(1);
          } else {
            this.resourceForm = data;
            if (this.type === "2") {
              this.updateImage = this.resourceForm.resource;
            }
          }
        } else {
          this.$message.closeAll();
          this.$message.warning(detail.msg);
        }
      } else {
        switch (this.type) {
          case "1":
            this.articleForm = this.articleInfo;
            break;
          case "2":
            break;
          case "3":
            break;
          case "4":
            break;
          default:
            break;
        }
      }
    },
    methods: {
      // 获取富文本里面img的id
      getTextImg(str) {
        const data = [];
        str.replace(
          /<img [^>]*data-image-id=['"]([^'"]+)[^>]*>/g,
          (match, capture) => {
            data.push(capture);
          }
        );
        const list = [...new Set(data)];
        return list;
      },
      // 校验表单
      testArticleForm(formName) {
        let status = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            status = true;
          } else {
            status = false;
          }
        });
        return status;
      },
      // 增加段落
      addSection() {
        if (this.sectionList.length >= 10) {
          this.$message.closeAll();
          this.$message.warning(`最多添加${this.sectionList.length}个段落`);
          return;
        }
        // const status = this.testArticleForm("articleForm");
        // if (status) {
        const articleBaseItem = Object.assign({}, this.articleBaseItem);
        this.sectionList.push(articleBaseItem);
        this.posterImage = undefined;
        this.articleForm = articleBaseItem;
        this.articleForm.content = "";
        this.$refs["content-editor"].resetChangeStatus();
        // }
      },
      // 段落点击
      sectionClick(item, index) {
        console.log("sectionClick", item, index);
        // const status = this.testArticleForm("articleForm");
        // console.log("status", status);
        // if (!status) {
        //   return;
        // }
        this.$refs["content-editor"].resetChangeStatus();
        this.articleForm = item;
        this.posterImage = item.src;
      },
      // 段落删除
      delSection(item, index) {
        this.sectionList.splice(index, 1);
      },
      routerBack() {
        this.$router.back(-1);
      },
      downloadFile(url) {
        window.open(url);
      },
      selectImage(img) {
        console.log("selectImage", img);
        // 直接push进数组的话会有一个问题，删除了这张图片，这个数组会不知道
      },
      async handleSave() {
        let formName = "";
        let params = {};
        let Api = null;
        switch (this.type) {
          case "1":
            if (!this.textForm.name) {
              this.$message.closeAll();
              this.$message.warning("请输入素材集名称");
              return;
            }
            formName = "articleForm";
            Api = this.detail_id ? updateMaterialText : addMaterialText;
            let imgStr = `${this.articleInfo.content || ""}`;
            const sectionList = this.sectionList.map((item) => {
              imgStr += item.content ? item.content : "";
              return {
                title: item.title,
                author: item.author,
                digest: item.digest,
                content: item.content,
                resource_id: item.src ? item.src.id : undefined,
              };
            });
            const image_ids = this.getTextImg(imgStr);
            const text_list = [
              {
                title: this.articleInfo.title,
                author: this.articleInfo.author,
                digest: this.articleInfo.digest,
                content: this.articleInfo.content,
                resource_id: this.articleInfo.src
                  ? this.articleInfo.src.id
                  : undefined,
              },
              ...sectionList,
            ];
            params = {
              name: this.textForm.name,
              image_ids: image_ids,
              text_list: text_list,
            };
            break;
          case "2":
            formName = "resourceForm";
            Api = this.detail_id ? updateMaterialImage : addMaterialImage;
            params = {
              name: this.resourceForm.name,
              resourceId: this.resourceForm.src,
            };
            break;
          case "3":
            formName = "resourceForm";
            if (this.detail_id && !this.resourceForm.src) {
              Api = updateMaterialVoice;
              params = {
                name: this.resourceForm.name,
              };
            }
            break;
          case "4":
            formName = "resourceForm";
            if (this.detail_id && !this.resourceForm.src) {
              Api = updateMaterialVideo;
              params = {
                name: this.resourceForm.name,
                introduction: this.resourceForm.introduction,
              };
            }
            break;
          case "5":
            formName = "messageForm";
            break;
          default:
            break;
        }
        // return;
        const status = this.testArticleForm(formName);
        if (status) {
          if (Api) {
            let res;
            if (this.detail_id) {
              res = await Api(this.detail_id, params);
            } else {
              res = await Api(params);
            }
            if (res.code === 0) {
              this.$router.go(-1);
            } else {
              this.$message.closeAll();
              this.$message.warning(res.msg);
            }
          } else {
            this.$refs.upload.submit();
          }
        }
      },
      // 文件状态改变时的钩子
      onChange(file) {
        console.log("文件状态改变时的钩子:", file);
        if (file.status === "ready") {
          if (this.type === "3" || this.type === "4") {
            this.resourceForm.src = file.name;
            this.$refs.resourceForm.clearValidate("src");
          }
        }
      },
      // 上传之前验证-判断格式/大小
      beforeUpload(file) {
        console.log("上传之前验证:", file);
        let is_lt = false;
        switch (this.type) {
          case "1":
            break;
          case "2":
            break;
          case "3":
            is_lt = file.size / 1024 / 1024 < 2;
            break;
          case "4":
            is_lt = file.size / 1024 / 1024 < 10;
            break;

          default:
            break;
        }
        if (!is_lt) {
          this.$message.closeAll();
          this.$message.warning("上传文件太大");
          return false;
        }
      },
      // 上传成功
      uploadSuccess(response, file, file_list) {
        console.log("上传成功", response, file, file_list);
        if (response.code === 0) {
          this.$message.closeAll();
          this.$message.success(response.msg);
          this.$router.go(-1);
        } else {
          this.$message.closeAll();
          this.$message.warning(response.msg || response.error);
        }
      },
      // 上传失败
      uploadError(err, file, file_list) {
        console.log("上传失败", err, file, file_list);
        this.$message.closeAll();
        this.$message.error(err.msg || "请求未响应");
      },
    },
  };
</script>

<style lang="scss" scoped>
  // * {
  //   margin: 0;
  //   padding: 0;
  // }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h4,
  h6 {
    margin: 10px 0;
  }
  .describe {
    line-height: 18px;
    color: #999;
    margin: 0;
    margin-top: 12px;
  }
  .section-wrap {
    .el-col {
      height: 100%;
    }
  }
  .section-list {
    // border: 1px solid red;
    margin-bottom: 14px;
    position: relative;
    overflow: visible;
    &:hover {
      .close {
        color: red;
      }
    }
    .close {
      position: absolute;
      right: -8px;
      top: -8px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.2s;
      color: #606266;
    }
  }
  .save {
    text-align: center;
  }
</style>
