<template>
  <div class="wechat-container">
    <part-header>
      <span slot="title">公众号菜单设置</span>
    </part-header>
    <el-divider></el-divider>
    <el-row :gutter="20" class="section-wrap">
      <el-card class="wechat-wrap" body-style="padding:0; width: 100%;">
        <div class="wechat-header">公众号</div>
        <div class="wechat-footer">
          <ul class="wechat-menus" @click="addMenus">
            <li
              v-for="(item, index) in footList"
              :key="index"
              :class="{ ac: item.id === currentId }"
              @click.stop="menuClick(item, index)"
            >
              <span class="ellipsis">{{ item.label }}</span>
              <ul class="wechat-sub-menus">
                <li
                  v-for="(list, idx) in item.subMenus"
                  :key="idx"
                  :class="{ ac: list.id === currentId }"
                  @click.stop="subMenuClick(list, idx)"
                >
                  {{ list.label }}
                </li>
                <li
                  v-if="item.subMenus.length < 5"
                  class="sub-meuns-add"
                  @click.stop="addSubMenus(item, index)"
                >
                  <vab-remix-icon icon-class="add-fill"></vab-remix-icon>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </el-card>

      <el-card v-if="visible" class="ml340">
        <template slot="header">
          <span>{{ menusForm.label }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="deleteMenu(menusForm)"
          >
            删除
          </el-button>
        </template>
        <el-form
          ref="menusForm"
          :label-position="labelPosition"
          :model="menusForm"
          :rules="menusFormRules"
          label-width="100px"
          :style="{ 'margin-right': '60px' }"
        >
          <el-form-item label="菜单名称：" prop="label">
            <el-input
              v-model="menusForm.label"
              placeholder="请输入菜单名称"
            ></el-input>
            <span class="tip">字数不超过13个汉字或40个字母</span>
          </el-form-item>
          <template
            v-if="menusForm.parentId || menusForm.subMenus.length === 0"
          >
            <el-form-item label="菜单类型：" prop="type">
              <el-select v-model="menusForm.type" placeholder="请选择菜单类型">
                <el-option
                  v-for="item in typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="(item, index) in typeMap[menusForm.type] || []"
              :key="index"
              v-model="menusForm[item.prop]"
              :label="`${item.title}：`"
              :prop="item.prop"
              :rules="[
                {
                  required: true,
                  message: `请输入${item.title}`,
                },
              ]"
            >
              <el-input v-model="menusForm[item.prop]"></el-input>
              <span v-if="item.tip" class="tip" v-html="item.tip"></span>
            </el-form-item>
            <template v-if="menusForm.type === '4'">
              <el-form-item
                label="素材类型："
                prop="mediaType"
                :rules="[
                  {
                    required: true,
                    message: `请选择素材类型`,
                  },
                ]"
              >
                <el-select
                  v-model="menusForm.mediaType"
                  placeholder="请选择素材类型"
                  @change="selectMediaType"
                >
                  <el-option
                    v-for="item in mediaType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :required="true" label="选择素材：">
                <el-button type="primary" size="small" @click="showSelectMedia">
                  选择{{
                    (
                      mediaType.find(
                        (type) => type.value === menusForm.mediaType
                      ) || {}
                    ).label || "素材"
                  }}
                </el-button>
                <span
                  v-if="menusForm.media_id"
                  class="tip"
                  style="padding-left: 10px"
                >
                  素材ID：{{ menusForm.media_id }}
                </span>
              </el-form-item>
            </template>
          </template>
        </el-form>
        <div class="save">
          <el-button type="primary" size="medium" @click="handleSave">
            保存
          </el-button>
          <el-button size="medium" @click="routerBack">取消</el-button>
        </div>
      </el-card>
      <el-card
        v-else
        class="no-data ml340"
        body-style="padding:0; height: 100%;"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            height: 100%;
            align-items: center;
            justify-content: center;
          "
        >
          <span class="tip" style="line-height: 50px; font-size: 13px">
            点击左侧菜单进行操作
          </span>
          <el-button type="primary" size="small" @click="handleSave">
            保存
          </el-button>
        </div>
      </el-card>
    </el-row>
    <select-media
      ref="selectMedia"
      :type="menusForm.mediaType"
      @select="selectdMedia"
    ></select-media>
  </div>
</template>

