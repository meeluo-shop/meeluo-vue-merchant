<template>
  <el-menu-item :index="routeChildren.fullPath" @click="handleLink">
    <vab-remix-icon
      v-if="routeChildren.meta && routeChildren.meta.remixIcon"
      :icon-class="routeChildren.meta.remixIcon"
      class="vab-remix-icon"
    />
    <span>{{ routeChildren.meta.title }}</span>
    <el-tag
      v-if="routeChildren.meta && routeChildren.meta.badge"
      effect="dark"
      type="danger"
    >
      {{ routeChildren.meta.badge }}
    </el-tag>
  </el-menu-item>
</template>

<script>
  import { isExternal } from "@/utils/validate";

  export default {
    name: "MenuItem",
    props: {
      routeChildren: {
        type: Object,
        default() {
          return null;
        },
      },
    },
    methods: {
      handleLink() {
        let routePath = this.routeChildren.fullPath;
        const target = this.routeChildren.meta.target;
        if (this.$baseLodash.isObject(this.routeChildren.query)) {
          let query = "";
          for (const key in this.routeChildren.query) {
            if (!query) {
              query += "?";
            } else {
              query += "&";
            }
            query += `${key}=${this.routeChildren.query[key]}`;
          }
          routePath += query;
        }
        if (target === "_blank") {
          if (isExternal(routePath)) {
            window.open(routePath);
          } else if (this.$route.path !== routePath) {
            window.open(routePath.href);
          }
        } else {
          if (isExternal(routePath)) {
            window.location.href = routePath;
          } else if (this.$route.path !== routePath) {
            this.$router.push(routePath);
          }
        }
      },
    },
  };
</script>
