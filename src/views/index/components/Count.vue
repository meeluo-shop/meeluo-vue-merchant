<template>
  <div class="count-box">
    <div class="card-left">
      <vab-remix-icon :icon-class="icon" class="card-icon"></vab-remix-icon>
    </div>
    <div class="card-right">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ value }}</div>
      <div class="card-description">{{ desc }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      value: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="scss" scoped>
  .count-box {
    height: 160px;
    display: flex;
    align-items: center;
    .card-left {
      .card-icon {
        background: #cce7ff;
        font-size: 52px;
        color: #fff;
        padding: 12px;
        border-radius: 100%;
      }
    }
    .card-right {
      padding-left: 24px;

      .card-title {
        font-size: 14px;
      }

      .card-value {
        padding: 20px 0px;
        font-size: 26px;
      }

      .card-description {
        font-size: 13px;
        color: rgb(153, 153, 153);
      }
    }
  }
</style>
