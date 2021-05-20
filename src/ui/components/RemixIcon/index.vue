<template>
  <img
    v-if="isExternal"
    :src="styleExternalIcon"
    class="img-icon"
    v-on="$listeners"
  />
  <svg v-else-if="isSvg" :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
  <i v-else :class="'ri-' + iconClass" aria-hidden="true" v-on="$listeners"></i>
</template>

<script>
  import "remixicon/fonts/remixicon.css";
  import { isExternal } from "@/utils/validate";

  export default {
    name: "VabRemixIcon",
    props: {
      isSvg: {
        type: Boolean,
        default: false,
      },
      iconClass: {
        type: String,
        required: true,
      },
      className: {
        type: String,
        default: "",
      },
    },
    computed: {
      isExternal() {
        return isExternal(this.iconClass);
      },
      iconName() {
        return `#remix-icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return "svg-icon " + this.className;
        } else {
          return "svg-icon";
        }
      },
      styleExternalIcon() {
        return this.iconClass;
      },
    },
  };
</script>

<style lang="scss" scoped>
  [class*="ri"] {
    font-size: 16px;
    vertical-align: middle;
  }

  .svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: middle;
    fill: currentColor;
  }

  .img-icon {
    display: inline-block;
    width: 2em;
    height: 2em;
    vertical-align: middle;
  }
</style>
