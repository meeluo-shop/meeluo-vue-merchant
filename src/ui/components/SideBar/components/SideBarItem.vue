<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <side-bar-item
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></side-bar-item>
    </template>
  </component>
</template>

<script>
  export default {
    name: "SideBarItem",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        routeChildren: {},
        menuComponent: "",
      };
    },
    created() {
      const showChildren = this.handleChildren(this.item.children);
      if (showChildren.length === 0) {
        this.menuComponent = "MenuItem";
        this.routeChildren = this.item;
      } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
        this.menuComponent = "MenuItem";
        this.routeChildren = showChildren[0];
      } else {
        this.menuComponent = "Submenu";
      }
    },
    methods: {
      handleChildren(children = []) {
        if (children === null) return [];
        return children.filter((item) => {
          return item.hidden !== true;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .vab-nav-icon {
    margin-right: 4px;
  }

  ::v-deep {
    .el-tag {
      float: right;
      height: 16px;
      padding-right: 4px;
      padding-left: 4px;
      margin-top: calc((#{$base-menu-item-height} - 16px) / 2);
      line-height: 16px;
      border: 0;
    }
  }
</style>
