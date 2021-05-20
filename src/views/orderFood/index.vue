<template>
  <div class="order-food">
    <div v-if="orderGoodsList.length" class="shopping-box">
      <div class="shopping">
        <div class="eat-people">
          <span class="demonstration">就餐人数：</span>
          <el-slider
            v-model="people"
            :min="1"
            :max="20"
            style="width: 130px; padding: 0 12px"
          ></el-slider>
          <span>{{ people }}人</span>
        </div>
        <ul class="checked-list" style="padding-top: 60px">
          <li v-for="{ goods, specs, sku } in orderGoodsList" :key="sku.id">
            <div class="checked-top">
              <p class="good-name" :title="goods.name">{{ goods.name }}</p>
              <div class="checked-top-right">
                <el-input-number
                  v-model="sku.count"
                  :min="1"
                  :max="sku.stock"
                  :precision="0"
                  size="mini"
                  style="width: 100px"
                  @change="computePrice(orderGoodsList)"
                ></el-input-number>
                <i
                  slot="reference"
                  class="el-icon-delete"
                  @click="delGood(goods.id, sku.id)"
                ></i>
              </div>
            </div>
            <div class="checked-bottom">
              <p>
                <template v-for="spec in specs">
                  {{ spec.spec_value.value }};
                </template>
              </p>
              <span class="good-price">
                <el-tag
                  v-if="
                    userinfo &&
                    userinfo.grade &&
                    userinfo.grade.equity &&
                    goods.is_enable_grade
                  "
                  size="mini"
                  effect="dark"
                  type="danger"
                >
                  会员价
                </el-tag>
                ￥{{ ((sku.gradePrice || sku.price) * sku.count).toFixed(2) }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="food-wrap">
      <div class="food-search">
        <el-select
          v-model="tableId"
          filterable
          placeholder="请选择餐桌"
          style="width: 180px; margin-right: 10px"
        >
          <el-option
            v-for="item in tableList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          v-model="queryForm.name"
          placeholder="请输入菜品名称"
          @change="getList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="getList"
          >
            查询
          </el-button>
        </el-input>
      </div>
      <ul class="food-list">
        <li
          v-for="item in goodList"
          :key="item.id"
          :title="item.selling_point"
          @click="goodClick(item.id)"
        >
          <div v-if="!checkStock(item)" class="no-good">已售罄</div>
          <el-image :src="item.thumbnail.url" fit="contain"></el-image>
          <div class="food-info">
            <p>{{ item.name }}</p>
            <span>￥{{ item.min_price }}</span>
          </div>
        </li>
      </ul>
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
    <el-menu default-active="0" class="el-menu-vertical-demo">
      <template v-for="(item, index) in categoryList">
        <el-submenu
          v-if="item.children && item.children.length"
          :key="item.id"
          :index="String(index)"
        >
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(subCat, subIndex) in item.children"
              :key="subCat.id"
              :index="String(subIndex)"
              @click="categoryClick(item)"
            >
              {{ subCat.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="String(index)">
          <div @click="categoryClick(item)">
            <i v-if="item.id === undefined" class="el-icon-menu"></i>
            <i v-else class="el-icon-link"></i>
            <span slot="title">{{ item.name }}</span>
          </div>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="total-box">
      <div class="flex">
        <el-button
          size="small"
          icon="el-icon-user-solid"
          type="warning"
          style="margin-left: 12px"
          @click="showSelectUser"
        >
          选择会员
        </el-button>
        <p
          v-if="userinfo"
          style="margin-left: 20px; display: flex; align-items: center"
        >
          <el-image
            :src="userinfo.avatar || avatar"
            style="
              height: 28px;
              width: 28px;
              border-radius: 14px;
              margin-right: 6px;
            "
          ></el-image>
          {{ userinfo.nickname }}
          <i
            class="el-icon-circle-close"
            style="
              font-size: 18px;
              color: #999;
              cursor: pointer;
              padding-left: 4px;
            "
            @click="clearUser"
          ></i>
        </p>
        <p style="margin-left: 20px">
          <el-radio-group v-model="payMethod">
            <el-radio-button :label="10">餐前支付</el-radio-button>
            <el-radio-button v-if="userinfo" :label="20">
              余额支付
            </el-radio-button>
            <el-radio-button :label="99">餐后支付</el-radio-button>
          </el-radio-group>
        </p>
        <p style="padding-left: 20px">
          数量：
          <span class="blue">共{{ goodsCount }}份</span>
        </p>
        <p style="padding-left: 12px">
          餐具费：
          <span class="red">¥{{ Number(wareFee).toFixed(2) }}</span>
        </p>
        <p style="padding-left: 12px">
          总金额：
          <span class="red">
            ¥{{ Number(totalPrice + wareFee).toFixed(2) }}
          </span>
        </p>

        <el-button
          :disabled="!goodsCount"
          size="small"
          icon="el-icon-s-order"
          type="primary"
          style="margin-left: 20px; margin-right: 12px"
          @click="showOrderInfo"
        >
          提交订单
        </el-button>
      </div>
    </div>
    <edit ref="edit" :good-info="goodInfo" @save="save"></edit>
    <select-user ref="selectUser" @select="selectUser"></select-user>
    <el-dialog
      title="确认订单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="() => (dialogFormVisible = false)"
    >
      <el-form ref="form" label-width="120px" style="font-weight: bolder">
        <el-form-item v-if="userinfo" label="会员用户" prop="userId">
          <div style="display: flex">
            <el-image
              :src="userinfo.avatar || avatar"
              style="
                height: 28px;
                width: 28px;
                border-radius: 14px;
                margin-right: 6px;
              "
            ></el-image>
            {{ userinfo.nickname }}
          </div>
        </el-form-item>
        <el-form-item v-if="userinfo" label="用户余额" prop="balance">
          <div class="blue">
            ¥ {{ userinfo.balance }}
            <el-tag
              v-if="payMethod === 20 && wareFee + totalPrice > userinfo.balance"
              size="mini"
              effect="plain"
              type="danger"
            >
              余额不足
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="餐桌/包间" prop="tableId">
          <el-select
            v-model="tableId"
            filterable
            placeholder="请选择餐桌"
            style="width: 180px"
          >
            <el-option
              v-for="item in tableList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就餐人数" prop="people">
          <div style="display: flex; align-items: center">
            <el-slider
              v-model="people"
              :min="1"
              :max="20"
              style="width: 160px; padding: 0 12px 0 8px"
            ></el-slider>
            <span>{{ people }}人</span>
          </div>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-radio-group v-model="payMethod">
            <el-radio-button :label="10">餐前支付</el-radio-button>
            <el-radio-button v-if="userinfo" :label="20">
              余额支付
            </el-radio-button>
            <el-radio-button :label="99">餐后支付</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="blue" label="菜品数量" prop="goodsCount">
          共 {{ goodsCount }} 份
        </el-form-item>
        <el-form-item class="red" label="菜品金额" prop="totalPrice">
          + ¥ {{ totalPrice.toFixed(2) }}
          <el-tag
            v-if="userinfo && userinfo.grade && userinfo.grade.equity"
            size="mini"
            effect="dark"
            type="danger"
          >
            会员价
          </el-tag>
        </el-form-item>
        <el-form-item class="red" label="餐具/调料费" prop="wareFee">
          + ¥ {{ wareFee.toFixed(2) }}
        </el-form-item>
        <el-form-item class="red" label="订单总额" prop="orderPrice">
          ¥ {{ (wareFee + totalPrice).toFixed(2) }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => (dialogFormVisible = false)">
          暂不确认
        </el-button>
        <el-button
          type="primary"
          :disabled="
            userinfo &&
            payMethod === 20 &&
            wareFee + totalPrice > userinfo.balance
          "
          @click="submit"
        >
          确定订单
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Edit from "./components/OrderFoodEdit";
  import { getList, getCategoryList, getDetail } from "@/api/goods";
  import { getTableList } from "@/api/table";
  import { submitOrder } from "@/api/menuorders";
  import SelectUser from "../user/index/components/SelectUser";

  export default {
    name: "OrderFood",
    components: { Edit, SelectUser },
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        people: 1,
        goodList: [],
        categoryList: [],
        checkedGoodList: [],
        total: 0,
        totalPrice: 0,
        userinfo: null,
        dialogFormVisible: false,
        tableId: null,
        layout: "total, sizes, prev, pager, next, jumper",
        queryForm: {
          page_index: 1,
          page_size: 50,
          category_id: undefined,
          type: 20,
          name: undefined,
          is_active: 1,
        },
        goodsCount: 0,
        payMethod: 10,
        goodInfo: {},
        orderGoodsList: [],
        tableList: [],
        wareFee: 0,
      };
    },
    watch: {
      people(val) {
        this.computeWareFee();
      },
      tableId(val) {
        this.tableInfo = this.tableList.find((table) => table.id === val);
        this.computeWareFee();
      },
      orderGoodsList(val) {
        this.computePrice(val);
      },
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.getCategorys();
        this.getTables();
        this.tableInfo = null;
        this.people = 1;
        this.payMethod = 10;
        this.userinfo = null;
        this.checkedGoodList = [];
        this.orderGoodsList = [];
      },
      computeWareFee() {
        if (this.tableInfo) {
          this.wareFee = this.tableInfo.ware_fee * this.people;
        } else {
          this.wareFee = 0;
        }
      },
      async selectUser(user) {
        this.userinfo = user;
        this.computePrice(this.orderGoodsList);
      },
      clearUser() {
        this.userinfo = null;
        this.computePrice(this.orderGoodsList);
      },
      computePrice(val) {
        let count = 0;
        let totalPrice = 0;
        for (const { sku, goods } of val) {
          count += sku.count;
          if (
            goods.is_enable_grade &&
            this.userinfo &&
            this.userinfo.grade.equity
          ) {
            if (!sku.originalPrice) {
              sku.originalPrice = Number(sku.price);
            }
            sku.price = (sku.originalPrice * this.userinfo.grade.equity) / 100;
          } else {
            sku.price = Number(sku.price);
          }
          totalPrice += Number(sku.price * sku.count) || 0;
        }
        this.totalPrice = totalPrice;
        this.goodsCount = count;
      },
      async getTables() {
        const { data } = await getTableList({
          page_index: 1,
          page_size: 500,
        });
        this.tableList = data.rows;
        if (this.tableList.length) {
          this.tableInfo = this.tableList[0];
          this.tableId = this.tableInfo.id;
        }
      },
      conversion(data) {
        const root = [];
        for (const item of data) {
          if (!item.superior_id) {
            root.push(item);
          }
          for (const item2 of data) {
            if (item2.superior_id === item.id) {
              if (!item.children) {
                item.children = [];
              }
              item.children.push(item2);
            }
          }
        }
        return root;
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.getList();
      },
      delGood(goodsId, skuId) {
        const index = this.checkedGoodList.findIndex(
          (good) => good.id === goodsId
        );
        if (index < 0) {
          return;
        }
        const good = this.checkedGoodList[index];
        if (good.skus.length <= 1) {
          this.checkedGoodList.splice(index, 1);
        } else {
          const sku = good.skus.find((sku) => sku.id === skuId);
          sku.count = 0;
        }
        this.getOrderGoodList();
        // this.$baseMessage("删除成功", "success");
      },
      checkStock(item) {
        let stock = 0;
        for (const sku of item.skus) {
          stock += sku.stock;
        }
        return stock > 0;
      },
      showSelectUser() {
        this.$refs["selectUser"].show();
      },
      showOrderInfo() {
        if (!this.goodsCount) {
          return;
        }
        this.dialogFormVisible = true;
      },
      // 获取分类列表
      async getCategorys() {
        this.getList();
        const { data } = await getCategoryList({
          type: 20,
          page_index: 1,
          page_size: 200,
        });
        this.categoryList = data.rows || [];
        this.categoryList.unshift({
          id: undefined,
          name: "全部种类",
          order: 0,
          superior_id: null,
          type: 20,
        });
        this.conversion(this.categoryList);
      },
      // 获取商品列表
      async getList() {
        this.listLoading = true;
        const { data } = await getList(this.queryForm);
        this.goodList = data.rows || [];
        this.total = data.count || 0;
        this.listLoading = false;
      },
      // 商品分类点击
      categoryClick(item) {
        if (this.queryForm.category_id === item.id) {
          return;
        }
        if (item.children && item.children.length) {
          return;
        }
        this.queryForm.category_id = item.id;
        this.queryForm.page_index = 1;
        this.getList();
      },
      // 商品点击
      async goodClick(id) {
        const { data } = await getDetail(id);
        if (!this.checkStock(data)) {
          this.$baseMessage("此菜品已售罄，请增加库存！", "error");
          return;
        }
        if (data.skus.length === 1) {
          data.skus[0].count = 1;
          this.save(data, data.skus[0]);
          return;
        }
        this.goodInfo = data;
        this.$refs["edit"].showEdit();
      },
      getOrderGoodList() {
        const orderGoodsList = [];
        this.checkedGoodList.forEach((food) => {
          for (const sku of food.skus) {
            if (!sku.count) {
              continue;
            }
            const cart = {
              goods: food,
              sku,
              specs: [],
              number: sku.count,
            };
            const values = sku.spec_sku_id.split("_");
            for (const valueId of values) {
              for (const mapping of food.spec_mappings || []) {
                if (mapping.spec_value_id === Number(valueId)) {
                  cart.specs.push(mapping);
                }
              }
            }
            orderGoodsList.push(cart);
          }
        });
        this.orderGoodsList = orderGoodsList;
        console.log(this.orderGoodsList);
      },
      // 获取已选中的列表
      save(goodsInfo, sku) {
        const target = this.checkedGoodList.find(
          (item) => item.id === goodsInfo.id
        );
        if (!target) {
          this.checkedGoodList.push(goodsInfo);
        } else {
          const targetSku = target.skus.find((item) => item.id === sku.id);
          if (targetSku && targetSku.count) {
            targetSku.count += sku.count;
          } else {
            targetSku.count = sku.count;
          }
        }
        this.getOrderGoodList();
      },
      async submit() {
        await submitOrder({
          table_id: this.tableId,
          pay_type: this.payMethod,
          people: this.people,
          user_id: this.userinfo ? this.userinfo.id : undefined,
          goods_skus: this.orderGoodsList.map((item) => ({
            goods_id: item.goods.id,
            spec_sku_id: item.sku.spec_sku_id,
            goods_num: item.sku.count,
          })),
        });
        this.$baseMessage("提单提交成功", "success");
        this.dialogFormVisible = false;
        this.init();
      },
    },
  };
</script>

<style lang="scss" scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
    border-left: 1px solid #e6e6e6;
    overflow-y: scroll;
  }
  .total-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    z-index: 1;
    // box-shadow: 0px -1px 6px #e4e4e4;
    border: 1px solid #e6e6e6;

    .flex {
      display: flex;
      align-items: center;
      float: left;
      height: 100%;
      justify-content: space-between;
      width: 100%;
    }
  }
  .order-food {
    display: flex;
    max-height: calc(100vh - 60px - 55px - 20px * 2 - 56px);

    .blue {
      color: #1890ff;
      font-size: 15px;
      font-weight: bolder;
    }
    .red {
      color: #ff4f18;
      font-weight: bolder;
      font-size: 15px;
    }
    .shopping-box {
      background: #fff;
      flex-basis: 280px;
      min-width: 280px;
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      overflow: hidden;
      position: relative;
    }
    .shopping {
      overflow-y: scroll;
      height: 100%;
      padding-right: 50px;
      width: 100%;
      box-sizing: content-box;
      .eat-people {
        border-bottom: 1px solid #e6e6e6;
        width: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 60px;
        background: #fff;
        z-index: 2;
      }
      .checked-list {
        li {
          padding: 6px 10px 10px;

          border-bottom: 1px solid #e6e6e6;
          .checked-top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .checked-top-right {
              white-space: nowrap;
            }
            .good-name {
              font-size: 15px;
              position: relative;
              padding-left: 8px;
              padding-right: 6px;
              &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 4px;
                height: 90%;
                border-radius: 2px;
                background-color: #1890ff;
              }
            }
            i {
              margin-left: 12px;
              cursor: pointer;
            }
          }
          .checked-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0px;
            font-size: 13px;
            color: #777;
          }
          .good-price {
            color: #ff4f18;
            font-size: 14px;
            font-weight: bolder;
            white-space: nowrap;
          }
        }
      }
    }
    .food-wrap {
      flex: 1;
      min-width: 348px;
      margin: 16px;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;

      .food-search {
        min-height: 32px;
        display: flex;
      }
      .food-list {
        margin: 16px 0 0;
        flex: 1;
        min-height: 360px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow-y: scroll;
        padding-right: 50px;
        width: 100%;
        box-sizing: content-box;
        li {
          position: relative;
          width: 160px;
          height: 160px;
          margin-right: 8px;
          margin-bottom: 8px;
          border: 1px solid #e6e6e6;
          cursor: pointer;
          border-radius: 3px;
          overflow: hidden;
          &:hover {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
            .el-image {
              transform: scale(1.2);
            }
          }
          .no-good {
            // opacity: 0.2;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            line-height: 160px;
            z-index: 1;
            font-size: 20px;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-weight: bolder;
          }
          .el-image {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
          .food-info {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 52px;
            background-color: rgba(255, 255, 255, 0.8);
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            padding-left: 8px;
            p {
              padding: 7px 0 6px;
              white-space: nowrap;
              width: 100%;
              font-size: 16px;
              font-weight: bolder;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 16px;
              color: #333;
              margin: 0;
            }
            span {
              font-size: 15px;
              font-weight: bolder;
              color: #ff4f18;
              position: relative;
              left: -2px;
            }
          }
        }
      }
      .el-pagination {
        min-height: 32px;
        text-align: center;
      }
    }
    .type-list {
      flex-basis: 150px;
      min-width: 150px;
      text-align: center;
      border: 1px solid #c0c4cc;
      li {
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        border-bottom: 1px solid #c0c4cc;
        background: #dcdfe6;
        transition: 0.2s;
        &:hover {
          color: #1890ff;
          background-color: #fff;
          font-weight: bolder;
          opacity: 0.8;
        }
        &.ac {
          color: #1890ff;
          background-color: #fff;
          font-weight: bolder;
        }
      }
    }
  }
</style>