<script>
  import { getMenus, setMenus } from "@/api/wechat";
  import { uuid } from "@/utils/index";
  import SelectMedia from "../reply/components/selectMedia";

  export default {
    name: "WechatOfficialMenus",
    components: { SelectMedia },
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        footList: [],
        visible: false,
        currentId: "",
        menusForm: {
          type: "1",
          mediaType: 50,
          media_id: null,
        },
        menusFormRules: {
          label: [
            { required: true, message: "请输入菜单名称", trigger: "blur" },
          ],
          type: [
            { required: true, message: "请选择菜单类型", trigger: "change" },
          ],
        },
        mediaType: [
          {
            label: "图文素材",
            value: 50,
          },
          {
            label: "图片素材",
            value: 20,
          },
          {
            label: "音频素材",
            value: 30,
          },
          {
            label: "视频素材",
            value: 40,
          },
        ],
        typeData: [
          {
            label: "关键字",
            value: "1",
          },
          {
            label: "跳转网页",
            value: "2",
          },
          {
            label: "跳转小程序",
            value: "3",
          },
          {
            label: "微信素材",
            value: "4",
          },
        ],
        typeMap: {
          1: [
            {
              title: "关键字",
              type: "input",
              prop: "keyword",
              tip: "根据关键字可返回事先设置的回复内容",
            },
          ],
          2: [
            {
              title: "跳转链接",
              type: "input",
              prop: "url",
              tip: "链接格式：http://baidu.com/xxx/abc.html",
            },
          ],
          3: [
            {
              title: "APPID",
              type: "input",
              prop: "APPID",
              tip: "必须是公众号所绑定的小程序",
            },
            {
              title: "备用网页URL",
              type: "input",
              prop: "url",
              tip:
                "小程序不能正常打开时,可转向此链接。<br/>链接格式：http://baidu.com/xxx/abc.html",
            },
            {
              title: "小程序路径",
              type: "input",
              prop: "path",
              tip: "例如：pages/index/index",
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
          if (width < 1000) {
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
      showSelectMedia() {
        this.$refs["selectMedia"].show();
      },
      selectdMedia(media) {
        this.menusForm.media_id = media.media_id;
        this.$forceUpdate();
      },
      routerBack() {
        this.$router.back(-1);
      },
      selectMediaType(type) {
        this.menusForm.media_id = null;
        this.$forceUpdate();
      },
      getMenuType(type, reverse = true) {
        if (reverse) {
          switch (type) {
            case "click":
              return "1";
            case "view":
              return "2";
            case "miniprogram":
              return "3";
            case "media_id":
              return "4";
            default:
              return "1";
          }
        } else {
          switch (type) {
            case "1":
              return "click";
            case "2":
              return "view";
            case "3":
              return "miniprogram";
            case "4":
              return "media_id";
            default:
              return "click";
          }
        }
      },
      async fetchData() {
        this.listLoading = true;
        this.footList = [];
        const { data } = await getMenus();
        this.listLoading = false;
        if (!data || !data.selfmenu_info || !data.selfmenu_info.button) {
          return;
        }
        const genMenu = (menu, extra = {}) => {
          const data = {
            label: menu.name,
            type: this.getMenuType(menu.type),
            id: uuid(),
            subMenus: [],
            ...extra,
          };
          if (menu.media_id) {
            data.media_id = menu.media_id;
            data.mediaType = 50;
          }
          if (menu.key) {
            data.keyword = menu.key;
          }
          if (menu.appid) {
            data.APPID = menu.appid;
          }
          if (menu.pagepath) {
            data.path = menu.pagepath;
          }
          if (menu.url) {
            data.url = menu.url;
          }
          return data;
        };
        data.selfmenu_info.button.forEach((menu) => {
          const newMenu = genMenu(menu);
          if (menu.sub_button && menu.sub_button.list) {
            newMenu.subMenus = menu.sub_button.list.map((item) =>
              genMenu(item, {
                parentId: newMenu.id,
              })
            );
          }
          this.footList.push(newMenu);
        });
      },
      // 新增菜单
      addMenus() {
        if (this.footList.length < 3) {
          const id = uuid();
          this.currentId = id;
          this.footList.push({
            label: "新建菜单",
            type: "1",
            id,
            mediaType: 50,
            subMenus: [],
          });
          this.menusForm = this.footList[this.footList.length - 1];
          this.visible = true;
        }
      },
      deleteMenu(menu) {
        if (menu.parentId) {
          const parent = this.footList.find(
            (item) => item.id === menu.parentId
          );
          if (parent) {
            for (const index in parent.subMenus) {
              if (parent.subMenus[index].id === menu.id) {
                parent.subMenus.splice(index, 1);
                break;
              }
            }
          }
        } else {
          for (const index in this.footList) {
            if (this.footList[index].id === menu.id) {
              this.footList.splice(index, 1);
              break;
            }
          }
        }
        this.visible = false;
      },
      // 菜单点击
      menuClick(item, index) {
        if (this.currentId === item.id) {
          return;
        }
        this.visible = true;
        this.currentId = item.id;
        this.menusForm = item;
      },
      // 新增子菜单
      addSubMenus(item, index) {
        if (item.subMenus.length < 5) {
          const id = uuid();
          this.currentId = id;
          item.subMenus.push({
            label: "新建子菜单",
            type: "1",
            id,
            mediaType: 50,
            parentId: item.id,
          });
          this.menusForm = item.subMenus[item.subMenus.length - 1];
          this.visible = true;
        }
      },
      // 子菜单点击
      subMenuClick(list, idx) {
        if (this.currentId === list.id) {
          return;
        }
        this.visible = true;
        this.currentId = list.id;
        this.menusForm = list;
      },
      async saveData() {
        const genMenu = (menu) => {
          const data = {
            name: menu.label,
          };
          if (!menu.parentId && menu.subMenus.length) {
            return data;
          }
          if (menu.type) {
            data.type = this.getMenuType(menu.type, false);
          }
          if (menu.media_id) {
            data.media_id = menu.media_id;
          }
          if (menu.keyword) {
            data.key = menu.keyword;
          }
          if (menu.APPID) {
            data.appid = menu.APPID;
          }
          if (menu.path) {
            data.pagepath = menu.path;
          }
          if (menu.url) {
            data.url = menu.url;
          }
          return data;
        };
        const menuList = this.footList.map((menu) => {
          const newMenu = genMenu(menu);
          if (menu.subMenus.length) {
            newMenu.sub_button = menu.subMenus.map((item) => genMenu(item));
          }
          return newMenu;
        });
        await setMenus(menuList);
        this.$baseMessage("保存成功", "success");
        this.fetchData();
      },
      async handleSave() {
        if (!this.$refs["menusForm"]) {
          this.saveData();
          return;
        }
        if (this.menusForm.type === "4" && !this.menusForm.media_id) {
          this.$baseMessage("请选择微信素材", "error");
          return;
        }
        this.$refs["menusForm"].validate(async (valid) => {
          if (valid) {
            this.saveData();
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
              background: #fff;
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
</style>
