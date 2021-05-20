<template>
  <div class="user-grade-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item v-if="false">
            <el-select
              v-model="queryForm.coupon_id"
              style="width: 160px"
              placeholder="选择优惠券"
            >
              <el-option key="1" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in couponList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.expire_type"
              style="width: 160px"
              placeholder="有效期类型"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="领取后生效" :value="10"></el-option>
              <el-option label="指定时间段" :value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="[10, 20].includes(queryForm.expire_type)">
            <el-select
              v-model="queryForm.is_available"
              style="width: 160px"
              placeholder="是否能用"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="能用" :value="1"></el-option>
              <el-option label="不能用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.color"
              style="width: 160px"
              placeholder="优惠券颜色"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="红" :value="10"></el-option>
              <el-option label="蓝" :value="20"></el-option>
              <el-option label="黄" :value="30"></el-option>
              <el-option label="绿" :value="40"></el-option>
              <el-option label="紫" :value="50"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.type"
              style="width: 160px"
              placeholder="优惠券类型"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="满减券" :value="10"></el-option>
              <el-option label="折扣券" :value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.is_used"
              style="width: 160px"
              placeholder="是否使用"
            >
              <el-option label="全部" :value="null"></el-option>
              <el-option label="已使用" :value="1"></el-option>
              <el-option label="未使用" :value="0"></el-option>
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
      <el-table-column label="头像" width="70px">
        <template slot-scope="{ row }">
          <el-image
            :preview-src-list="imageList"
            :src="row.merchant_user.avatar || avatar"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="微信昵称"
        prop="merchant_user.nickname"
      ></el-table-column>
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
      <el-table-column label="有效时间" width="180px">
        <template slot-scope="{ row }">
          <span>{{ getEffectiveTime(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="是否能用">
        <template slot-scope="{ row }">
          <el-tag :type="getAvailable(row) ? 'success' : 'danger'">
            {{ getAvailable(row) ? "能用" : "不能用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否使用" prop="is_used">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getUsed(row.is_used)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_used | useFilter">
              {{ getUsed(row.is_used) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="领取时间"
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
  import { getList, getReceiveList } from "@/api/coupon";
  import dayjs from "dayjs";

  export default {
    name: "MerchantCoupon",
    filters: {
      useFilter(val) {
        if (val === 1) {
          return "success";
        } else {
          return "info";
        }
      },
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
        avatar: require("@/assets/default_avatar.svg"),
        imageList: [],
        couponList: [],
        list: null,
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          coupon_id: undefined,
          is_available: undefined,
          is_used: undefined,
          color: undefined,
          type: undefined,
          expire_type: undefined,
          merchant_user_id: undefined,
          page_index: 1,
          page_size: 20,
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
      getUsed(val) {
        if (val === 1) {
          return "已使用";
        } else {
          return "未使用";
        }
      },
      getAvailable(row) {
        if (row.expire_type === 10) {
          return dayjs(row.expire_time).valueOf() > Date.now();
        } else if (row.expire_type === 20) {
          return (
            dayjs(row.end_time).valueOf() > Date.now() &&
            Date.now() > dayjs(row.start_time).valueOf()
          );
        }
      },
      getEffectiveTime(row) {
        if (row.expire_type === 10) {
          // return `领取${row.expire_day}天内有效`;
          return `${this.formatTime(null, null, row.expire_time)}`;
        } else if (row.expire_type === 20) {
          return `${this.formatTime(
            null,
            null,
            row.start_time
          )} ~ ${this.formatTime(null, null, row.end_time)}`;
        } else {
          return "无";
        }
      },
      getFavorablePrice(row) {
        if (row.type === 10) {
          return `减${row.reduce_price}元`;
        } else if (row.type === 20) {
          return `打${Number(row.discount / 10).toFixed(1)}折`;
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
        const [grantResp, couponResp] = await Promise.all([
          getReceiveList(this.queryForm),
          getList({ page_size: 500 }),
        ]);
        const { data } = grantResp;
        this.couponList = couponResp.data.rows.map((item) => ({
          text: item.name,
          value: item.id,
        }));
        this.list = data.rows;
        this.total = data.count;
        const imageList = [];
        data.rows.forEach((item) => {
          imageList.push(item.merchant_user.avatar || this.avatar);
        });
        this.imageList = imageList;
        this.listLoading = false;
      },
      formatTime(_, __, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  };
</script>
