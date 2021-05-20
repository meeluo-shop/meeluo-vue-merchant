<template>
  <div class="transaction-recharge-plan-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="套餐名称"></el-table-column>
      <el-table-column
        prop="recharge_amount"
        label="充值金额"
      ></el-table-column>
      <el-table-column
        prop="donation_amount"
        label="赠送金额"
      ></el-table-column>
      <el-table-column prop="order" label="套餐顺序"></el-table-column>
      <el-table-column
        prop="updated_at"
        label="更新时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template v-slot="scope">
          <el-button @click="handleDetail(scope.row)">详情</el-button>
          <el-button
            type="primary"
            :disabled="scope.row.system_role === 1"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            :disabled="scope.row.system_role === 1"
            @click="handleDelete(scope.row)"
          >
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
  import { getList, doDelete } from "@/api/recharge";
  import Edit from "./components/PlanEdit";
  import Detail from "./components/PlanDetail";
  import dayjs from "dayjs";

  export default {
    name: "TransactionRechargePlan",
    components: { Edit, Detail },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
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
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleDetail(row) {
        this.$refs["detail"].showDetail(row);
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            await doDelete({ ids: [row.id] });
            this.$baseMessage("删除成功", "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id);
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              await doDelete({ ids });
              this.$baseMessage("删除成功", "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
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
      async fetchData() {
        this.listLoading = true;
        const { data } = await getList(this.queryForm);
        this.list = this.sortByOrder(data.rows);
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      sortByOrder(data) {
        return data.sort((item_1, item_2) => {
          return item_1.order - item_2.order;
        });
      },
    },
  };
</script>
