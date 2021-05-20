<template>
  <el-row :gutter="0" class="vab-query-form">
    <slot></slot>
  </el-row>
</template>

<script>
  export default {
    name: "VabQueryForm",
  };
</script>

<style lang="scss" scoped>
  @mixin panel {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    min-height: $base-input-height;
    margin: 0 0 $base-padding/2 0;
    > .el-button {
      margin: 0 5px $base-padding/2 5px !important;
    }
  }

  .vab-query-form {
    ::v-deep {
      .el-form-item {
        margin: 0 5px $base-padding/2 5px !important;
      }

      .top-panel {
        @include panel;
      }

      .bottom-panel {
        @include panel;
        border-top: 1px solid #dcdfe6;
      }

      .left-panel {
        @include panel;
      }

      .right-panel {
        @include panel;

        justify-content: flex-end;
      }
    }
  }
</style>
