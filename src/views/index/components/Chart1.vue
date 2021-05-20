<template>
  <el-card class="chart1" shadow="hover">
    <div slot="header">
      <span>
        <vab-remix-icon icon-class="line-chart-line"></vab-remix-icon>
        近七日交易走势
      </span>
      <el-tag class="card-header-tag" type="success">周</el-tag>
    </div>
    <vab-chart
      :autoresize="true"
      :options="options"
      theme="vab-echarts-theme"
    />
    <div class="bottom">
      <span>
        本周交易总额:

        <vab-count
          :decimals="countConfig.decimals"
          :duration="countConfig.duration"
          :end-val="countConfig.endVal"
          :prefix="countConfig.prefix"
          :separator="countConfig.separator"
          :start-val="countConfig.startVal"
          :suffix="countConfig.suffix"
        />
      </span>
    </div>
  </el-card>
</template>
<script>
  import VabChart from "@/extra/vabCharts";
  import VabCount from "@/extra/vabCount";

  export default {
    components: {
      VabChart,
      VabCount,
    },
    props: {
      xData: {
        type: Array,
        default: () => [],
      },
      yData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        merchant: this.$store.getters["passport/merchant"],
        countConfig: {
          startVal: 0,
          endVal: 0,
          decimals: 2,
          prefix: "¥ ",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        //访问量
        options: {
          grid: {
            top: "12%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["商品交易额", "点餐交易额", "游戏交易额"],
          },
          toolbox: {
            show: true,
            feature: {
              // mark: { show: true },
              // dataView: {show: true, readOnly: false},
              magicType: { show: true, type: ["line", "bar"] },
              // restore: { show: true },
              // saveAsImage: {show: true}
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "商品交易额",
              type: "line",
              data: [],
              smooth: true,
              areaStyle: {},
            },
            {
              name: "游戏交易额",
              type: "line",
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
      };
    },
    watch: {
      xData(val) {
        this.options.xAxis.data = val;
      },
      yData(val) {
        if (
          this.merchant.type === 20 &&
          !this.options.series.find((item) => item.name === "点餐交易额")
        ) {
          this.options.series.push({
            name: "点餐交易额",
            type: "line",
            data: [],
            smooth: true,
            areaStyle: {},
          });
        }
        let count = 0;
        for (const item of val) {
          const target = this.options.series.find(
            (ser) => ser.name === item.name
          );
          if (target) {
            target.data = item.data;
          }
          for (const num of item.data) {
            count += Number(num) || 0;
          }
        }
        console.log(this.options);
        this.countConfig.endVal = Number(count.toFixed(2));
      },
    },
    beforeDestroy() {},
    mounted() {},
  };
</script>
