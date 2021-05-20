<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="queryForm.status" placeholder="是否获得奖励">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.is_new_user"
              placeholder="是否为新用户"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
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
      <el-table-column label="分享人" min-width="180px">
        <div slot-scope="{ row }" class="cell-box">
          <el-image
            :preview-src-list="[row.invite_user.avatar || avatar]"
            :src="row.invite_user.avatar || avatar"
          ></el-image>
          <span class="cell-text">
            {{ row.invite_user.nickname }}
          </span>
        </div>
      </el-table-column>

      <el-table-column label="被邀请人" min-width="180px">
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

      <el-table-column label="分享游戏" min-width="180px">
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
      <el-table-column label="是否为新用户">
        <template slot-scope="{ row }">
          <el-tag :type="row.is_new_user ? 'success' : 'info'">
            {{ row.is_new_user ? "是" : "否" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="是否获得奖励">
        <template slot-scope="{ row }">
          <el-tag :type="row.status ? 'success' : 'info'">
            {{ row.status ? "是" : "否" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="邀请时间"
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
  import { getInviteList } from "@/api/game";
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
          is_new_user: undefined,
          status: undefined,
          page_index: 1,
          page_size: 20,
          invite_user_id: undefined,
          start_time: undefined,
          end_time: undefined,
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.queryForm.invite_user_id =
            (route.query && route.query.user_id) || undefined;
        },
        immediate: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
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
        const { data } = await getInviteList(this.queryForm);
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
