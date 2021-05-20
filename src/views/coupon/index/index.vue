<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="4">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="20">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="queryForm.color" placeholder="优惠券颜色">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="红" :value="10"></el-option>
              <el-option label="蓝" :value="20"></el-option>
              <el-option label="黄" :value="30"></el-option>
              <el-option label="绿" :value="40"></el-option>
              <el-option label="紫" :value="50"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryForm.type" placeholder="优惠券类型">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="满减券" :value="10"></el-option>
              <el-option label="折扣券" :value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="fetchData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column prop="name" label="优惠券名称"></el-table-column>

      <el-table-column prop="type" label="优惠券类型">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getType(row.type)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.type | typeFilter">
              {{ getType(row.type) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="优惠价格">
        <template slot-scope="{ row }">
          <span>{{ getFavorablePrice(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最低消费金额" prop="min_price"></el-table-column>
      <el-table-column label="有效时间">
        <template slot-scope="{ row }">
          <span>{{ getEffectiveTime(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已领取数量" prop="receive_num"></el-table-column>
      <el-table-column label="操作" width="220">
        <template v-slot="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
          <el-button type="success" @click="grantUser(scope.row)">
            发放
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
    <select-user ref="selectUser" @select="selectUser"></select-user>
  </div>
</template>

<script>
  import { getList, doDelete, grantUser } from "@/api/coupon";
  import Edit from "./components/CouponEdit";
  import dayjs from "dayjs";
  import SelectUser from "../../user/index/components/SelectUser";

  export default {
    name: "MerchantCoupon",
    components: { Edit, SelectUser },
    filters: {
      typeFilter(val) {
        if (val === 10) {
          return "warning";
        } else if (val === 20) {
          return "danger";
        } else {
          return "info";
        }
      },
    },
    data() {
      return {
        currentCoupon: null,
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          color: undefined,
          type: undefined,
          expire_type: undefined,
          page_index: 1,
          page_size: 20,
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      grantUser(row) {
        this.currentCoupon = row;
        this.$refs["selectUser"].show();
      },
      async selectUser(user) {
        await grantUser({
          merchant_user_id: user.id,
          coupon_id: this.currentCoupon.id,
        });
        this.$baseMessage("发放成功", "success");
        this.fetchData();
      },
      getEffectiveTime(row) {
        if (row.expire_type === 10) {
          return `领取${row.expire_day}天内有效`;
        } else if (row.expire_type === 20) {
          return `${this.formatTime(row.start_time)} ~ ${this.formatTime(
            row.end_time
          )}`;
        } else {
          return "无";
        }
      },
      getFavorablePrice(row) {
        if (row.type === 10) {
          return `减${row.reduce_price}元`;
        } else if (row.type === 20) {
          return `打${row.discount}折`;
        } else {
          return "无";
        }
      },
      getType(val) {
        if (val === 10) {
          return "满减券";
        } else if (val === 20) {
          return "折扣券";
        } else {
          return "无效类型";
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
          await doDelete(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      async fetchData() {
        this.listLoading = true;
        const { data } = await getList(this.queryForm);
        this.list = data.rows;
        this.total = data.count;
        this.listLoading = false;
      },
      formatTime(cellValue) {
        return dayjs(cellValue).format("YYYY/MM/DD");
      },
    },
  };
</script>
