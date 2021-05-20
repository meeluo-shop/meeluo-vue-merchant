<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit()">
          添加
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column prop="keyword" label="关键字"></el-table-column>
      <el-table-column prop="type" label="回复类型">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getTypeName(row.type)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="getTypeStyle(row.type)">
              {{ getTypeName(row.type) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="is_active" label="是否启用">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="row.is_active ? '是' : '否'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_active | statusFilter">
              {{ row.is_active ? "是" : "否" }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" width="160">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
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
  import { getKeywordList, deleteKeyword } from "@/api/wechat";
  import dayjs from "dayjs";

  export default {
    name: "WechatReplyKeyword",
    filters: {
      statusFilter(status) {
        return !!status ? "success" : "info";
      },
    },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
        },
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      getTypeName(type) {
        switch (type) {
          case 10:
            return "文字消息";
          case 20:
            return "图片消息";
          case 30:
            return "音频消息";
          case 40:
            return "视频消息";
          case 50:
            return "图文消息";
        }
      },
      getTypeStyle(type) {
        switch (type) {
          case 10:
            return "info";
          case 20:
            return "primary";
          case 30:
            return "success";
          case 40:
            return "danger";
          case 50:
            return "warning";
        }
      },
      handleEdit(row) {
        if (row) {
          this.$router.push({
            path: `edit/1/${row.id}`,
          });
        } else {
          this.$router.push({
            path: `add/1/`,
          });
        }
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      handleDelete(row) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          await deleteKeyword(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getKeywordList(this.queryForm);
        this.list = data.rows;
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
</script>
