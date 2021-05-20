<template>
  <div>
    <el-dialog
      title="新增游戏奖品"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="580px"
      @close="close"
    >
      <el-form
        ref="form"
        :label-position="labelPosition"
        :model="form"
        label-width="auto"
      >
        <el-form-item label="目标分数：" required>
          <el-input
            v-model.trim="form.score"
            type="number"
            style="width: 240px"
            placeholder="请输入目标分数"
            autocomplete="off"
            @input="inputChange"
          ></el-input>
          {{ gameInfo.game.unit }}
          <div class="remark">
            玩家游戏挑战成绩达到目标分数后，即可获得对应的奖品
          </div>
        </el-form-item>
        <el-form-item label="奖品类型：" required>
          <el-tooltip class="item" content="奖品类型" placement="top">
            <el-radio-group v-model="form.type" @change="changeType">
              <el-radio :label="10">商品</el-radio>
              <el-radio :label="20">菜品</el-radio>
            </el-radio-group>
          </el-tooltip>
        </el-form-item>
        <el-form-item required label="选择游戏奖品：">
          <el-button
            v-if="form.type === 10"
            type="primary"
            plain
            @click="selectGoodsHandle"
          >
            选择商品
          </el-button>
          <el-button
            v-if="form.type === 20"
            type="primary"
            plain
            @click="selectGoodsHandle"
          >
            选择菜品
          </el-button>
          <div v-if="goodsInfo && goodsInfo.thumbnail" class="prize-info">
            <el-image
              class="image-box"
              :src="goodsInfo.thumbnail.url"
            ></el-image>
            <span class="title">{{ goodsInfo.name }}</span>
          </div>
          <!-- <el-button
            v-if="form.type === 30"
            type="warning"
            plain
            @click="selectCouponHandle"
          >
            选择优惠券
          </el-button>
          <div v-if="couponInfo" class="prize-info">
            <div class="coupon-wrapper">
              <div
                class="coupon-item"
                :style="`background: ${getCouponColor()}`"
              >
                <i class="before" style="background: rgb(255, 255, 255)"></i>
                <div
                  class="left-content dis-flex flex-dir-column flex-x-center flex-y-center"
                  :style="`background: ${getCouponColor()}`"
                >
                  <div v-if="couponInfo.type === 10" class="content-top">
                    <span class="unit">￥</span>
                    <span class="price">{{ couponInfo.reduce_price }}</span>
                  </div>
                  <div v-if="couponInfo.type === 20" class="content-top">
                    <span class="price">{{ couponInfo.discount }}折</span>
                  </div>
                  <div class="content-bottom">
                    <span>满{{ couponInfo.min_price }}元可用</span>
                  </div>
                </div>
                <div
                  class="right-receive dis-flex flex-dir-column flex-x-center flex-y-center"
                >
                  <span style="margin-top: 12px">立即</span>
                  <span>领取</span>
                </div>
              </div>
            </div>
          </div> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <select-goods
      ref="selectGoods"
      :type="form.type"
      @select="selectedGoods"
    ></select-goods>
    <select-coupon ref="selectCoupon" @select="selectedCoupon"></select-coupon>
  </div>
</template>

