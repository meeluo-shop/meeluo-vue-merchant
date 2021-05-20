<template>
  <div class="edit-container">
    <el-dialog
      title="添加菜品"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="close"
    >
      <!-- {{ goodInfo }} -->
      <div class="good-info">
        <el-image
          :src="
            currentSku.image
              ? currentSku.image.url
              : goodInfo.thumbnail
              ? goodInfo.thumbnail.url
              : ''
          "
          fit="contain"
        ></el-image>
        <div class="good-price">
          <p class="food-name">名称： {{ goodInfo.name }}</p>
          <p>
            价格：
            <span>￥{{ (currentSku.price * buyNumber).toFixed(2) }}</span>
          </p>
          <p>
            库存：
            <template v-if="currentSku.stock">
              {{ currentSku.stock
              }}{{ goodInfo.unit ? `${goodInfo.unit}` : "" }}
            </template>
            <i v-else>库存不足</i>
          </p>
        </div>
      </div>
      <div v-for="spec in specList" :key="spec.id" class="spec">
        <p class="spec-name">{{ spec.name }}</p>
        <el-tag
          v-for="value in spec.values"
          :key="value.id"
          size="medium"
          :effect="
            currentSku && currentSku.spec_sku_id.indexOf(value.id) > -1
              ? 'dark'
              : 'plain'
          "
          @click="selectSpec(spec.id, value)"
        >
          {{ value.value }}
        </el-tag>
      </div>
      <div v-if="currentSku.stock" class="spec">
        <p class="spec-name">购买数量</p>
        <el-input-number
          v-model="buyNumber"
          :min="0"
          :max="currentSku.stock"
          :precision="0"
        ></el-input-number>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!currentSku || !currentSku.stock || !buyNumber"
          @click="save"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "OrderFoodEdit",
    props: {
      goodInfo: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
    data() {
      return {
        dialogFormVisible: false,
        specList: [],
        currentSku: {}, // 当前选中的规格
        buyNumber: 1,
      };
    },
    watch: {
      // 获取所有规格和可选中规格
      goodInfo(val) {
        const result = [];
        for (const mapping of val.spec_mappings) {
          let spec = result.find((item) => item.id === mapping.spec.id);
          if (!spec) {
            spec = mapping.spec;
            result.push(mapping.spec);
          }
          if (!spec.values) {
            spec.values = [mapping.spec_value];
          } else {
            if (!spec.values.includes(mapping.spec_value)) {
              spec.values.push(mapping.spec_value);
            }
          }
        }
        this.specList = result;
        this.currentSku = val.skus[0];
      },
    },
    methods: {
      async showEdit() {
        this.dialogFormVisible = true;
        this.buyNumber = 1;
      },
      close() {
        this.dialogFormVisible = false;
      },
      getCurrentSpecs(spec_sku_id, spec_mappings) {
        const currentSpecs = [];
        const values = spec_sku_id.split("_");
        for (const valueId of values) {
          for (const mapping of spec_mappings) {
            if (mapping.spec_value_id === Number(valueId)) {
              currentSpecs.push(this.$baseLodash.cloneDeep(mapping));
            }
          }
        }
        return currentSpecs;
      },
      // 选择规格
      selectSpec(specId, value) {
        const specs = this.getCurrentSpecs(
          this.currentSku.spec_sku_id,
          this.goodInfo.spec_mappings
        );
        specs.forEach((spec) => {
          if (spec.spec_id === specId) {
            spec.spec_value_id = value.id;
            spec.spec_value = value;
          }
        });
        const skuId = specs.map((spec) => spec.spec_value_id).join("_");
        this.currentSku = this.goodInfo.skus.find(
          (sku) => sku.spec_sku_id === skuId
        );
        if (this.currentSku.stock < this.buyNumber) {
          this.buyNumber = this.currentSku.stock;
        }
      },
      // 保存
      save() {
        this.currentSku.count = this.buyNumber;
        this.$emit("save", this.goodInfo, this.currentSku);
        this.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  p,
  span {
    margin: 0;
  }
  .good-info {
    display: flex;

    .el-image {
      width: 80px;
      height: 80px;
      border-radius: 6px;
    }
    .good-price {
      padding-left: 12px;
      p {
        width: 100%;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 16px;
        padding: 4px 0 8px;
        font-weight: bolder;
      }
      span {
        font-size: 16px;
        font-weight: bolder;
        color: #ff4f18;
      }
      i {
        font-style: normal;
        color: #ff4a4a;
      }
      .food-name {
        span {
          margin-left: 8px;
        }
      }
    }
  }
  .spec {
    margin-top: 16px;
    .spec-name {
      font-size: 16px;
      font-weight: bolder;

      margin-bottom: 8px;
    }
    .spec-list {
      display: inline-block;
      border: 1px solid #c0c4cc;
      padding: 3px 6px;
      margin-right: 8px;
      border-radius: 3px;
      &.spec-ac {
        background-color: #1890ff;
        color: #fff;
        border: 1px solid #1890ff;
      }
    }
  }
</style>
