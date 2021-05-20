<template>
  <el-submenu
    ref="subMenu"
    :index="item.fullPath"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <vab-remix-icon
        v-if="item.meta && item.meta.remixIcon"
        :icon-class="item.meta.remixIcon"
        class="vab-remix-icon"
      />
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
  export default {
    name: "Submenu",
    props: {
      item: {
        type: Object,
        default() {
          return null;
        },
      },
    },
    methods: {},
  };
</script>
