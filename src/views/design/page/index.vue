<template>
  <div class="transaction-recharge-plan-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
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
      <el-table-column prop="name" label="页面名称"></el-table-column>
      <el-table-column prop="type" label="页面类型">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getPageType(row.type)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="typeFilter(row.type)" effect="plain">
              {{ getPageType(row.type) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="288" prop="path" label="页面地址">
        <template slot-scope="{ row }">
          {{ getPagePath(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="order" label="页面顺序"></el-table-column>
      <el-table-column label="操作" width="260">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button
            v-if="scope.row.type === 0"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
          <el-dropdown
            placement="bottom"
            trigger="click"
            @command="((id) => (type) => setPageType(id, type))(scope.row.id)"
          >
            <el-button
              icon="el-icon-arrow-down"
              type="success"
              style="margin-left: 10px"
            >
              页面设置
            </el-button>
            <el-dropdown-menu
              :key="scope.row.id"
              slot="dropdown"
              class="user-table-dropdown"
            >
              <el-dropdown-item command="10">应用首页</el-dropdown-item>
              <el-dropdown-item command="20">商城首页</el-dropdown-item>
              <el-dropdown-item command="30">游戏首页</el-dropdown-item>
              <el-dropdown-item v-if="merchant.type === 20" command="40">
                餐厅首页
              </el-dropdown-item>
              <el-dropdown-item command="0">自定义页面</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  import { getList, doDelete, setType } from "@/api/page";
  import dayjs from "dayjs";

  export default {
    name: "TransactionRechargePlan",
    data() {
      return {
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        merchant: this.$store.getters["passport/merchant"],
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
      typeFilter(type) {
        switch (Number(type)) {
          case 10:
            return "default";
          case 20:
            return "success";
          case 30:
            return "warning";
          case 40:
            return "danger";
          default:
            return "info";
        }
      },
      getPageType(type) {
        switch (Number(type)) {
          case 10:
            return "应用首页";
          case 20:
            return "商城首页";
          case 30:
            return "游戏首页";
          case 40:
            return "餐厅首页";
          default:
            return "自定义页面";
        }
      },
      async setPageType(id, type) {
        await setType(id, type);
        this.$baseMessage("设置成功", "success");
        this.fetchData();
      },
      handleEdit(row) {
        if (row.id) {
          this.$router.push(`/page/diy?id=${row.id}`);
        } else {
          this.$router.push(`/page/diy`);
        }
      },
      getPagePath(row) {
        switch (Number(row.type)) {
          case 10:
            return "pages/index/index";
          case 20:
            return "pages/shop/index";
          case 30:
            return "pages/game/index";
          case 40:
            return "pages/restaurant/index";
          default:
            return `pages/diy/index?id=${row.id}`;
        }
      },
      handleDelete(row) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          await doDelete(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
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
