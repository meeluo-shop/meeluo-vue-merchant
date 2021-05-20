<template>
  <div :class="`widget-card card__${color}`">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <div class="card-value">{{ count }}</div>
      <div class="card-description">{{ desc }}</div>
      <vab-remix-icon :icon-class="icon" class="card-icon"></vab-remix-icon>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      color: {
        type: String,
        default: "blue",
      },
      icon: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      count: {
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
  .widget-head {
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: none;
  }
  .widget-body {
    padding: 0;
  }
  .widget-outline {
    flex-basis: 50%;
    height: 117px;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .widget-outline .outline-left {
    margin-right: 30px;
  }
  .widget-outline .outline-left img {
    width: 58px;
    height: 58px;
  }
  .widget-outline .outline-right {
    flex-basis: 50%;
  }
  .widget-echarts {
    height: 400px;
    width: 100%;
  }
  .widget-card {
    min-height: 174px;
    color: #ffffff;
    padding: 12px 17px 12px 22px;
    margin-bottom: 20px;
    position: relative;
  }
  .widget-card.card__blue {
    background: linear-gradient(-125deg, #57bdbf, #2f9de2);
  }
  .widget-card.card__red {
    background: linear-gradient(-125deg, #ff7d7d, #fb2c95);
  }
  .widget-card.card__violet {
    background: linear-gradient(-113deg, #c543d8, #925cc3);
  }
  .widget-card.card__primary {
    background: linear-gradient(-141deg, #ecca1b, #f39526);
  }
  .widget-card .card-header {
    position: relative;
    display: block;
    padding-top: 16px;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .widget-card .card-icon {
    position: absolute;
    right: 30px;
    top: 28px;
    font-size: 92px;
    color: rgba(255, 255, 255, 0.12);
  }
  .widget-card .card-description {
    position: relative;
    display: block;
    font-size: 13px;
    line-height: 30px;
    padding-top: 8px;
    color: rgba(255, 255, 255, 0.88);
  }
  .widget-card .card-value {
    position: relative;
    display: block;
    color: #fff;
    font-size: 38px;
    line-height: 46px;
    margin-bottom: 8px;
  }
</style>
