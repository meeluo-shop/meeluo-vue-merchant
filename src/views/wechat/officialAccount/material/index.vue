<template>
  <keep-alive :include="cachedRoutes">
    <router-view :key="$route.path" />
  </keep-alive>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    name: "OfficialAccountMaterial",
    computed: {
      ...mapGetters({
        visitedRoutes: "tagsBar/visitedRoutes",
      }),
      cachedRoutes() {
        return this.visitedRoutes
          .filter((item) => !item.meta.noKeepAlive)
          .flatMap((item) => item.matched);
      },
    },
  };
</script>
