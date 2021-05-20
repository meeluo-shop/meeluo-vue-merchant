<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column prop="name" label="等级名称"></el-table-column>

      <el-table-column
        prop="upgrade"
        label="升级条件"
        :formatter="(row, column, val) => val + '元'"
      ></el-table-column>
      <el-table-column
        prop="equity"
        label="等级权益"
        :formatter="(row, column, val) => val / 10 + '折'"
      ></el-table-column>
      <el-table-column prop="weight" label="会员级别">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="String(row.weight)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-rate
              :value="row.weight > 5 ? 5 : row.weight"
              :max="5"
              allow-half
              disabled
            ></el-rate>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="是否默认">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="!!row.is_default ? '是' : '否'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_default | statusFilter">
              {{ !!row.is_default ? "是" : "否" }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        prop="created_at"
        label="创建时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template v-slot="scope">
          <el-button @click="showDetail(scope.row)">详情</el-button>
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
    <edit ref="edit" @fetchData="fetchData"></edit>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/grade";
  import Edit from "./components/GradeEdit";
  import Detail from "./components/GradeDetail";
  import dayjs from "dayjs";

  export default {
    name: "MerchantManagement",
    components: { Edit, Detail },
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
    created() {
      this.fetchData();
    },
    methods: {
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      showDetail(row) {
        this.$refs["detail"].showDetail(row);
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
          await doDelete(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getList(this.queryForm);
        this.list = this.sortByWeight(data.rows);
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      sortByWeight(data) {
        return data.sort((item_1, item_2) => {
          return item_1.weight - item_2.weight;
        });
      },
    },
  };
</script>
