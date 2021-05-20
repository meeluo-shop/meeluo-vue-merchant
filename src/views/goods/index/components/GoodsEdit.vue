<template>
  <div>
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">{{ title }}</span>
          <el-button slot="right" @click="cancel">返回</el-button>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="20">
        <el-form
          ref="form"
          v-loading="listLoading"
          :label-position="labelPosition"
          :model="form"
          label-width="180px"
        >
          <el-form-item required="" :label="`${moduleName}名称`">
            <el-input
              v-model="form.goods.name"
              :placeholder="`请输入${moduleName}名称`"
              maxlength="200"
            ></el-input>
          </el-form-item>

          <el-form-item required :label="`${moduleName}分类`">
            <el-cascader
              v-model="categoryIds"
              :placeholder="`请选择${moduleName}分类`"
              :options="categoryOptions"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>
            <router-link :to="`/food/category?type=${goodsType}`">
              <el-button class="setting-btn" type="primary" plain>
                去添加
              </el-button>
            </router-link>
          </el-form-item>
          <el-form-item required :label="`${moduleName}缩略图`">
            <vab-image-input v-model="goodsThumbnail"></vab-image-input>
          </el-form-item>
          <el-form-item required :label="`${moduleName}图片`">
            <vab-image-list-input
              v-model="goodsImages"
              :max-length="6"
            ></vab-image-list-input>
          </el-form-item>
          <el-form-item :label="`${moduleName}卖点`">
            <el-input
              v-model.trim="form.goods.selling_point"
              type="textarea"
              :placeholder="`${moduleName}卖点简述，例如：此款商品美观大方 性价比较高 不容错过`"
              autocomplete="off"
              rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="goodsType === 20"
            required
            :label="`${moduleName}单位`"
          >
            <el-input
              v-model="form.goods.unit"
              style="width: 180px"
              :placeholder="`请输入${moduleName}单位`"
              maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="goodsType === 20" label="限购数量">
            <el-input-number
              v-model="form.goods.limit"
              style="width: 180px"
              :min="0"
              :max="1000"
            ></el-input-number>
            <span class="remark" style="padding-left: 8px">0为不限制</span>
          </el-form-item>
          <el-form-item required :label="`${moduleName}序号`">
            <el-input-number
              v-model="form.goods.order"
              style="width: 180px"
              :min="0"
              :max="1000000"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="初始销量">
            <el-input-number
              v-model="form.goods.sales_initial"
              style="width: 180px"
              :min="0"
              :max="10000000000"
              type="number"
            ></el-input-number>
          </el-form-item>
          <el-form-item required :label="`${moduleName}规格`">
            <el-radio-group
              v-model="form.goods.spec_type"
              @change="handleSpecChange"
            >
              <el-radio :label="10">单规格</el-radio>
              <el-radio :label="20">多规格</el-radio>
            </el-radio-group>
            <sku-add
              v-show="form.goods.spec_type === 20"
              ref="skuAdd"
              :label-position="labelPosition"
              @on-change="handleSkuChange"
            ></sku-add>
          </el-form-item>
          <div v-if="form.goods.spec_type === 10 && form.skus[0]">
            <el-form-item :label="`${moduleName}编号`">
              <el-input
                v-model="form.skus[0].number"
                :placeholder="`请输入${moduleName}编号`"
                maxlength="50"
              ></el-input>
            </el-form-item>
            <el-form-item required :label="`${moduleName}价格`">
              <el-input-number
                v-model="form.skus[0].price"
                placeholder="（元）"
                style="width: 180px"
                type="number"
                :min="0"
                :max="100000000"
              ></el-input-number>
              （元）
            </el-form-item>
            <el-form-item required :label="`${moduleName}划线价`">
              <el-input-number
                v-model="form.skus[0].line_price"
                placeholder="（元）"
                style="width: 180px"
                type="number"
                :min="0"
                :max="100000000"
              ></el-input-number>
              （元）
            </el-form-item>
            <el-form-item required label="库存数量">
              <el-input-number
                v-model="form.skus[0].stock"
                style="width: 180px"
                :min="0"
                :max="1000000000"
              ></el-input-number>
            </el-form-item>
            <el-form-item required :label="`${moduleName}重量`">
              <el-input-number
                v-model="form.skus[0].weight"
                style="width: 180px"
                :min="0"
                :max="1000000000"
              ></el-input-number>
              （千克）
            </el-form-item>
          </div>
          <!-- <el-form-item v-if="goodsType === 20" required :label="`包装费用`">
            <el-input-number
              v-model="form.goods.packing_fee"
              style="width: 180px"
              :min="0"
              :max="1000000000"
            ></el-input-number>
            （元）
            <p class="remark">包装费用，针对点餐外卖有效，不收为0</p>
          </el-form-item> -->
          <el-form-item required label="开启会员折扣">
            <el-radio-group v-model="form.goods.is_enable_grade">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">不开启</el-radio>
            </el-radio-group>
            <router-link to="/user/grade">
              <el-button
                style="margin-left: 28px"
                class="setting-btn"
                type="primary"
                plain
              >
                前往会员设置
              </el-button>
            </router-link>
          </el-form-item>
          <el-form-item required label="开启积分赠送">
            <el-radio-group v-model="form.goods.is_points_gift">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">不开启</el-radio>
            </el-radio-group>
            <router-link to="/transaction/points/setting">
              <el-button
                style="margin-left: 28px"
                class="setting-btn"
                type="primary"
                plain
              >
                前往积分设置
              </el-button>
            </router-link>
          </el-form-item>
          <el-form-item required label="允许积分抵扣">
            <el-radio-group v-model="form.goods.is_points_discount">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="赠送优惠券">
            <span
              v-if="currentCoupon"
              style="color: #ff5c5c; vertical-align: middle"
            >
              {{ currentCoupon.name }}
              <vab-remix-icon
                icon-class="close-circle-line"
                style="cursor: pointer"
                @click="clearCoupon"
              ></vab-remix-icon>
            </span>
            <el-button
              class="setting-btn"
              type="primary"
              plain
              @click="showSelectCoupon"
            >
              选择优惠券
            </el-button>
            <span class="remark" style="padding-left: 10px">
              商品订单完成后，会赠送用户指定优惠券
            </span>
          </el-form-item>
          <el-form-item v-if="goodsType === 10" required label="商品发货方式">
            <el-radio-group v-model="form.goods.prize_get_methods">
              <el-radio :label="10">店内领取</el-radio>
              <el-radio :label="20">邮寄配送</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="form.goods.is_points_discount === 1"
            label="最高积分抵扣额度"
          >
            <el-input-number
              v-model="form.goods.max_points_discount_amount"
              placeholder="（元）"
              style="width: 180px"
              type="number"
              :min="0"
              :max="100000000"
            ></el-input-number>
            （元）
          </el-form-item>
          <el-form-item :label="`${moduleName}详情`">
            <vab-editor
              ref="content-editor"
              v-model="form.goods.content"
              :height="300"
            />
          </el-form-item>
          <el-form-item
            v-if="form.goods.prize_get_methods === 20 && goodsType === 10"
            required
            label="运费模板"
          >
            <el-select
              v-model="form.goods.delivery_id"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in deliveryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <router-link to="/goods/delivery/index">
              <el-button class="setting-btn" type="primary" plain>
                去添加
              </el-button>
            </router-link>
          </el-form-item>
          <el-form-item required label="是否上架">
            <el-radio-group v-model="form.goods.is_active">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveGoods">立即保存</el-button>
            <el-button type="danger" @click="cancel">取消保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <select-coupon ref="selectCoupon" @select="selectedCoupon"></select-coupon>
  </div>
