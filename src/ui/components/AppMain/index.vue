<template>
  <div v-if="routerView" class="app-main-container">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
        <router-view :key="$route.path" class="app-main-height"></router-view>
      </keep-alive>
    </transition>
    <footer class="footer-copyright">
      Copyright
      <vab-remix-icon icon-class="copyright-line"></vab-remix-icon>
      <!-- {{ title }} {{ fullYear }} by {{ copyright }} -->
      {{ copyright }}
    </footer>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { copyright, keepAliveMaxNum, title } from "@/config/settings";

  export default {
    name: "AppMain",
    data() {
      return {
        show: false,
        fullYear: new Date().getFullYear(),
        copyright,
        title,
        keepAliveMaxNum,
        routerView: true,
      };
    },
    computed: {
      ...mapGetters({
        visitedRoutes: "tagsBar/visitedRoutes",
        device: "settings/device",
      }),
      cachedRoutes() {
        return this.visitedRoutes
          .filter((item) => !item.meta.noKeepAlive)
          .flatMap((item) => item.matched);
      },
    },
    watch: {
      $route: {
        handler(route) {
          if ("mobile" === this.device) {
            this.$store.dispatch("settings/foldSideBar");
          }
        },
        immediate: true,
      },
    },
    created() {
      //重载所有路由
      this.$baseEventBus.$on("reloadRouterView", () => {
        this.routerView = false;
        this.$nextTick(() => {
          this.routerView = true;
        });
      });
    },
  };
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    width: 100%;
    overflow: hidden;

    .app-main-height {
      min-height: $base-app-main-height;
    }

    .footer-copyright {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 55px;
      padding: 0 $base-padding 0 $base-padding;
      color: rgba(0, 0, 0, 0.45);
      border-top: 1px dashed $base-border-color;

      i {
        margin: 0 5px;
      }
    }
  }
</style>
