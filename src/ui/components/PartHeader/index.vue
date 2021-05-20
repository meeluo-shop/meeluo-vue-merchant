<template>
  <div class="part-header">
    <h2 class="title-text"><slot name="title"></slot></h2>
    <div class="rigth-content"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "PartHeader",
    props: {},
  };
</script>

<style lang="scss" scoped>
  .part-header {
    .title-text {
      display: inline-block;
      font-size: 16px;
      vertical-align: middle;
      width: 50%;

      &::before {
        display: inline-block;
        width: 4px;
        height: 18px;
        margin-right: 8px;
        vertical-align: middle;
        content: "";
        background-color: #1a90ff;
      }
    }
    .rigth-content {
      width: 50%;
      display: inline-block;
      text-align: right;
    }
  }
</style>
