<template>
  <div v-if="isShow" :class="`edit-tag ${border ? 'tag-border' : ''}`">
    <div class="tag-text" v-html="label"></div>
    <i :class="`icon ${icon}`" @click="close"></i>
  </div>
</template>

<script>
  export default {
    name: "EditTag",
    props: {
      border: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: "",
      },
      icon: {
        type: String,
        default: "el-icon-error",
      },
    },
    data() {
      return {
        isShow: true,
      };
    },
    methods: {
      close() {
        // this.isShow = false;
        this.$emit("on-delete");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .edit-tag {
    display: inline-block;
    padding: 0 15px;
    margin-right: 6px;
    margin-bottom: 6px;
    line-height: 30px;
    .tag-text {
      display: inline-block;
    }
    .icon {
      display: inline-block;
      cursor: pointer;
      visibility: hidden;
    }
    &.tag-border {
      position: relative;
      border: #ddd solid 1px;
      border-radius: 2px;
      .icon {
        position: absolute;
        top: -6px;
        right: -4px;
      }
    }
    &:hover {
      .icon {
        visibility: visible;
      }
    }
  }
</style>
