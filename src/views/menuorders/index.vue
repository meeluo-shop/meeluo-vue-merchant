<template>
  <div v-if="!details_page" class="wrap">
    <el-row>
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">点餐订单列表</span>
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
                  v-model="tableId"
                  style="width: 180px"
                  clearable
                  placeholder="选择餐桌/包间"
                  @change="changeTable"
                >
                  <el-option
                    v-for="item in tableOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="value"
                  style="width: 180px"
                  clearable
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
                    style="width: 180px"
                    class="input"
                    placeholder="请输入订单号"
                  ></el-input>
                  <el-button
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
      <el-table-column prop="7">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["7"] }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="5">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["5"] }}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="6">
        <template slot-scope="{ row }">
          <div class="price title">{{ row["6"] }}</div>
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
        &nbsp; &nbsp;
        <span>排号：{{ item.row_no }}号</span>
        &nbsp; &nbsp; &nbsp;
        <span>订单号：{{ item.order_no }}</span>
        &nbsp; &nbsp; &nbsp;
        <span>就餐人数：{{ item.people }}人</span>
      </div>
      <el-table
        :key="item.id"
        border
        class="table_item"
        :show-header="false"
        :data="[item]"
      >
        <el-table-column
          class="border_all order-table-list"
          width="280"
          prop="order_goods_list"
          label="商品信息"
        >
          <template slot-scope="scope">
            <div v-for="itm1 in scope.row.order_goods_list" :key="itm1.id">
              <el-row class="commodit_border">
                <el-col :span="6">
                  <el-image
                    :preview-src-list="[itm1.thumbnail_url]"
                    :src="itm1.thumbnail_url"
                  ></el-image>
                </el-col>
                <el-col :span="18">
                  <span style="padding-right: 8px">{{ itm1.name }}</span>
                  <el-tag v-if="itm1.extract_clerk_id" type="success">
                    已上餐
                  </el-tag>
                  <el-tag
                    v-else
                    style="cursor: pointer"
                    type="danger"
                    @click="() => delivery(itm1)"
                  >
                    未上餐
                  </el-tag>
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
        <el-table-column
          class-name="goods-price-col"
          prop="order_goods_list"
          label="单价"
        >
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
        <el-table-column prop="ware_fee" label="餐具/调料费">
          <template slot-scope="{ row }">
            <div class="price">￥{{ row.ware_fee }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="total_price" label="订单金额">
          <template slot-scope="{ row }">
            <div class="price">￥{{ row.pay_price }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="餐桌/包间">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.table_name }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="merchant_user.nickname" label="买家昵称">
          <template slot-scope="{ row }">
            <div class="price">{{ row.merchant_user.nickname || '商家前台' }}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <template v-if="scope.row.pay_status === 30">
              <div class="price">
                <el-tag type="danger" size="medium">线下付款</el-tag>
              </div>
            </template>
            <template v-else-if="scope.row.pay_type === 20">
              <div class="price">
                <el-tag type="info" size="medium">余额支付</el-tag>
              </div>
            </template>
            <template v-else-if="scope.row.pay_type === 10">
              <div class="price">
                <el-tag type="success" size="medium">微信支付</el-tag>
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
                :type="scope.row.pay_status === 20 ? 'success' : 'info'"
              >
                {{ scope.row.pay_status === 20 ? "已付款" : "未付款" }}
              </el-tag>
            </p>
            <!-- <p>
              上餐状态：
              <el-tag
                class="am-badge"
                :type="scope.row.delivery_status === 10 ? 'info' : 'success'"
              >
                {{ scope.row.delivery_status === 10 ? "未上餐" : "已上餐" }}
              </el-tag>
            </p> -->
            <p>
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
                v-if="scope.row.order_status === 10"
                type="success"
                plain
                size="small"
                @click="complete(scope.row)"
              >
                完成订单
              </el-button>
            </div>
            <div class="price" style="margin-top: 8px">
              <el-button
                v-if="
                  scope.row.pay_status === 30 && scope.row.order_status === 10
                "
                type="warning"
                plain
                size="small"
                @click="setPaid(scope.row)"
              >
                设置付款
              </el-button>
            </div>
            <div class="price" style="margin-top: 8px">
              <el-button size="small" @click="printMenuOrder(scope.row)">
                打印小票
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
      <span>订单号：{{ baseInfoList[0].order_no }}</span>
      <span>就餐人数：{{ baseInfoList[0].people }}人</span>
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
              <span>{{ row.merchant_user.nickname || "商家前台" }}</span>
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
          <div>餐具/调料费：+ ￥{{ row.ware_fee }}</div>
          <div>
            实付款金额：
            <span style="color: rgb(255, 73, 73)">￥{{ row.pay_price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <template v-if="scope.row.pay_status === 30">
            <div class="price">
              <el-tag type="danger" size="medium">线下付款</el-tag>
            </div>
          </template>
          <template v-else-if="scope.row.pay_type === 20">
            <div class="price">
              <el-tag type="info" size="medium">余额支付</el-tag>
            </div>
          </template>
          <template v-else-if="scope.row.pay_type === 10">
            <div class="price">
              <el-tag type="success" size="medium">微信支付</el-tag>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="餐桌/包间">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.table_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="交易状态" width="160">
        <template slot-scope="scope">
          <p>
            付款状态：
            <el-tag
              class="am-badge"
              :type="scope.row.pay_status === 20 ? 'success' : 'info'"
            >
              {{ scope.row.pay_status === 20 ? "已付款" : "未付款" }}
            </el-tag>
          </p>
          <!-- <p>
            上餐状态：
            <el-tag
              class="am-badge"
              :type="scope.row.delivery_status === 10 ? 'info' : 'success'"
            >
              {{ scope.row.delivery_status === 10 ? "未上餐" : "已上餐" }}
            </el-tag>
          </p> -->
          <p>
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
      <el-table-column width="200" label="操作">
        <template>
          <div
            v-if="
              baseInfoList[0].pay_status !== 20 &&
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
          <div
            v-if="
              baseInfoList[0].pay_status === 30 &&
              baseInfoList[0].order_status === 10
            "
            class="price"
          >
            <el-button
              style="margin-top: 8px"
              type="warning"
              plain
              size="small"
              @click="setPaid(baseInfoList[0])"
            >
              设置付款
            </el-button>
          </div>
          <div v-if="baseInfoList[0].order_status === 10" class="price">
            <el-button
              style="margin-top: 8px"
              type="success"
              plain
              size="small"
              @click="complete(baseInfoList[0])"
            >
              完成订单
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
          <div class="price">
            <el-button
              style="margin-top: 8px"
              plain
              size="small"
              @click="printMenuOrder(baseInfoList[0])"
            >
              打印小票
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
            <el-col :span="6">
              <el-image
                :preview-src-list="[scope.row.thumbnail_url]"
                :src="scope.row.thumbnail_url"
              ></el-image>
            </el-col>
            <el-col :span="18">
              <span style="padding-right: 8px">{{ scope.row.name }}</span>
              <el-tag
                :type="scope.row.extract_clerk_id ? 'success' : 'danger'"
                style="cursor: pointer"
                @click="() => delivery(scope.row)"
              >
                {{ scope.row.extract_clerk_id ? "已上餐" : "未上餐" }}
              </el-tag>
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
      <el-table-column prop="" label="操作">
        <template slot-scope="{ row }">
          <el-button
            v-if="!row.extract_clerk_id"
            type="primary"
            :disabled="baseInfoList[0].order_status !== 10"
            @click="delivery(row)"
          >
            {{
              baseInfoList[0].order_status === 10
                ? "设置为已上餐"
                : "订单已完成"
            }}
          </el-button>
          <el-button v-else type="success" :disabled="true">已上餐</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 30px"></div>
    <update-price ref="updatePrice" @fetchData="fetchInfo" />
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import UpdatePrice from "./updatePrice/index.vue";
  import {
    getMenuOrders,
    getOrderInfo,
    agreeCancelOrder,
    refuseCancelOrder,
    completeOrder,
    orderGoodsServing,
    printOrder,
    setOrderPaid,
  } from "@/api/menuorders";
  import { getTableList } from "@/api/table";
  export default {
    name: "MenuOrder",

    components: { UpdatePrice },

    data() {
      return {
        tableId: undefined,
        tableOptions: [],
        avatar: require("@/assets/default_avatar.svg"),
        merchant: this.$store.getters["passport/merchant"],
        title: [
          {
            1: "商品信息",
            2: "单价/数量",
            3: "餐具/调料费",
            4: "实付款",
            // 5: "买家昵称",
            6: "支付方式",
            7: "餐桌/包间",
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
            value: 11,
            label: "待收款",
          },
          {
            value: 20,
            label: "待上餐",
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
            this.fetchData();
          }
        );
      },
      complete(food) {
        this.$baseConfirm(
          "请先确认用户已经付款，您是否要完成此订单？",
          null,
          async () => {
            await completeOrder(food.id);
            this.$baseMessage("已成功完成订单", "success");
            this.fetchData();
            if (this.baseInfoList[0]) {
              this.fetchInfo(this.baseInfoList[0].id);
            }
          }
        );
      },
      delivery(order) {
        if (order.extract_clerk_id) {
          return;
        }
        this.$baseConfirm("您是否要设置为已上餐？", null, async () => {
          await orderGoodsServing({
            order_id: order.order_id,
            order_goods_id: order.id,
          });
          this.$baseMessage("设置成功", "success");
          if (this.baseInfoList[0]) {
            this.fetchInfo(this.baseInfoList[0].id);
          }
          this.fetchData();
        });
      },
      refuseCancelOrder() {
        this.$baseConfirm("是否要拒绝用户退单？", null, async () => {
          await refuseCancelOrder(this.baseInfoList[0].id);
          this.$baseMessage("拒绝成功", "success");
          this.fetchInfo(this.baseInfoList[0].id);
          this.fetchData();
        });
      },
      printMenuOrder(order) {
        this.$baseConfirm("是否要打印订单小票？", null, async () => {
          await printOrder(order.id);
          this.$baseMessage("打印完成", "success");
        });
      },
      getOrderStatusTagType(val) {
        switch (val) {
          case 10:
            return "primary";
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
          case 10:
            return "进行中";
          case 20:
            return "已取消";
          case 21:
            return "待取消";
          case 30:
            return "已完成";
        }
      },
      async setPaid(order) {
        this.$baseConfirm("是否设置订单状态为已付款？", null, async () => {
          await setOrderPaid(order.id);
          this.fetchData();
          this.fetchInfo(order.id);
          this.$baseMessage("设置完成", "success");
        });
      },
      async fetchData(val = this.orderApiParams) {
        if (!val.status) {
          val.status = undefined;
        }
        const [orderResp, tablesResp] = await Promise.all([
          getMenuOrders(val),
          getTableList({ page_index: 1, page_size: 200 }),
        ]);
        this.tableOptions = tablesResp.data.rows.map((tab) => ({
          label: tab.name,
          value: tab.id,
        }));
        this.tableOptions.unshift({
          label: "全部",
          value: undefined,
        });
        this.tableList = orderResp.data.rows;
        this.count = orderResp.data.count;
      },
      async fetchInfo(id) {
        const { data } = await getOrderInfo(id);
        if (!data.merchant_user) {
          data.merchant_user = {};
        }
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
      changeTable(val) {
        this.orderApiParams = {
          ...this.orderApiParams,
          table_id: this.tableId,
          page_index: 1,
          page_size: 10,
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
  .goods-price-col .cell {
    height: 100%;
    position: absolute;
    display: flex;
    width: 100%;
    top: 0;
    flex-direction: column;
    justify-content: space-around;
  }
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
  .btn {
    position: relative;
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
  .item_top > span {
    padding-right: 20px;
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
