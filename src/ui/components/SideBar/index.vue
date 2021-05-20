<template>
  <el-scrollbar
    :class="{ 'is-collapse': collapse, 'side-bar-common': layout === 'common' }"
    class="side-bar-container"
  >
    <logo v-if="layout === 'vertical'"></logo>
    <el-menu
      :active-text-color="variables['menu-color-active']"
      :background-color="variables['menu-background']"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpens"
      :text-color="variables['menu-color']"
      :unique-opened="uniqueOpened"
      menu-trigger="click"
      mode="vertical"
    >
      <side-bar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
      ></side-bar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import variables from "@/config/variables.scss";
  import { mapGetters } from "vuex";
  import { defaultOpeneds, uniqueOpened } from "@/config/settings";

  export default {
    name: "SideBar",
    props: {
      layout: {
        type: String,
        default: "vertical",
      },
    },
    data() {
      return {
        uniqueOpened,
        variables: variables,
      };
    },
    computed: {
      ...mapGetters({
        collapse: "settings/collapse",
        routes: "routes/routes",
      }),
      defaultOpens() {
        return defaultOpeneds;
      },
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }

    &.is-active {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }
  }

  .side-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-menu-background;
    box-shadow: $base-box-shadow;
    transition: width $base-transition-time;

    &.side-bar-common {
      top: $base-top-bar-height;
      height: calc(100vh - #{$base-top-bar-height});
    }

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      ::v-deep {
        .el-menu--collapse.el-menu {
          > .el-menu-item,
          > .el-submenu {
            text-align: center;
            transition: width $base-transition-time;

            .vab-fas-icon {
              padding-right: 0;
            }

            .vab-remix-icon {
              padding-right: 0;
            }
          }
        }

        .el-menu-item,
        .el-submenu {
          text-align: left;
        }

        .el-menu--collapse {
          border-right: 0;

          .el-submenu__icon-arrow {
            right: 10px;
            margin-top: -3px;
          }
        }
      }
    }

    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
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
      }

      .el-menu-item,
      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;

        span {
          padding-left: 3px;
        }

        i {
          color: inherit;
        }
      }

      .el-menu-item {
        @include active;
      }
    }
  }
</style>
