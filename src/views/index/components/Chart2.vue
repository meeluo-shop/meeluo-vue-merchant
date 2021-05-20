<template>
  <el-card class="chart2" shadow="hover">
    <div slot="header">
      <span>
        <vab-remix-icon icon-class="line-chart-line"></vab-remix-icon>
        授权数
      </span>
      <el-tag class="card-header-tag" type="warning">周</el-tag>
    </div>
    <vab-chart
      :autoresize="true"
      :options="options"
      theme="vab-echarts-theme"
    />
    <div class="bottom">
      <span>
        授权数:

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
    data() {
      return {
        timer: 0,
        countConfig: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        //授权数
        options: {
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              /*boundaryGap: false,*/
              data: ["0时", "4时", "8时", "12时", "16时", "20时", "24时"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "授权数",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },
      };
    },
  };
</script>
