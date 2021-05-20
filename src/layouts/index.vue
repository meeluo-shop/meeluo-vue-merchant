<template>
  <div :class="classObj" class="meeluo-wrapper">
    <!-- 纵向布局 -->
    <div
      if="'vertical' === layout"
      :class="{
        fixed: header === 'fixed',
        'no-tags-bar': !showTagsBar,
      }"
      class="layout-container-vertical"
    >
      <div
        v-if="device === 'mobile' && !collapse"
        class="mask"
        @click="handleFoldSideBar"
      ></div>
      <side-bar></side-bar>
      <div :class="collapse ? 'is-collapse-main' : ''" class="vab-main">
        <div
          :class="header === 'fixed' ? 'fixed-header' : ''"
          class="layout-header"
        >
          <nav-bar></nav-bar>
          <tags-bar v-if="showTagsBar" />
        </div>
        <app-main></app-main>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { tokenName } from "@/config/settings";

  export default {
    name: "Layout",
    data() {
      return {
        oldLayout: "",
        width: 0,
      };
    },
    computed: {
      ...mapGetters({
        layout: "settings/layout",
        showTagsBar: "settings/showTagsBar",
        collapse: "settings/collapse",
        header: "settings/header",
        device: "settings/device",
      }),
      classObj() {
        return {
          mobile: this.device === "mobile",
        };
      },
    },
    beforeMount() {
      window.addEventListener("resize", this.handleLayouts);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleLayouts);
    },
    mounted() {
      this.oldLayout = this.layout;
      this.handleLayouts();

      this.$nextTick(() => {
        window.addEventListener(
          "storage",
          (e) => {
            if (e.key === tokenName || e.key === null) window.location.reload();
            if (e.key === tokenName && e.value === null)
              window.location.reload();
          },
          false
        );
      });
    },
    methods: {
      ...mapActions({
        handleOpenSideBar: "settings/openSideBar",
        handleFoldSideBar: "settings/foldSideBar",
        handleChangeLayout: "settings/changeLayout",
        handleToggleDevice: "settings/toggleDevice",
      }),
      handleLayouts() {
        const width = document.body.getBoundingClientRect().width;
        if (this.width !== width) {
          const isMobile = width - 1 < 992;
          this.handleChangeLayout(isMobile ? "vertical" : this.oldLayout);
          this.handleToggleDevice(isMobile ? "mobile" : "desktop");
          this.width = width;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 2;
    width: 100%;
    overflow: hidden;
    transition: $base-transition;
  }

  .meeluo-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .layout-header {
      box-shadow: $base-box-shadow;
    }

    .layout-container-horizontal,
    .layout-container-common {
      position: relative;

      &.fixed {
        padding-top: calc(#{$base-top-bar-height} + #{$base-tags-bar-height});
      }

      &.fixed.no-tags-bar {
        padding-top: $base-top-bar-height;
      }

      ::v-deep {
        .vab-main {
          width: 88%;
          margin: auto;
        }

        .fixed-header {
          @include fix-header;
        }

        .tag-bar-horizontal {
          background: $base-color-white;
          box-shadow: $base-box-shadow;
        }

        .nav-bar-container {
          .fold-unfold {
            display: none;
          }
        }

        .main-padding {
          .app-main-container {
            margin-top: $base-padding;
            margin-bottom: $base-padding;
            background: $base-color-white;
          }
        }
      }
    }

    .layout-container-common {
      ::v-deep {
        .top-bar-container {
          .vab-main {
            width: 100%;
            margin: auto $base-padding;
          }
        }
      }
    }

    .layout-container-vertical,
    .layout-container-common {
      position: relative;

      .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: #000;
        opacity: 0.5;
      }

      &.fixed {
        padding-top: calc(#{$base-nav-bar-height} + #{$base-tags-bar-height});
      }

      &.fixed.no-tags-bar {
        padding-top: $base-nav-bar-height;
      }

      .vab-main {
        position: relative;
        width: auto;
        min-height: 100%;
        margin-left: $base-left-menu-width;
        background: #f6f8f9;
        transition: $base-transition;

        ::v-deep {
          .fixed-header {
            @include fix-header;

            left: $base-left-menu-width;
            width: $base-right-content-width;
          }

          .nav-bar-container {
            position: relative;
            box-sizing: border-box;
          }

          .tags-bar-container {
            box-sizing: border-box;
          }

          .app-main-container {
            width: calc(100% - #{$base-padding} - #{$base-padding});
            margin: $base-padding auto;
            background: $base-color-white;
            border-radius: $base-border-radius;
          }
        }

        &.is-collapse-main {
          margin-left: $base-left-menu-width-min;

          ::v-deep {
            .fixed-header {
              left: $base-left-menu-width-min;
              width: calc(100% - 65px);
            }
          }
        }
      }
    }

    /* 手机端开始 */
    &.mobile {
      ::v-deep {
        .el-pager,
        .el-pagination__jump {
          display: none;
        }

        .layout-container-vertical {
          .el-scrollbar.side-bar-container.is-collapse {
            width: 0;
          }

          .vab-main {
            width: 100%;
            margin-left: 0;
          }
        }

        .vab-main {
          .fixed-header {
            left: 0 !important;
            width: 100% !important;
          }
        }
      }
    }

    /* 手机端结束 */
  }
</style>
