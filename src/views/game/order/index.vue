<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="queryForm.pay_type" placeholder="支付方式">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="未支付" :value="0"></el-option>
              <el-option label="微信支付" :value="10"></el-option>
              <el-option label="余额支付" :value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00']"
              @change="dateChang"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="handleCurrentChange(1)"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column label="用户昵称" min-width="180px">
        <div slot-scope="{ row }" class="cell-box">
          <el-image
            :preview-src-list="[row.merchant_user.avatar || avatar]"
            :src="row.merchant_user.avatar || avatar"
          ></el-image>
          <span class="cell-text">
            {{ row.merchant_user.nickname }}
          </span>
        </div>
      </el-table-column>

      <el-table-column label="游戏名称" min-width="180px">
        <div slot-scope="{ row }" class="cell-box">
          <el-image
            :preview-src-list="[row.admin_game.thumbnail.url]"
            :src="row.admin_game.thumbnail.url"
          ></el-image>
          <span class="cell-text">
            {{ row.admin_game.name }}
          </span>
        </div>
      </el-table-column>

      <el-table-column label="支付类型">
        <template slot-scope="{ row }">
          <el-tag :type="getPayTypeTag(row.pay_type)">
            {{ getPayTypeName(row.pay_type) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="订单金额">
        <template slot-scope="{ row }">{{ row.price }}元</template>
      </el-table-column>

      <el-table-column label="游戏分数">
        <template slot-scope="{ row }">
          <span v-if="row.game_ranking">
            {{ row.game_ranking.score }}{{ row.game_ranking.unit }}
          </span>
          <el-tag v-else type="info">无分数</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        width="160px"
        prop="created_at"
        label="创建时间"
        :formatter="formatTime"
      ></el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page_index"
      :page-size="queryForm.page_size"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
  import { getOrderList } from "@/api/game";
  import dayjs from "dayjs";

  export default {
    name: "GameInviteList",
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        dateRange: [],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          pay_type: undefined,
          page_index: 1,
          page_size: 20,
          merchant_user_id: undefined,
          start_time: undefined,
          end_time: undefined,
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.queryForm.merchant_user_id =
            (route.query && route.query.user_id) || undefined;
        },
        immediate: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      getPayTypeName(type) {
        switch (Number(type)) {
          case 0:
            return "未支付";
          case 10:
            return "微信支付";
          case 20:
            return "余额支付";
          default:
            return "未知类型";
        }
      },
      getPayTypeTag(type) {
        switch (Number(type)) {
          case 0:
            return "danger";
          case 10:
            return "success";
          case 20:
            return "warning";
          default:
            return "info";
        }
      },
      dateChang() {
        this.queryForm.page_index = 1;
        this.queryForm.start_time = new Date(this.dateRange[0]).getTime();
        this.queryForm.end_time = new Date(this.dateRange[1]).getTime();
        this.fetchData();
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getOrderList(this.queryForm);
        this.total = data.count;
        this.list = data.rows;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
</script>

<style scoped>
  .cell-box {
    display: flex;
    align-items: center;
  }
  .cell-text {
    flex: 1;
    padding-left: 8px;
  }
</style>
