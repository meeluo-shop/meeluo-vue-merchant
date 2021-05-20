<template>
  <vab-remix-icon
    v-if="showRefresh"
    icon-class="refresh-line"
    @click="refreshRoute"
  ></vab-remix-icon>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Refresh",
    computed: {
      ...mapGetters({
        showRefresh: "settings/showRefresh",
      }),
    },
    methods: {
      async refreshRoute() {
        this.$baseEventBus.$emit("reloadRouterView");
      },
    },
  };
</script>
