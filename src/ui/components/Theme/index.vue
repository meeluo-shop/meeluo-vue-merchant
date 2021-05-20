<template>
  <span v-if="showTheme">
    <vab-remix-icon
      icon-class="brush-2-line"
      @click="handleOpenTheme"
    ></vab-remix-icon>
    <!-- <div class="theme-setting">
      <div @click="handleOpenTheme">
        <vab-remix-icon icon-class="brush-2-line"></vab-remix-icon>
        <p>主题配置</p>
      </div>
    </div> -->

    <el-drawer
      title="主题配置"
      :visible.sync="drawerVisible"
      append-to-body
      direction="rtl"
      size="560px"
    >
      <el-scrollbar class="theme-scrollbar">
        <div class="el-drawer__body">
          <el-form ref="form" :model="theme" label-width="auto">
            <el-form-item label="头部">
              <el-radio-group
                v-model="theme.header"
                :disabled="theme.layout === 'common'"
              >
                <el-radio-button label="fixed">固定</el-radio-button>
                <el-radio-button label="noFixed">不固定</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="多标签">
              <el-radio-group v-model="theme.showTagsBar">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="进度条">
              <el-radio-group v-model="theme.showProgressBar">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="刷新">
              <el-radio-group v-model="theme.showRefresh">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="搜索">
              <el-radio-group v-model="theme.showSearch">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通知">
              <el-radio-group v-model="theme.showNotice">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="全屏">
              <el-radio-group v-model="theme.showFullScreen">
                <el-radio-button :label="true">显示</el-radio-button>
                <el-radio-button :label="false">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="setDefaultTheme">恢复默认</el-button>
              <el-button type="primary" @click="saveTheme">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </el-drawer>
  </span>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    header as defaultHeader,
    layout as defaultLayout,
    showFullScreen as defaultShowFullScreen,
    showNotice as defaultShowNotice,
    showProgressBar as defaultShowProgressBar,
    showRefresh as defaultShowRefresh,
    showSearch as defaultShowSearch,
    showTagsBar as defaultShowTagsBar,
  } from "@/config/settings";

  export default {
    name: "Theme",
    data() {
      return {
        drawerVisible: false,
        theme: {
          themeName: "",
          layout: "",
          header: "",
          showProgressBar: "",
          showRefresh: "",
          showSearch: "",
          showTagsBar: "",
          showNotice: "",
          showFullScreen: "",
        },
      };
    },
    computed: {
      ...mapGetters({
        themeName: "settings/themeName",
        layout: "settings/layout",
        header: "settings/header",
        showProgressBar: "settings/showProgressBar",
        showRefresh: "settings/showRefresh",
        showSearch: "settings/showSearch",
        showTagsBar: "settings/showTagsBar",
        showNotice: "settings/showNotice",
        showFullScreen: "settings/showFullScreen",
        showTheme: "settings/showTheme",
      }),
    },
    created() {
      this.$baseEventBus.$on("theme", () => {
        this.handleOpenTheme();
      });
      const theme = localStorage.getItem("theme");
      if (null !== theme) {
        this.theme = JSON.parse(theme);
        this.saveTheme();
      } else {
        this.handleSetData();
      }
    },
    methods: {
      ...mapActions({
        changeHeader: "settings/changeHeader",
        changeLayout: "settings/changeLayout",
        handleShowProgressBar: "settings/handleShowProgressBar",
        handleShowRefresh: "settings/handleShowRefresh",
        handleShowSearch: "settings/handleShowSearch",
        handleShowTagsBar: "settings/handleShowTagsBar",
        handleShowNotice: "settings/handleShowNotice",
        handleShowFullScreen: "settings/handleShowFullScreen",
      }),
      handleSetData() {
        this.theme.themeName = this.themeName;
        this.theme.layout = this.layout;
        this.theme.header = this.header;
        this.theme.showProgressBar = this.showProgressBar;
        this.theme.showRefresh = this.showRefresh;
        this.theme.showSearch = this.showSearch;
        this.theme.showTagsBar = this.showTagsBar;
        this.theme.showNotice = this.showNotice;
        this.theme.showFullScreen = this.showFullScreen;
        document.getElementsByTagName(
          "body"
        )[0].className = `theme-${this.themeName}`;
      },
      handleOpenTheme() {
        this.drawerVisible = true;
      },
      saveTheme() {
        let {
          themeName,
          layout,
          header,
          showProgressBar,
          showRefresh,
          showSearch,
          showTagsBar,
          showNotice,
          showFullScreen,
        } = this.theme;
        localStorage.setItem(
          "theme",
          `{
              "themeName":"${themeName}",
              "layout":"${layout}",
              "header":"${header}",
              "showProgressBar":${showProgressBar},
              "showRefresh":${showRefresh},
              "showSearch":${showSearch},
              "showTagsBar":${showTagsBar},
              "showNotice":${showNotice},
              "showFullScreen":${showFullScreen}
            }`
        );
        document.getElementsByTagName(
          "body"
        )[0].className = `theme-${themeName}`;

        if (document.body.getBoundingClientRect().width >= 992) {
          this.changeLayout(layout);
        }
        this.changeHeader(header);
        this.handleShowProgressBar(showProgressBar);
        this.handleShowRefresh(showRefresh);
        this.handleShowSearch(showSearch);
        this.handleShowTagsBar(showTagsBar);
        this.handleShowNotice(showNotice);
        this.handleShowFullScreen(showFullScreen);
        this.drawerVisible = false;
      },
      setDefaultTheme() {
        let { themeName } = this.theme;
        document
          .getElementsByTagName("body")[0]
          .classList.remove(`theme-${themeName}`);
        localStorage.removeItem("theme");
        this.$refs["form"].resetFields();
        Object.assign(this.$data, this.$options.data());
        this.changeLayout(defaultLayout);
        this.changeHeader(defaultHeader);
        this.handleShowProgressBar(defaultShowProgressBar);
        this.handleShowRefresh(defaultShowRefresh);
        this.handleShowSearch(defaultShowSearch);
        this.handleShowTagsBar(defaultShowTagsBar);
        this.handleShowNotice(defaultShowNotice);
        this.handleShowFullScreen(defaultShowFullScreen);
        this.handleSetData();
        this.drawerVisible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @mixin right-bar {
    position: fixed;
    right: 0;
    z-index: $base-z-index;
    width: 60px;
    min-height: 60px;
    text-align: center;
    cursor: pointer;
    background: $base-color-blue;
    border-radius: $base-border-radius;

    > div {
      padding-top: 10px;
      border-bottom: 0 !important;

      &:hover {
        opacity: 0.9;
      }

      & + div {
        border-top: 1px solid $base-color-white;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: $base-font-size-small;
        line-height: 30px;
        color: $base-color-white;
      }
    }
  }

  .theme-scrollbar {
    height: calc(100vh - 80px);
    overflow: hidden;
  }

  .theme-setting {
    @include right-bar;

    top: calc((100vh - 110px) / 2);

    ::v-deep {
      [class*="ri-"] {
        display: block !important;
        margin-right: auto !important;
        margin-left: auto !important;
        color: $base-color-white !important;
        fill: $base-color-white !important;
      }
    }
  }

  .el-drawer__body {
    padding: 0 20px 20px 20px;
  }
</style>
<style lang="scss">
  .el-drawer__wrapper {
    outline: none !important;

    * {
      outline: none !important;
    }
  }

  .vab-color-picker {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
</style>
