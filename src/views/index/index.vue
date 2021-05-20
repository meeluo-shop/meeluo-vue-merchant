<template>
  <div class="index-container">
    <el-row :gutter="20" style="margin: 0">
      <el-card class="chart1" shadow="hover">
        <div slot="header">
          <span>
            <vab-remix-icon icon-class="dashboard-3-line"></vab-remix-icon>
            基础数据统计
          </span>
        </div>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <flag
            color="blue"
            title="商品总量"
            desc="当前商品总数量"
            :count="String(baseCount.goods_count)"
            icon="shopping-bag-3-fill"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <flag
            color="red"
            title="用户数量"
            desc="当前用户总数量"
            :count="String(baseCount.user_count)"
            icon="user-3-fill"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <flag
            color="violet"
            title="商品订单总量"
            desc="当前已完成订单总数量"
            :count="String(baseCount.order_count + baseCount.menu_order_count)"
            icon="bill-fill"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <flag
            color="primary"
            title="获奖订单总量"
            desc="当前用户获奖订单总数量"
            :count="String(baseCount.winning_count)"
            icon="gift-fill"
          />
        </el-col>
      </el-card>
      <el-card class="chart2" shadow="hover">
        <div slot="header">
          <span>
            <vab-remix-icon icon-class="donut-chart-line"></vab-remix-icon>
            实时概况
          </span>
          <el-tag class="card-header-tag" type="warning">日</el-tag>
        </div>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <count
            title="今日销售额："
            :value="Number(todayAmount).toFixed(2)"
            :desc="`昨日：${yesterdayAmount.toFixed(2)}元`"
            icon="money-cny-circle-line"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <count
            title="今日新增用户数："
            :value="`${todayCount.user_count}`"
            :desc="`昨日：${yesterdayCount.user_count}人`"
            icon="user-line"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <count
            title="今日完成订单数："
            :value="`${todayCount.order_count + todayCount.menu_order_count}`"
            :desc="`昨日：${
              yesterdayCount.order_count + yesterdayCount.menu_order_count
            }单`"
            icon="bill-line"
          />
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
          <count
            title="今日获奖订单数："
            :value="`${todayCount.winning_count}`"
            :desc="`昨日：${yesterdayCount.winning_count}单`"
            icon="gift-line"
          />
        </el-col>
      </el-card>
      <el-col style="padding: 0" :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <chart1
          :x-data="saleVolumeChartData.xData"
          :y-data="saleVolumeChartData.yData"
        ></chart1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import Chart1 from "./components/Chart1";
  import Flag from "./components/Flag";
  import Count from "./components/Count";
  import { getBaseCount, getSalesVolume } from "@/api/statistics";

  const day = dayjs().startOf("date");

  export default {
    name: "Index",
    components: {
      Chart1,
      Flag,
      Count,
    },
    data() {
      return {
        saleVolumeChartData: {
          xData: [],
          yData: [],
        },
        todayAmount: 0,
        yesterdayAmount: 0,
        baseCount: {},
        todayCount: {},
        yesterdayCount: {},
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const today = dayjs().startOf("date");
        const yesterday = today.subtract(1, "day");
        const lastWeek = today.subtract(1, "week").subtract(1, "day");
        getBaseCount().then((data) => {
          this.baseCount = data ? data.data : {};
        });
        getBaseCount({
          start_time: today.valueOf(),
        }).then((data) => {
          this.todayCount = data ? data.data : {};
        });
        getBaseCount({
          start_time: yesterday.valueOf(),
          end_time: today.valueOf(),
        }).then((data) => {
          this.yesterdayCount = data ? data.data : {};
        });
        getSalesVolume({
          start_time: lastWeek.valueOf(),
        }).then((data) => {
          this.todayAmount = 0;
          this.yesterdayAmount = 0;
          const resp = data ? data.data : {};
          for (const index in resp) {
            const volumes = resp[index];
            for (const item of volumes) {
              if (item && item.days === today.format("YYYY-MM-DD")) {
                this.todayAmount += Number(item.sum || 0);
              }
              if (item && item.days === yesterday.format("YYYY-MM-DD")) {
                this.yesterdayAmount += Number(item.sum || 0);
              }
            }
          }
          const chartKeys = {
            order_sales_volume: "商品交易额",
            menu_order_sales_volume: "点餐交易额",
            game_order_sales_volume: "游戏交易额",
          };
          this.saleVolumeChartData.xData = [
            day.subtract(7, "day").format("YYYY-MM-DD"),
            day.subtract(6, "day").format("YYYY-MM-DD"),
            day.subtract(5, "day").format("YYYY-MM-DD"),
            day.subtract(4, "day").format("YYYY-MM-DD"),
            day.subtract(3, "day").format("YYYY-MM-DD"),
            day.subtract(2, "day").format("YYYY-MM-DD"),
            day.subtract(1, "day").format("YYYY-MM-DD"),
          ];
          for (const index in resp) {
            const volumes = resp[index];
            const temp = {
              name: chartKeys[index],
              data: [],
            };
            for (const day of this.saleVolumeChartData.xData) {
              const target = volumes.find((val) => val.days === day);
              if (target) {
                temp.data.push(target.sum);
              } else {
                temp.data.push(0);
              }
            }
            this.saleVolumeChartData.yData.push(temp);
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .chart1,
      .chart2,
      .version-information {
        min-height: 268px;
      }

      .el-card {
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-padding;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          .echarts {
            width: 100%;
            height: 360px;
          }
        }
      }

      .bottom {
        padding-top: 20px;
        margin-top: 20px;
        color: #595959;
        text-align: left;
        border-top: 1px solid $base-border-color;
      }
    }
  }
</style>
