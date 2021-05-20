<template>
  <el-scrollbar
    :class="{ 'is-collapse': collapse }"
    class="gallery-bar-container"
  >
    <logo></logo>
    <el-tabs
      v-model="firstMenu"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in handleRoutes"
        :key="item.path"
        :name="item.path"
      >
        <div slot="label" class="gallery-grid">
          <vab-remix-icon
            v-if="item.meta.remixIcon"
            :icon-class="item.meta.remixIcon"
            class="vab-remix-icon"
          />
          {{ item.meta.title }}
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-menu
      :background-color="variables['gallery-second-menu-background']"
      :default-active="activeMenu"
      :default-openeds="defaultOpens"
      :unique-opened="uniqueOpened"
      mode="vertical"
    >
      <side-bar-item
        v-for="route in partialRoutes"
        :key="route.fullPath"
        :item="route"
      ></side-bar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import { handleFirstMenu } from "@/utils/routes";
  import variables from "@/config/variables.scss";
  import { mapGetters } from "vuex";
  import {
    defaultOpeneds,
    openFirstMenu,
    uniqueOpened,
  } from "@/config/settings";

  export default {
    name: "GalleryBar",
    data() {
      return {
        uniqueOpened,
        firstMenu: "",
        defaultOpens: defaultOpeneds,
        variables: variables,
      };
    },
    computed: {
      ...mapGetters({
        collapse: "settings/collapse",
        routes: "routes/routes",
        partialRoutes: "routes/partialRoutes",
      }),
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
      handleRoutes() {
        return this.routes.filter((item) => item.hidden !== true && item.meta);
      },
    },
    watch: {
      $route: {
        handler() {
          const firstMenu = handleFirstMenu();
          if (this.firstMenu !== firstMenu) {
            this.firstMenu = firstMenu;
            this.handleTabClick({ name: firstMenu }, true);
          }
        },
        immediate: true,
      },
    },
    methods: {
      handleTabClick(tab, mounted) {
        const childrenArr = this.routes.find((item) => item.path === tab.name)
          .children;
        this.$store.dispatch("routes/setPartialRoutes", childrenArr);
        if (mounted !== true && openFirstMenu) {
          this.$router.push(childrenArr[0].fullPath);
        }
        this.$store.dispatch("settings/openSideBar");
      },
    },
  };
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-blue;
      background-color: $base-gallery-second-menu-background-active !important;

      i {
        color: $base-color-blue;
      }
    }

    &.is-active {
      color: $base-color-blue;
      background-color: $base-gallery-second-menu-background-active !important;
    }
  }

  .gallery-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-gallery-second-menu-background;
    box-shadow: $base-box-shadow;
    transition: width $base-transition-time;

    .gallery-grid {
      width: $base-left-menu-width-min;
      height: $base-left-menu-width-min;
      padding-top: calc((#{$base-left-menu-width-min} - 55px) / 2);
      text-align: center;

      svg {
        display: block;
        height: 20px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: -7px;
      }

      [class*="ri-"] {
        display: block;
        height: 20px;
        margin: auto;
      }
    }

    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-tabs {
        position: fixed;
        width: $base-left-menu-width-min;

        .el-tabs__nav {
          height: calc(100vh - #{$base-logo-height});
          background: $base-gallery-first-menu-background;
        }

        .el-tabs__item {
          height: auto;
          padding: 0;
          line-height: auto;
          color: $base-color-white;

          &.is-active {
            background: $base-color-blue;
          }
        }
      }

      .el-tabs__active-bar.is-left,
      .el-tabs--left .el-tabs__nav-wrap.is-left::after {
        display: none;
      }

      .el-tabs + .el-menu {
        left: $base-left-menu-width-min;
        display: fixed;
        width: calc(#{$base-left-menu-width} - #{$base-left-menu-width-min});
        border: 0;
      }

      .el-menu {
        border: 0;

        .vab-fas-icon {
          padding-right: 3px;
          font-size: $base-font-size-default;
        }

        .vab-remix-icon {
          padding-right: 3px;
          font-size: $base-font-size-default + 2;
        }

        .el-menu-item,
        .el-submenu__title {
          height: $base-menu-item-height;
          overflow: hidden;
          line-height: $base-menu-item-height;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;

          @include active;
        }
      }
    }

    &.is-collapse {
      ::v-deep {
        width: 0;
      }
    }
  }
</style>
