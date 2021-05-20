<template>
  <div v-if="!details_page" class="wrap">
    <el-row>
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">商品订单列表</span>
        </part-header>
      </el-col>
    </el-row>
    <el-row class="nav" :gutter="20" type="flex" justify="center">
      <el-col :span="24">
        <vab-query-form>
          <vab-query-form-left-panel :span="24">
            <el-form :inline="true">
              <el-form-item>
                <el-select
                  v-model="value"
                  placeholder="订单状态"
                  @change="change"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <template name="日期">
                  <div class="block">
                    <el-date-picker
                      v-model="valuedate1"
                      type="datetimerange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00']"
                      @change="dateChang"
                    ></el-date-picker>
                  </div>
                </template>
              </el-form-item>
              <el-form-item>
                <template>
                  <el-input
                    v-model="input"
                    style="width: 194px"
                    class="input"
                    placeholder="请输入订单号"
                  ></el-input>
                  <el-button
                    class="btn"
                    type="primary"
                    icon="el-icon-search"
                    @click="submitSearch"
                  >
                    搜索
                  </el-button>
                </template>
              </el-form-item>
            </el-form>
            <!-- <template>
              <el-button class="btn" @click="reseTable">重置</el-button>
            </template> -->
          </vab-query-form-left-panel>
        </vab-query-form>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :highlight-current-row="false" :show-header="false" :data="title">
      <el-table-column prop="1">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["1"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="2">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["2"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="3">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["3"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="4">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["4"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="5">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["5"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="6">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["6"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="7">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["7"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="8">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["8"] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="9">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["9"] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-for="(item, index) in tableList"
      :key="`_${index}`"
      class="wrap_item"
    >
      <div :key="index" class="item_top">
        <span>时间：{{ _foramat(item.created_at) }}</span>
        &nbsp; &nbsp; &nbsp;
        <span>订单号：{{ item.order_no }}</span>
      </div>
      <el-table
        :key="item.id"
        border
        class="table_item"
        :show-header="false"
        :data="[item]"
      >
        <el-table-column
          class="border_all"
          width="200"
          prop="order_goods_list"
          label="商品信息"
        >
          <template slot-scope="scope">
            <div v-for="itm1 in scope.row.order_goods_list" :key="itm1.id">
              <el-row class="commodit_border">
                <el-col :span="9">
                  <el-image
                    :preview-src-list="[itm1.thumbnail_url]"
                    :src="itm1.thumbnail_url"
                  ></el-image>
                </el-col>
                <el-col :span="15">
                  <span>{{ itm1.name }}</span>
                  <br />
                  <span class="specs">
                    {{ "商品规格:" }}
                    {{ itm1.specs || "无" }}
                  </span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="order_goods_list" label="单价" width="120">
          <template slot-scope="{ row }">
            <template v-for="(itm, idx) in row.order_goods_list">
              <div
                :key="itm.id"
                class="price"
                :style="{
                  marginTop: idx > 0 ? '18px' : '0',
                }"
              >
                ￥{{
                  itm.grade_goods_money > 0
                    ? itm.grade_goods_money
                    : itm.goods_price
                }}
                ×
                {{ itm.total_num }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="express_price" label="运费">
          <template slot-scope="{ row }">
            <div class="price">￥{{ row.express_price }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="total_price" label="订单金额">
          <template slot-scope="{ row }">
            <div class="price">￥{{ row.pay_price }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="merchant_user.nickname" label="买家昵称">
          <template slot-scope="{ row }">
            <div class="price">{{ row.merchant_user.nickname }}</div>
          </template>
        </el-table-column>
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <template v-if="scope.row.pay_type === 20">
              <div class="price">
                <el-tag type="info" size="medium">余额支付</el-tag>
              </div>
            </template>
            <template v-else>
              <div class="price">
                <el-tag type="danger" size="medium">微信支付</el-tag>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="配送方式">
          <template slot-scope="scope">
            <template v-if="scope.row.delivery_type === 10">
              <div class="price">
                <el-tag size="medium">到店自提</el-tag>
              </div>
            </template>
            <template v-else>
              <div class="price">
                <el-tag size="success">快递配送</el-tag>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="" label="交易状态" width="160">
          <template slot-scope="scope">
            <p>
              付款状态：
              <el-tag
                class="am-badge"
                :type="scope.row.pay_status === 10 ? 'info' : 'success'"
              >
                {{ scope.row.pay_status === 10 ? "未付款" : "已付款" }}
              </el-tag>
            </p>
            <p>
              发货状态：
              <el-tag
                class="am-badge"
                :type="scope.row.delivery_status === 10 ? 'info' : 'success'"
              >
                {{ scope.row.delivery_status === 10 ? "未发货" : "已发货" }}
              </el-tag>
            </p>
            <p>
              收货状态：
              <el-tag
                class="am-badge"
                :type="scope.row.receipt_status === 10 ? 'info' : 'success'"
              >
                {{ scope.row.receipt_status === 10 ? "未收货" : "已收货" }}
              </el-tag>
            </p>
            <p v-if="scope.row.order_status !== 10">
              订单状态：
              <el-tag
                class="am-badge"
                :type="getOrderStatusTagType(scope.row.order_status)"
              >
                {{ getOrderStatusTagText(scope.row.order_status) }}
              </el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="price">
              <el-button
                type="primary"
                plain
                size="small"
                @click="handleClick(scope.row)"
              >
                订单详情
              </el-button>
            </div>
            <div class="price" style="margin-top: 8px">
              <el-button
                v-if="scope.row.order_status === 21"
                type="danger"
                plain
                size="small"
                @click="handleClick(scope.row)"
              >
                去审核
              </el-button>
            </div>
            <div class="price" style="margin-top: 8px">
              <el-button
                v-if="
                  scope.row.order_status === 10 &&
                  scope.row.delivery_status === 10 &&
                  scope.row.pay_status === 20
                "
                type="warning"
                plain
                size="small"
                @click="handleClick(scope.row)"
              >
                去发货
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- table End -->
    <el-pagination
      :current-page="orderApiParams.page_index"
      :page-size="orderApiParams.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
  <!-- 详情页面 -->
  <div v-else class="wrap">
    <el-row style="margin-bottom: 20px">
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">订单信息</span>
          <el-button slot="right" @click="goBack">返回</el-button>
        </part-header>
      </el-col>
    </el-row>
    <div class="item_top">
      <span>时间：{{ _foramat(baseInfoList[0].created_at) }}</span>
      &nbsp; &nbsp; &nbsp;
      <span>订单号：{{ baseInfoList[0].order_no }}</span>
    </div>
    <el-table
      style="margin: 0"
      class="detailsTable"
      border
      :data="baseInfoList"
    >
      <el-table-column
        :key="1"
        prop="merchant_user.avatar"
        width="220"
        label="买家信息"
      >
        <template slot-scope="{ row }">
          <el-row style="display: flex; align-items: center">
            <el-col :span="8">
              <el-image
                :preview-src-list="[row.merchant_user.avatar || avatar]"
                :src="row.merchant_user.avatar || avatar"
              ></el-image>
            </el-col>
            <el-col :span="16">
              <span>{{ row.merchant_user.nickname }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="订单金额">
        <template slot-scope="{ row }">
          <div>订单总额：￥{{ row.total_price }}</div>
          <div v-if="row.coupon_money > 0">
            优惠券抵扣金额：- ￥{{ row.coupon_money }}
          </div>
          <div v-if="row.points_money > 0">
            积分抵扣金额：- ￥{{ row.points_money }}
          </div>
          <div v-if="row.update_price !== null">
            后台改价：{{
              row.update_price - row.order_price > 0 ? "+" : "-"
            }}
            ￥{{ Math.abs(row.order_price - row.update_price).toFixed(2) }}
          </div>
          <!-- <div>最终订单金额：￥{{ row.order_price }}</div> -->
          <div>运费金额：+ ￥{{ row.express_price }}</div>
          <div>
            实付款金额：
            <span style="color: rgb(255, 73, 73)">￥{{ row.pay_price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <template v-if="scope.row.pay_type === 20">
            <div>
              <el-tag type="info" size="medium">余额支付</el-tag>
            </div>
          </template>
          <template v-else>
            <div>
              <el-tag type="danger" size="medium">微信支付</el-tag>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="配送方式">
        <template slot-scope="scope">
          <template v-if="scope.row.delivery_type === 10">
            <div>
              <el-tag size="medium">到店自提</el-tag>
            </div>
          </template>
          <template v-else>
            <div>
              <el-tag size="success">快递配送</el-tag>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="" label="交易状态" width="160">
        <template slot-scope="scope">
          <p>
            付款状态：
            <el-tag
              class="am-badge"
              :type="scope.row.pay_status === 10 ? 'info' : 'success'"
            >
              {{ scope.row.pay_status === 10 ? "未付款" : "已付款" }}
            </el-tag>
          </p>
          <p>
            发货状态：
            <el-tag
              class="am-badge"
              :type="scope.row.delivery_status === 10 ? 'info' : 'success'"
            >
              {{ scope.row.delivery_status === 10 ? "未发货" : "已发货" }}
            </el-tag>
          </p>
          <p>
            收货状态：
            <el-tag
              class="am-badge"
              :type="scope.row.receipt_status === 10 ? 'info' : 'success'"
            >
              {{ scope.row.receipt_status === 10 ? "未收货" : "已收货" }}
            </el-tag>
          </p>
          <p v-if="scope.row.order_status !== 10">
            订单状态：
            <el-tag
              class="am-badge"
              :type="getOrderStatusTagType(scope.row.order_status)"
            >
              {{ getOrderStatusTagText(scope.row.order_status) }}
            </el-tag>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        v-if="baseInfoList[0].buyer_remark"
        prop="buyer_remark"
        label="买家留言"
      >
        <template slot-scope="scope">
          {{ scope.row.buyer_remark }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          (baseInfoList[0].pay_status === 10 &&
            baseInfoList[0].order_status === 10) ||
          baseInfoList[0].order_status === 21
        "
        width="200"
        label="操作"
      >
        <template>
          <div
            v-if="
              baseInfoList[0].pay_status === 10 &&
              baseInfoList[0].order_status === 10
            "
            class="price"
          >
            <el-button
              type="primary"
              plain
              size="small"
              @click="modifyOrderPrice"
            >
              修改价格
            </el-button>
          </div>
          <div v-if="baseInfoList[0].order_status === 21" class="price">
            <el-button
              type="primary"
              plain
              size="small"
              @click="agreeCancelOrder"
            >
              同意退单
            </el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="refuseCancelOrder"
            >
              拒绝退单
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">商品信息</span>
        </part-header>
      </el-col>
    </el-row>

    <el-table
      border
      :data="baseInfoList[0].order_goods_list"
      class="detailsTable"
    >
      <el-table-column prop="" width="280" label="商品信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="8">
              <el-image
                :preview-src-list="[scope.row.thumbnail_url]"
                :src="scope.row.thumbnail_url"
              ></el-image>
            </el-col>
            <el-col :span="16">
              <span>{{ scope.row.name }}</span>
              <br />
              <span class="specs">
                {{ "商品规格:" }}{{ scope.row.specs || "无" }}
              </span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="order_goods_list" label="商品编码">
        <template slot-scope="{ row }">
          <el-tag v-if="row.goods_no" type="primary">{{ row.goods_no }}</el-tag>
          <el-tag v-else type="info">无</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="order_goods_list" label="单价">
        <template slot-scope="{ row }">
          <div v-if="row.grade_goods_money > 0">
            <div style="text-decoration: line-through">
              ￥{{ row.goods_price }}
            </div>
            <div style="color: rgb(255, 73, 73)">
              会员折扣：￥{{ row.grade_goods_money }}
            </div>
          </div>

          <div v-else>￥{{ row.goods_price }}</div>
        </template>
      </el-table-column>
      <el-table-column label="购买数量">
        <template slot-scope="{ row }">
          <span>×{{ row.total_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品总价">
        <template slot-scope="{ row }">
          <span>
            ￥{{ Number(row.grade_total_money) || row.total_pay_price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="baseInfoList[0].pay_status === 20"
        prop=""
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="!row.extract_clerk_id"
            type="primary"
            :disabled="baseInfoList[0].order_status !== 10"
            @click="delivery(row)"
          >
            发货
          </el-button>
          <el-button v-else type="primary" @click="delivery(row)">
            查看发货信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="baseInfoList[0].delivery_type === 20">
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">收货地址</span>
        </part-header>
      </el-col>
    </el-row>
    <el-table
      v-if="baseInfoList[0].delivery_type === 20"
      border
      :data="baseInfoList"
      class="detailsTable"
    >
      <el-table-column prop="order_address.name" label="收货人">
        <template slot-scope="{ row }">
          <template v-if="row.order_address && row.order_address.name">
            {{ row.order_address.name }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="order_address.phone" label="收货电话">
        <template slot-scope="{ row }">
          <template v-if="row.order_address && row.order_address.phone">
            {{ row.order_address.phone }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="" label="收货地址">
        <template slot-scope="{ row }">
          <template v-if="row.order_address && row.order_address.address">
            {{ row.order_address.province_name }}
            {{ row.order_address.city_name }}
            {{ row.order_address.county_name }}
            {{ row.order_address.address }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="baseInfoList[0].delivery_type === 10">
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">提货人信息</span>
        </part-header>
      </el-col>
    </el-row>
    <el-table
      v-if="baseInfoList[0].delivery_type === 10"
      border
      :data="baseInfoList"
      class="detailsTable"
    >
      <el-table-column prop="order_extract.linkman" label="提货人姓名">
        <template slot-scope="{ row }">
          <template v-if="row.order_extract && row.order_extract.linkman">
            {{ row.order_extract.linkman }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="order_extract.phone" label="收货电话">
        <template slot-scope="{ row }">
          <template v-if="row.order_extract && row.order_extract.phone">
            {{ row.order_extract.phone }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="baseInfoList[0].delivery_type === 10">
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">自提门店信息</span>
        </part-header>
      </el-col>
    </el-row>
    <el-table
      v-if="baseInfoList[0].delivery_type === 10"
      border
      :data="[merchant]"
      class="detailsTable"
    >
      <el-table-column prop="store_name" label="门店名称">
        <template slot-scope="{ row }">
          <template v-if="row.store_name">
            {{ row.store_name }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="门店电话">
        <template slot-scope="{ row }">
          <template v-if="row.phone">
            {{ row.phone }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="" label="门店地址">
        <template slot-scope="{ row }">
          <template v-if="row.address">
            {{ row.province_name }}
            {{ row.city_name }}
            {{ row.county_name }}
            {{ row.address }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <write-off ref="writeOff" @fetchData="fetchInfo" />
    <deliver ref="deliver" @fetchData="fetchInfo" />
    <update-price ref="updatePrice" @fetchData="fetchInfo" />
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import {
    getMallOrders,
    getOrderInfo,
    agreeCancelOrder,
    refuseCancelOrder,
  } from "@/api/mallorders";
  import WriteOff from "./writeOff/index.vue";
  import Deliver from "./deliver/index.vue";
  import UpdatePrice from "./updatePrice/index.vue";
  export default {
    name: "MallOrder",

    components: { WriteOff, Deliver, UpdatePrice },

    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        merchant: this.$store.getters["passport/merchant"],
        title: [
          {
            1: "商品信息",
            2: "单价/数量",
            3: "订单运费",
            4: "实付款",
            5: "买家昵称",
            6: "支付方式",
            7: "配送方式",
            8: "交易状态",
            9: "操作",
          },
        ],
        baseInfoList: [],
        id: null,
        input: "",
        details_page: false,
        valuedate1: [],
        count: 0,
        value: "",
        tableList: [],
        orderApiParams: {
          page_index: 1,
          page_size: 10,
          status: null,
        },
        options: [
          {
            value: undefined,
            label: "所有",
          },
          {
            value: 10,
            label: "待付款",
          },
          {
            value: 20,
            label: "待发货",
          },
          {
            value: 30,
            label: "待收货",
          },
          {
            value: 40,
            label: "已完成",
          },
          {
            value: 51,
            label: "待取消",
          },
          {
            value: 50,
            label: "已取消",
          },
        ],
      };
    },
    watch: {
      $route: {
        handler(route) {
          this.orderApiParams.user_id =
            (route.query && route.query.user_id) || undefined;
        },
        immediate: true,
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      _foramat(val) {
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      },
      delivery(info) {
        if (this.baseInfoList[0].delivery_type === 10) {
          this.$refs["writeOff"].showEdit(info);
        } else {
          this.$refs["deliver"].showEdit(info);
        }
      },
      modifyOrderPrice() {
        this.$refs["updatePrice"].showEdit(this.baseInfoList[0]);
      },
      agreeCancelOrder() {
        this.$baseConfirm(
          "是否同意用户退单？同意后会自动退回付款金额（微信支付原路退款）并关闭订单",
          null,
          async () => {
            await agreeCancelOrder(this.baseInfoList[0].id);
            this.$baseMessage("退单成功", "success");
            this.fetchInfo(this.baseInfoList[0].id);
          }
        );
      },
      refuseCancelOrder() {
        this.$baseConfirm("是否要拒绝用户退单？", null, async () => {
          await refuseCancelOrder(this.baseInfoList[0].id);
          this.$baseMessage("拒绝成功", "success");
          this.fetchInfo(this.baseInfoList[0].id);
        });
      },
      getOrderStatusTagType(val) {
        switch (val) {
          case 20:
            return "warning";
          case 21:
            return "danger";
          case 30:
            return "success";
        }
      },
      getOrderStatusTagText(val) {
        switch (val) {
          case 20:
            return "已取消";
          case 21:
            return "待取消";
          case 30:
            return "已完成";
        }
      },
      async fetchData(val = this.orderApiParams) {
        const { data } = await getMallOrders(val);
        this.tableList = data.rows;
        this.count = data.count;
      },
      async fetchInfo(id) {
        const { data } = await getOrderInfo(id);
        this.baseInfoList = [data];
      },
      change(val) {
        this.orderApiParams = {
          ...this.orderApiParams,
          page_index: 1,
          page_size: 10,
          status: val,
        };
        this.fetchData(this.orderApiParams);
      },
      handleCurrentChange(val) {
        this.orderApiParams.page_index = val;
        this.fetchData();
      },
      handleSizeChange(val) {
        this.orderApiParams.page_size = val;
        this.fetchData();
      },
      async handleClick(row) {
        !row && eval("return");
        await this.fetchInfo(row.id);
        this.details_page = true;
      },
      dateChang() {
        let startTimer, endTimer;
        startTimer = new Date(this.valuedate1[0]).getTime();
        endTimer = new Date(this.valuedate1[1]).getTime();
        this.fetchData({
          ...this.orderApiParams,
          page_index: 1,
          start_time: startTimer,
          end_time: endTimer,
        });
      },
      submitSearch() {
        if (!this.input) {
          this.$message.warning("请输入订单号");
        } else {
          this.fetchData({
            ...this.orderApiParams,
            order_no: this.input,
          });
        }
      },
      reseTable() {
        this.fetchData();
      },
      goBack() {
        this.details_page = false;
      },
    },
  };
</script>

<style>
  .wrap {
    padding: 20px;
  }
  .img {
    width: 50px;
    height: 50px;
  }
  .border {
    border-bottom: 1px solid #ccc;
  }
  .border_all {
    border: 1px solid #ccc;
    padding: 10px;
  }
  .specs {
    color: #ccc;
    font-size: 10px;
    line-height: 0;
  }
  .input {
    width: 300px;
  }
  .price {
    text-align: center;
  }
  .page_header {
    border-bottom: 1px solid #eef1f5;
  }
  .nav {
    padding-top: 20px;
  }

  .wrap_item {
    margin: 35px 0;
  }
  .item_top {
    padding-left: 10px;
    line-height: 40px;
    border: 1px solid #eef1f5;
    border-bottom: 0;
  }
  .item_top > :nth-child(2) {
    margin-left: 20px;
    display: inline-block;
  }
  .title {
    font-weight: bolder;
    font-size: 14px;
    line-height: 40px;
  }
  .commodit_border {
    padding: 10px;
  }
  html body .el-table th {
    background: #fff;
  }
  .detailsTable {
    margin-top: 20px;
  }

  .chunk_header {
    margin-top: 20px;
  }
</style>