<script>
  import SelectGoods from "../../../goods/index/components/SelectGoods";
  import SelectCoupon from "../../../coupon/index/components/SelectCoupon";
  export default {
    name: "AddPrize",
    components: { SelectCoupon, SelectGoods },
    props: {
      labelPosition: {
        type: String,
        default: "left",
      },
    },
    data() {
      return {
        id: null,
        gameInfo: {
          game: {},
        },
        goodsInfo: null,
        couponInfo: null,
        form: {
          type: 10,
          // get_methods: 20,
        },
        dialogFormVisible: false,
      };
    },
    watch: {
      goodsInfo(val) {
        if (val && val.id) {
          this.form.goods_id = val.id;
        }
      },
      couponInfo(val) {
        if (val && val.id) {
          this.form.coupon_id = val.id;
        }
      },
    },
    methods: {
      inputChange(e) {
        this.$forceUpdate();
      },
      getCouponColor() {
        switch (this.couponInfo.color) {
          case 10:
            return "#ff0000";
          case 20:
            return "#007bff";
          case 30:
            return "#ff8400";
          case 40:
            return "#35bb00";
          case 50:
            return "#b300a3";
          default:
            return "#ff0000";
        }
      },
      selectedGoods(data) {
        this.goodsInfo = data;
      },
      selectGoodsHandle() {
        this.$refs["selectGoods"].show();
      },
      selectedCoupon(data) {
        this.couponInfo = data;
      },
      selectCouponHandle() {
        this.$refs["selectCoupon"].show();
      },
      async show(row, prize) {
        console.log(prize);
        this.gameInfo = row;
        this.dialogFormVisible = true;
        this.goodsInfo = prize ? prize.goods : null;
        this.form.type = prize ? prize.type : 10;
        this.form.goods_id = prize ? prize.goods.id : null;
        this.form.score = prize ? prize.score : null;
        this.id = prize ? prize.id : null;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      changeType() {
        this.goodsInfo = null;
        this.form.goods_id = null;
      },
      validateForm(data) {
        const msgType = "error";
        if (!data.score) {
          this.$baseMessage("请输入目标分数", msgType);
          return false;
        }
        if (!data.type) {
          this.$baseMessage("请选择奖品类型", msgType);
          return false;
        }
        // if (!data.get_methods) {
        //   this.$baseMessage("请选择奖品领取方式", msgType);
        //   return false;
        // }
        if (!data.goods_id) {
          this.$baseMessage("请选择奖品", msgType);
          return false;
        }
        if (
          this.gameInfo.activity.prize_list.find(
            (item) => item.score === data.score && item.id !== this.id
          )
        ) {
          this.$baseMessage("当前游戏目标分数已存在", msgType);
          return false;
        }
        return true;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (!this.validateForm(this.form)) {
              return;
            }
            const prizeInfo = this.goodsInfo;
            this.$emit("finish", this.form, prizeInfo, this.id);
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .prize-info {
    border-radius: 2px;
    border: 1px solid #ebeef5;
    margin-top: 12px;
    padding: 12px;
    overflow: hidden;

    .image-box {
      float: left;
      width: 100px;
      height: 100px;
      margin-right: 12px;
      vertical-align: bottom;
      border-radius: 3px;
      border: 1px solid #ebeef5;
    }

    .title {
      vertical-align: top;
    }
  }
  .remark {
    color: #838fa1;
    font-size: 13px;
  }

  .coupon-item {
    width: 150px;
    height: 60px;
    position: relative;
    color: #fff;
    overflow: hidden;
    box-sizing: border-box;
  }
  .coupon-item i.before {
    content: "";
    position: absolute;
    z-index: 1;
    width: 16px;
    height: 16px;
    top: 50%;
    left: -8px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-border-radius: 80%;
    border-radius: 80%;
    background-color: #fff;
  }
  .coupon-item .left-content {
    position: relative;
    text-align: center;
    float: left;
    width: 70%;
    height: 100%;
    line-height: 22px;
    background-color: #e5004f;
    font-size: 12px;
  }
  .coupon-item .left-content .content-top {
    margin-top: 8px;
  }
  .coupon-item .left-content .content-top .price {
    font-size: 20px;
    font-weight: 400;
  }
  .coupon-item .left-content.color__blue {
    background: linear-gradient(-125deg, #57bdbf, #2f9de2);
  }
  .coupon-item .left-content.color__red {
    background: linear-gradient(-128deg, #ff6d6d, #ff3636);
  }
  .coupon-item .left-content.color__violet {
    background: linear-gradient(-113deg, #ef86ff, #b66ff5);
  }
  .coupon-item .left-content.color__yellow {
    background: linear-gradient(-141deg, #f7d059, #fdb054);
  }
  .coupon-item .right-receive {
    float: right;
    width: 30%;
    height: 100%;
    background-color: #4e4e4e;
    text-align: center;
    line-height: 18px;
  }
  .coupon-item .right-receive span {
    display: block;
    font-size: 12px;
  }
</style>
