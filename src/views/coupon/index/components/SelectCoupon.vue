<template>
  <div>
    <el-dialog
      title="选择优惠券"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="800px"
      @close="close"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="queryForm.type" placeholder="优惠券类型">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="满减券" :value="10"></el-option>
                <el-option label="折扣券" :value="20"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryData"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
      <div style="max-height: 400px; overflow: scroll">
        <el-table
          v-loading="listLoading"
          :data="couponList"
          :element-loading-text="elementLoadingText"
        >
          <el-table-column label="" width="28">
            <template slot-scope="{ row }">
              <el-radio-group v-model="selectedCoupon" class="select-radio-box">
                <el-radio :label="row"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
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
          <el-table-column
            label="最低消费金额"
            prop="min_price"
          ></el-table-column>
          <el-table-column label="有效时间">
            <template slot-scope="{ row }">
              <span>{{ getEffectiveTime(row) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :current-page="queryForm.page_index"
        :page-size="queryForm.page_size"
        :total="total"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import { getList } from "@/api/coupon";

  export default {
    name: "SelectCoupon",
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
    props: {
      expireType: {
        type: Number,
        default: undefined,
      },
    },
    data() {
      return {
        selectedCoupon: null,
        dialogFormVisible: false,
        couponList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          type: undefined,
        },
      };
    },
    methods: {
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
      cancel() {
        this.$emit("cancel");
      },
      async show(row) {
        await this.fetchData();
        this.queryForm = this.$options.data().queryForm;
        this.dialogFormVisible = true;
        this.selectedCoupon = null;
      },
      close() {
        this.dialogFormVisible = false;
      },
      save() {
        if (this.selectedCoupon) {
          this.$emit("select", this.selectedCoupon);
        }
        this.close();
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.page_index = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const couponData = await getList({
          ...this.queryForm,
          expire_type: this.expireType,
        });
        this.couponList = couponData.data.rows;
        this.total = couponData.data.count;
        this.listLoading = false;
      },
    },
  };
</script>

<style>
  .select-radio-box .el-radio__label {
    display: none;
  }
</style>
