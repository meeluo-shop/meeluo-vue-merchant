<template>
  <div v-if="!details_page" class="wrap">
    <el-row>
      <el-col :span="24">
        <part-header class="page_header">
          <span slot="title">获奖记录列表</span>
        </part-header>
      </el-col>
    </el-row>
    <el-row class="nav" :gutter="20" type="flex" justify="center">
      <el-col :span="24">
        <el-form>
          <vab-query-form>
            <vab-query-form-left-panel :span="24">
              <el-form-item>
                <el-select
                  v-model="value"
                  clearable
                  placeholder="获奖订单状态"
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
                    type="primary"
                    icon="el-icon-search"
                    @click="submitSearch"
                  >
                    搜索
                  </el-button>
                </template>
              </el-form-item>

              <!-- <template>
              <el-button class="btn" @click="reseTable">重置</el-button>
            </template> -->
            </vab-query-form-left-panel>
          </vab-query-form>
        </el-form>
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
    </el-table>
    <div
      v-for="(item, index) in tableList"
      :key="`_${index}`"
      class="wrap_item"
    >
      <div :key="index" class="item_top">
        <span>时间：{{ _foramat(item.created_at) }}</span>
        &nbsp; &nbsp; &nbsp;
        <span>订单号：{{ item.winning_no }}</span>
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
          prop="winning_goods"
          label="商品信息"
        >
          <template slot-scope="{ row }">
            <el-row class="commodit_border">
              <el-col :span="9">
                <el-image
                  :preview-src-list="[row.winning_goods.thumbnail_url]"
                  :src="row.winning_goods.thumbnail_url"
                ></el-image>
              </el-col>
              <el-col :span="15">
                <span>{{ row.winning_goods.name }}</span>
                <br />
                <span class="specs">
                  {{ "商品规格：" }}
                  {{ row.winning_goods.specs || "无" }}
                </span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          class="border_all"
          prop="game_ranking"
          label="获奖游戏"
          width="200"
        >
          <template slot-scope="{ row }">
            <el-row class="commodit_border">
              <el-col :span="9">
                <el-image
                  :preview-src-list="[row.game_ranking.thumbnail_url]"
                  :src="row.game_ranking.thumbnail_url"
                ></el-image>
              </el-col>
              <el-col :span="15">
                <span>{{ row.game_ranking.name }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          class="border_all"
          prop="game_ranking"
          label="获奖人信息"
          width="200"
        >
          <template slot-scope="{ row }">
            <el-row class="commodit_border">
              <el-col :span="9">
                <el-image
                  :preview-src-list="[
                    row.game_ranking.wechat_user.avatar || avatar,
                  ]"
                  :src="row.game_ranking.wechat_user.avatar || avatar"
                ></el-image>
              </el-col>
              <el-col :span="15">
                <span>{{ row.game_ranking.wechat_user.nickname }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="game_ranking.score" label="获奖分数">
          <template slot-scope="{ row }">
            <div class="price">
              {{ row.game_ranking.score }}{{ row.game_ranking.unit }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="领奖方式">
          <template slot-scope="{ row }">
            <el-tag
              v-if="row.winning_goods.prize_get_methods === 10"
              type="success"
            >
              到店自提
            </el-tag>
            <el-tag
              v-if="row.winning_goods.prize_get_methods === 20"
              type="primary"
            >
              邮寄配送
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="获奖状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.status === 10" type="info">待领取</el-tag>
            <el-tag v-if="row.status === 20" type="warning">待发货</el-tag>
            <el-tag v-if="row.status === 30" type="primary">已发货</el-tag>
            <el-tag v-if="row.status === 40" type="success">已领取</el-tag>
            <el-tag v-if="row.status === 99" type="info">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <div class="price">
              <el-button
                type="primary"
                plain
                size="small"
                @click="handleClick(row)"
              >
                订单详情
              </el-button>
            </div>
            <div class="price" style="margin-top: 8px">
              <el-button
                v-if="row.status === 20"
                type="warning"
                plain
                size="small"
                @click="handleClick(row)"
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
      <el-col :span="23">
        <part-header class="page_header">
          <span slot="title">订单信息</span>
        </part-header>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
    <div class="item_top">
      <span>时间：{{ _foramat(baseInfoList[0].created_at) }}</span>
      &nbsp; &nbsp; &nbsp;
      <span>订单号：{{ baseInfoList[0].winning_no }}</span>
    </div>
    <el-table
      style="margin: 0"
      class="detailsTable"
      border
      :show-header="false"
      :data="baseInfoList"
    >
      <el-table-column
        class="border_all"
        width="200"
        prop="game_ranking"
        label="获奖游戏"
      >
        <template slot-scope="{ row }">
          <el-row class="commodit_border">
            <el-col :span="9">
              <el-image
                :preview-src-list="[row.game_ranking.thumbnail_url]"
                :src="row.game_ranking.thumbnail_url"
              ></el-image>
            </el-col>
            <el-col :span="15">
              <span>{{ row.game_ranking.name }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        class="border_all"
        prop="game_ranking"
        label="获奖人信息"
      >
        <template slot-scope="{ row }">
          <el-row class="commodit_border">
            <el-col :span="9">
              <el-image
                :preview-src-list="[
                  row.game_ranking.wechat_user.avatar || avatar,
                ]"
                :src="row.game_ranking.wechat_user.avatar || avatar"
              ></el-image>
            </el-col>
            <el-col :span="15">
              <span>{{ row.game_ranking.wechat_user.nickname }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="" width="200" label="商品信息">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="8">
              <el-image
                :preview-src-list="[scope.row.thumbnail_url]"
                :src="scope.row.winning_goods.thumbnail_url"
              ></el-image>
            </el-col>
            <el-col :span="16">
              <span>{{ scope.row.winning_goods.name }}</span>
              <br />
              <span class="specs">
                {{ "商品规格：" }}{{ scope.row.winning_goods.specs || "无" }}
              </span>
              <br />
              <span class="specs">
                {{ "商品价格：" }}¥ {{ scope.row.winning_goods.price }}
              </span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="game_ranking.score" label="获奖分数">
        <template slot-scope="{ row }">
          <div class="price">
            {{ row.game_ranking.score }}{{ row.game_ranking.unit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="领奖方式">
        <template slot-scope="{ row }">
          <el-tag
            v-if="row.winning_goods.prize_get_methods === 10"
            type="success"
          >
            到店自提
          </el-tag>
          <el-tag
            v-if="row.winning_goods.prize_get_methods === 20"
            type="primary"
          >
            邮寄配送
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="获奖状态">
        <template slot-scope="{ row }">
          <el-tag v-if="row.status === 10" type="info">待领取</el-tag>
          <el-tag v-if="row.status === 20" type="warning">待发货</el-tag>
          <el-tag v-if="row.status === 30" type="primary">已发货</el-tag>
          <el-tag v-if="row.status === 40" type="success">已领取</el-tag>
          <el-tag v-if="row.status === 99" type="info">已过期</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          (baseInfoList[0].status >= 20 && baseInfoList[0].status !== 99) ||
          (baseInfoList[0].winning_goods.prize_get_methods === 10 &&
            baseInfoList[0].status < 30)
        "
        label="操作"
      >
        <template>
          <el-button
            v-if="!baseInfoList[0].extract_clerk_id"
            type="primary"
            @click="deliverPrize(baseInfoList[0])"
          >
            发货
          </el-button>
          <el-button
            v-else
            type="primary"
            @click="deliverPrize(baseInfoList[0])"
          >
            查看发货信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row
      v-if="
        baseInfoList[0].winning_goods.prize_get_methods === 20 &&
        baseInfoList[0].winning_address
      "
    >
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">收货地址</span>
        </part-header>
      </el-col>
    </el-row>
    <el-table
      v-if="
        baseInfoList[0].winning_goods.prize_get_methods === 20 &&
        baseInfoList[0].winning_address
      "
      border
      :data="baseInfoList"
      class="detailsTable"
    >
      <el-table-column prop="winning_address.name" label="收货人">
        <template slot-scope="{ row }">
          <template v-if="row.winning_address && row.winning_address.name">
            {{ row.winning_address.name }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="winning_address.phone" label="收货电话">
        <template slot-scope="{ row }">
          <template v-if="row.winning_address && row.winning_address.phone">
            {{ row.winning_address.phone }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="" label="收货地址">
        <template slot-scope="{ row }">
          <template v-if="row.winning_address && row.winning_address.address">
            {{ row.winning_address.province_name }}
            {{ row.winning_address.city_name }}
            {{ row.winning_address.county_name }}
            {{ row.winning_address.address }}
          </template>
          <template v-else>
            <el-tag type="info">无</el-tag>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="baseInfoList[0].winning_goods.prize_get_methods === 10">
      <el-col class="chunk_header" :span="24">
        <part-header class="page_header">
          <span slot="title">自提门店信息</span>
        </part-header>
      </el-col>
    </el-row>
    <el-table
      v-if="baseInfoList[0].winning_goods.prize_get_methods === 10"
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
    <deliver-prize ref="deliverPrize" @fetchData="fetchInfo" />
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import { theWinningRecordList, theWinningRecordInfo } from "@/api/prize";
  import DeliverPrize from "./deliver";
  export default {
    name: "GameWinning",

    components: { DeliverPrize },

    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        merchant: this.$store.getters["passport/merchant"],
        title: [
          {
            1: "商品信息",
            2: "获奖游戏",
            3: "获奖人信息",
            4: "获奖分数",
            5: "领奖方式",
            6: "订单状态",
            7: "操作",
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
            label: "待领取",
          },
          {
            value: 20,
            label: "待发货",
          },
          {
            value: 30,
            label: "已发货",
          },
          {
            value: 40,
            label: "已领取",
          },
          {
            value: 99,
            label: "已过期",
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
      async deliverPrize(row) {
        this.$refs["deliverPrize"].showEdit(row);
      },
      async fetchData(val = this.orderApiParams) {
        const { data } = await theWinningRecordList(val);
        this.tableList = data.rows;
        this.count = data.count;
      },
      async fetchInfo(id) {
        const { data } = await theWinningRecordInfo(id);
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
  .btn {
    position: relative;
    top: 5px;
    left: -5px;
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