</template>

<script>
  import { getDetail, create, doEdit, getCategoryList } from "@/api/goods";
  import { getList as getDeliveryList } from "@/api/delivery";
  import VabImageInput from "@/extra/Upload/ImageInput";
  import VabImageListInput from "@/extra/Upload/ImageListInput";
  import VabEditor from "@/extra/Editor";
  import SkuAdd from "./SkuAdd";
  import SelectCoupon from "../../../coupon/index/components/SelectCoupon";

  export default {
    name: "GoodsEdit",
    components: {
      SelectCoupon,
      SkuAdd,
      VabEditor,
      VabImageInput,
      VabImageListInput,
    },
    props: {
      goodsType: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        listLoading: false,
        labelPosition: "right",
        title: "",
        type: 1,
        categoryIds: null,
        deliveryList: [],
        categoryList: [],
        categoryOptions: [],
        goodsThumbnail: null,
        goodsImages: [],
        preData: {},
        moduleName: "商品",
        detailInfo: {},
        currentCoupon: null,
        form: {
          goods: {
            name: "",
            content: "",
            packing_fee: 0,
            order: 0,
            limit: 0,
            unit: "份",
            selling_point: "",
            thumbnail_id: null,
            delivery_id: null,
            gift_coupon_id: null,
            spec_type: 10,
            sales_initial: 0,
            is_points_discount: 0,
            max_points_discount_amount: 0,
            is_points_gift: 0,
            is_enable_grade: 0,
            is_active: 1,
            category_id: null,
            prize_get_methods: 10,
          },
          skus: [
            {
              number: "",
              price: 0,
              stock: 0,
              weight: 0,
              image_id: null,
              line_price: 0,
              spec_sku_id: "",
            },
          ],
          image_ids: [],
          spec_ids: [],
        },
      };
    },
    watch: {
      categoryIds(ids) {
        if (ids && ids.length) {
          this.form.goods.category_id = ids[ids.length - 1];
        }
      },
      goodsImages(images) {
        this.form.image_ids = images.map((item) => item.id);
      },
      goodsThumbnail(thumbnail) {
        if (thumbnail) {
          this.form.goods.thumbnail_id = thumbnail.id;
        }
      },
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1000) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
    },
    methods: {
      handleSpecChange() {
        if (this.form.goods.spec_type === 20) {
          if (this.type === 1) {
            this.$refs["skuAdd"].show();
          } else {
            this.$refs["skuAdd"].show(this.preData);
          }
        } else {
          this.$refs["skuAdd"].hide();
          if (
            this.detailInfo.spec_type === 10 &&
            this.detailInfo.skus &&
            this.detailInfo.skus.length
          ) {
            this.form.skus = this.detailInfo.skus;
          } else {
            this.form.skus = [
              {
                number: "",
                price: 0,
                stock: 0,
                weight: 0,
                image_id: null,
                line_price: 0,
                spec_sku_id: "",
              },
            ];
          }
        }
      },
      handleSkuChange(data) {
        this.form.skus = data.skus;
        this.form.spec_ids = data.spec_ids;
      },
      cancel() {
        this.$emit("cancel");
        this.$refs["skuAdd"].hide();
      },
      validateForm(data) {
        const { goods, image_ids, skus } = data;
        const msgType = "error";
        if (!goods.name) {
          this.$baseMessage(`请输入${this.moduleName}名称`, msgType);
          return false;
        }
        if (!goods.category_id) {
          this.$baseMessage(`请选择${this.moduleName}分类`, msgType);
          return false;
        }
        if (!goods.thumbnail_id) {
          this.$baseMessage(`请选择${this.moduleName}缩略图`, msgType);
          return false;
        }
        if (image_ids.length < 1) {
          this.$baseMessage(`请选择${this.moduleName}图片`, msgType);
          return false;
        }
        if (this.goodsType === 20 && !goods.unit) {
          this.$baseMessage(`请输入${this.moduleName}单位`, msgType);
          return false;
        }
        if (
          this.goodsType === 10 &&
          goods.prize_get_methods === 20 &&
          !goods.delivery_id
        ) {
          this.$baseMessage("请选择运费模板", msgType);
          return false;
        }
        skus.forEach((sku) => {
          if (!sku.image) {
            sku.image_id = null;
          }
        });
        return true;
      },
      async saveGoods() {
        if (!this.validateForm(this.form)) {
          return;
        }
        this.form.goods.type = this.goodsType;
        const data = {
          ...this.form,
        };
        if (this.type === 1) {
          await create(data);
          this.$baseMessage(`添加${this.moduleName}成功`, "success");
        } else {
          await doEdit(this.form.goods.id, data);
          this.$baseMessage(`修改${this.moduleName}成功`, "success");
        }
        this.$emit("fetchData");
        this.$emit("cancel");
      },
      getCategoryParentTree(id, ret = []) {
        const item = this.categoryList.find((cat) => cat.id === id);
        if (item) {
          ret.unshift(id);
          if (item.superior_id) {
            return this.getCategoryParentTree(item.superior_id, ret);
          }
        }
        return ret;
      },
      showSelectCoupon() {
        this.$refs["selectCoupon"].show();
      },
      selectedCoupon(data) {
        this.currentCoupon = data;
        this.form.goods.gift_coupon_id = data ? data.id : null;
      },
      clearCoupon() {
        this.currentCoupon = null;
        this.form.goods.gift_coupon_id = null;
      },
      async getDeliveryList() {
        const { data } = await getDeliveryList({ page_size: 500 });
        return data.rows.map((item) => ({
          label: item.name,
          value: item.id,
          id: item.id,
        }));
      },
      async getCategorys() {
        const { data } = await getCategoryList({
          type: this.goodsType,
          page_size: 500,
        });
        this.categoryList = data.rows;
        const list = data.rows.map((item) => ({
          label: item.name,
          value: item.id,
          id: item.id,
          superior_id: item.superior_id,
        }));
        return this.conversion(list);
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
      async showEdit(row, isCopy = false) {
        const [categoryList, deliveryList] = await Promise.all([
          this.getCategorys(),
          this.getDeliveryList(),
        ]);
        this.$refs["content-editor"].resetChangeStatus();
        this.moduleName = this.goodsType === 10 ? "商品" : "菜品";
        this.categoryOptions = categoryList;
        this.deliveryList = deliveryList;
        if (!row) {
          this.title = `添加${this.moduleName}`;
          this.type = 1;
          this.categoryIds = null;
          this.currentCoupon = null;
          this.goodsImages = [];
          this.goodsThumbnail = null;
          this.form = this.$options.data().form;
        } else {
          if (isCopy) {
            this.title = `添加${this.moduleName}`;
            this.type = 1;
          } else {
            this.title = `编辑${this.moduleName}`;
            this.type = 2;
          }
          const { data } = await getDetail(row.id);
          this.detailInfo = this.$baseLodash.cloneDeep(data);
          this.form.goods = data;
          this.currentCoupon = data.gift_coupon || null;
          this.goodsThumbnail = data.thumbnail;
          this.categoryIds = this.getCategoryParentTree(data.category_id);
          this.goodsImages = data.images;
          if (data.spec_type === 10) {
            this.preData = {};
            if (data.skus.length > 0) {
              this.form.skus = data.skus;
            }
          } else {
            this.preData.sku = data.skus;
            this.preData.spec = data.spec_mappings.map((item) => ({
              spec: item.spec.name,
              spec_id: item.spec.id,
              spec_value: item.spec_value.value,
              spec_value_id: item.spec_value.id,
            }));
            this.$refs["skuAdd"].show(this.preData);
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .remark {
    color: #838fa1;
    font-size: 13px;
  }
  .setting-btn {
    margin-left: 12px;
  }
  .setting-text {
    font-size: 13px;
  }
</style>
