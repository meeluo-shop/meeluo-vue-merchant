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
      <el-table-column prop="name" label="打印机名称"></el-table-column>

      <el-table-column prop="brand" label="打印机品牌">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getBrandName(row.brand)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag type="success">{{ getBrandName(row.brand) }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="打印机编号"></el-table-column>
      <el-table-column prop="secret" label="打印机密钥"></el-table-column>
      <el-table-column prop="print_count" label="打印份数"></el-table-column>
      <el-table-column label="设备状态">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getState(row.state).text"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="getState(row.state).type">
              {{ getState(row.state).text }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="!!row.is_active ? '是' : '否'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_active | statusFilter">
              {{ !!row.is_active ? "是" : "否" }}
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
  </div>
</template>

<script>
  import {
    getPrinterList,
    deletePrinter,
    getPrinterStatus,
  } from "@/api/device";
  import Edit from "./edit";
  import dayjs from "dayjs";

  export default {
    name: "MerchantDevicePrinter",
    components: { Edit },
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
          is_active: undefined,
          brand: undefined,
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      getBrandName(brand) {
        switch (brand) {
          case 10:
            return "易联云";
          default:
            "未知设备";
        }
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
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
          await deletePrinter(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getPrinterList(this.queryForm);
        const resp = await Promise.all(
          data.rows.map((item) => getPrinterStatus(item.id))
        );
        resp.forEach((resp, index) => {
          data.rows[index].state = Number(resp.data.state);
        });
        this.list = data.rows;
        this.total = data.count;
        this.listLoading = false;
      },
      getState(state) {
        switch (state) {
          case 0:
            return {
              type: "danger",
              text: "离线",
            };
          case 1:
            return {
              type: "success",
              text: "在线",
            };
          case 2:
            return {
              type: "warning",
              text: "缺纸",
            };
          default: {
            return {
              type: "info",
              text: "异常状态",
            };
          }
        }
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
</script>
