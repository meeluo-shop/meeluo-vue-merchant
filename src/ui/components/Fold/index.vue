<template>
  <vab-remix-icon
    :icon-class="collapse ? 'menu-unfold-line' : 'menu-fold-line'"
    class="fold-unfold"
    @click="toggleCollapse"
  ></vab-remix-icon>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "Fold",
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        collapse: "settings/collapse",
      }),
    },
    methods: {
      ...mapActions({
        toggleCollapse: "settings/toggleCollapse",
      }),
    },
  };
</script>
<style lang="scss" scoped>
  .fold-unfold {
    color: $base-color-gray;
    cursor: pointer;
  }
</style>
