<template>
  <vab-remix-icon
    v-if="showFullScreen"
    :icon-class="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
    @click="click"
  ></vab-remix-icon>
</template>

<script>
  import { mapGetters } from "vuex";
  import screenfull from "screenfull";

  export default {
    name: "FullScreen",
    data() {
      return {
        isFullscreen: false,
      };
    },
    computed: {
      ...mapGetters({
        showFullScreen: "settings/showFullScreen",
      }),
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.destroy();
    },
    methods: {
      click() {
        if (!screenfull.isEnabled) {
          this.$baseMessage("开启全屏失败", "error");
          return false;
        }
        screenfull.toggle();
        this.$emit("refresh");
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen;
      },
      init() {
        if (screenfull.isEnabled) {
          screenfull.on("change", this.change);
        }
      },
      destroy() {
        if (screenfull.isEnabled) {
          screenfull.off("change", this.change);
        }
      },
    },
  };
</script>
