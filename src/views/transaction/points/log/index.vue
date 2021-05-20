<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="queryForm.type" placeholder="积分变动方式">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="增加" :value="1"></el-option>
              <el-option label="减少" :value="2"></el-option>
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
            <el-input
              v-model.trim="queryForm.nickname"
              clearable
              placeholder="请输入微信昵称"
            />
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
      <el-table-column width="80" label="微信头像">
        <template slot-scope="{ row }">
          <el-image
            :preview-src-list="[row.merchant_user.avatar || avatar]"
            :src="row.merchant_user.avatar || avatar"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="微信昵称"
        prop="merchant_user.nickname"
      ></el-table-column>
      <el-table-column label="变动积分">
        <template slot-scope="{ row }">
          <span :style="{ color: row.type === 1 ? '#13ce66' : '#ff4d4f' }">
            {{ row.type === 1 ? "+" : "-" }} {{ row.value }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="描述/说明" prop="description"></el-table-column>
      <el-table-column label="管理员备注" prop="remark">
        <template slot-scope="{ row }">
          <el-tag v-if="!row.remark" type="info">无</el-tag>
          <span v-else>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
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
  import { getPointsLog } from "@/api/points";
  import dayjs from "dayjs";

  export default {
    name: "PointsLog",
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
          type: undefined,
          page_index: 1,
          page_size: 20,
          nickname: undefined,
          user_id: undefined,
          start_time: undefined,
          end_time: undefined,
        },
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.queryForm.user_id =
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
        const { data } = await getPointsLog(this.queryForm);
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
