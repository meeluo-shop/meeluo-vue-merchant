<template>
  <div v-if="isShow" class="spec-type-box">
    <el-card shadow="never">
      <div class="ope-container">
        <div class="spec-list">
          <div
            v-for="(item, index) in inputSpecs"
            :key="index"
            class="spec-item"
          >
            <div class="item-title">
              <edit-tag
                v-if="!item.hideTag"
                :label="item.name"
                @on-delete="deleteSpecSup(item, index)"
              ></edit-tag>
            </div>
            <template v-for="(subItem, subIndex) in item.list">
              <edit-tag
                v-if="!subItem.hideTag"
                :key="subIndex"
                :label="subItem.spec_value"
                border
                @on-delete="deleteSpecSub(item, index, subItem, subIndex)"
              ></edit-tag>
            </template>
            <el-input v-model="item.tempValue" style="width: 200px">
              <el-button
                slot="append"
                :loading="item.btnLoading"
                @click="addSpecSub(item, index)"
              >
                添加
              </el-button>
            </el-input>
          </div>
        </div>
        <spec-add
          ref="spec"
          :label-position="labelPosition"
          @cancel="specCancel"
          @on-submit="submitSpec"
        ></spec-add>
        <el-button
          v-if="!specShow"
          type="primary"
          plain
          @click="addSpecifications"
        >
          添加规格
        </el-button>
      </div>
      <div class="show-container">
        <el-table
          :data="localSkuList"
          :span-method="spanMethod"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column
            v-for="(spec, specIndex) in inputSpecs"
            :key="specIndex"
            :prop="spec.name"
            :label="spec.name"
          ></el-table-column>
          <el-table-column label="规格图片">
            <template slot-scope="{ row, $index }">
              <vab-image-input
                v-model="row.image"
                :mini-style="true"
                width="58px"
                height="58px"
                @select="(img) => handleSelectImg($index, img)"
              ></vab-image-input>
            </template>
          </el-table-column>
          <el-table-column label="产品编码">
            <template slot-scope="{ row }">
              <el-input v-model="row.number" @input="refresh"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="销售价">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.price"
                placeholder="必填"
                default="0"
                @input="refresh"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="划线价">
            <template slot-scope="{ row }">
              <el-input v-model="row.line_price" @input="refresh"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.stock"
                placeholder="必填"
                default="0"
                @input="refresh"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="重量">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.weight"
                placeholder="必填"
                @input="refresh"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import SpecAdd from "./SpecAdd";
  import { addSpec } from "@/api/goods";
  import { descartes } from "@/utils";
  import VabImageInput from "@/extra/Upload/ImageInput";

  export default {
    name: "SkuAdd",
    components: { SpecAdd, VabImageInput },
    props: {
      labelPosition: {
        type: String,
        default: "left",
      },
    },
    data() {
      return {
        specShow: false,
        isShow: false,
        elementLoadingText: "正在加载...",
        localSkuList: [],
        localSpecList: [],
        inputSpecs: [], // 插件直接操作
        imageIdList: [],
      };
    },
    methods: {
      show(preData) {
        this.isShow = true;
        if (preData) {
          this.localSkuList = preData.sku ? [...preData.sku] : [];
          this.localSpecList = preData.spec ? [...preData.spec] : [];

          // 初始化规格操作数组
          this.inputSpecs = this.initInputSpecs();
          this.localSkuList = this.freshSku();
          // 刷新数据
          this.refresh();
        } else {
          this.specShow = false;
          this.localSkuList = [];
          this.localSpecList = [];
          this.inputSpecs = [];
          this.imageIdList = [];
        }
      },
      hide() {
        this.isShow = false;
      },
      addSpecifications() {
        this.specShow = true;
        this.$refs["spec"].show();
      },
      specCancel() {
        this.specShow = false;
      },
      refresh() {
        this.localSpecList = this.freshSpec();
        this.imageIdList = this.freshImageIds();

        const data = {
          skus: this.localSkuList,
          spec_ids: this.localSpecList,
          image_ids: this.imageIdList,
        };
        // 向父组件
        this.$emit("on-change", data);
      },
      initInputSpecs() {
        const result = [];
        const props = this.getProps();
        props.map((item) => {
          this.localSpecList.map((_item) => {
            if (_item.spec === item) {
              const target = result.find((__item) => __item.name === item);
              if (target) {
                const index = result.indexOf(target);
                result[index].list.push(_item);
              } else {
                result.push({
                  name: item,
                  list: [_item],
                  tempValue: undefined,
                  btnLoading: false,
                });
              }
            }
          });
        });
        return result;
      },
      getProps() {
        const result = [];
        this.localSpecList.map((item) => {
          result.push(item.spec);
        });
        return Array.from(new Set(result));
      },
      freshSku() {
        const result = [];
        const matrix = this.getMatrix();
        matrix.map((item) => {
          let spec_sku_id = "";
          let temp = {};
          if (Object.prototype.toString.call(item) === "[object Array]") {
            let spec_sku_id_arr = [];
            item.map((_item) => {
              spec_sku_id_arr.push(_item.spec_value_id);
              temp[_item.spec] = _item.spec_value;
            });
            spec_sku_id = spec_sku_id_arr.join("_");
          }
          if (Object.prototype.toString.call(item) === "[object Object]") {
            temp[item.spec] = item.spec_value;
            spec_sku_id = item.spec_value_id;
          }
          let specItem = this.localSkuList.find(
            (_item) => String(_item.spec_sku_id) === String(spec_sku_id)
          );
          if (specItem) {
            specItem = Object.assign(specItem, temp);
          } else {
            specItem = Object.assign(
              {
                spec_sku_id,
                image: null,
                image_id: undefined,
                number: "",
                price: 0,
                line_price: "",
                stock: 0,
                weight: 0,
              },
              temp
            );
          }
          result.push(specItem);
        });
        return result;
      },
      getMatrix() {
        const result = [];
        this.inputSpecs.map((item) => {
          result.push(item.list);
        });
        return descartes(result); // 笛卡尔积算法
      },
      freshSpec() {
        const result = [];
        this.inputSpecs.map((item) => {
          item.list.map((_item) => {
            result.push({
              spec_id: _item.spec_id,
              spec_value_id: _item.spec_value_id,
            });
          });
        });
        return result;
      },
      freshImageIds() {
        const result = [];
        this.localSkuList.map((item) => {
          result.push(item.image_id);
        });
        return result;
      },
      handleSelectImg(index, image) {
        this.localSkuList[index].image = image;
        this.localSkuList[index].image_id = image.id;
        // 刷新数据
        this.localSkuList = this.freshSku();
        this.refresh();
        this.$forceUpdate();
        console.log(this.localSkuList[index]);
      },
      handleDeleteImg(row, column, $index) {
        this.localSkuList[$index].image = null;
        this.localSkuList[$index].image_id = undefined;
        // 刷新数据
        this.localSkuList = this.freshSku();
        this.refresh();
      },
      spanMethod({ row, column, rowIndex, columnIndex }) {
        const target = this.inputSpecs.find(
          (item) => item.name === column.label
        );
        if (target) {
          const index = this.inputSpecs.indexOf(target);
          const len = this.inputSpecs.length;
          let beTaken = 1;
          for (let i = index + 1; i < len; i++) {
            beTaken *= this.inputSpecs[i].list.length;
          }
          if (rowIndex % beTaken === 0 && index === columnIndex) {
            return {
              rowspan: beTaken,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      async addSpecSub(item, index) {
        if (!item.tempValue) {
          this.$message.error("请输入规格值！");
          return false;
        }
        if (item.list.find((_item) => _item.spec_value === item.tempValue)) {
          this.$message.error("请输入规格值重复！");
          return false;
        }

        item.btnLoading = true;
        const { code, data, msg } = await addSpec({
          name: item.name,
          value: item.tempValue, // 传入临时数据
        });
        if (code === 0) {
          let temp = {};
          temp = Object.assign(data, {
            spec: item.name,
            spec_value: item.tempValue,
          });
          this.inputSpecs[index].list.push(temp);
          // 刷新数据
          this.localSkuList = this.freshSku();
          this.refresh();
          this.$message.success("添加成功！");
          item.tempValue = undefined;
          item.btnLoading = false;
        } else {
          this.$message.error(msg);
        }
      },
      deleteSpecSup(item, index) {
        this.$baseConfirm("确定要删除该规格吗", null, async () => {
          this.inputSpecs.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新数据
          this.localSkuList = this.freshSku();
          this.refresh();
          item.hideTag = true;
        });
      },
      deleteSpecSub(item, index, subItem, subIndex) {
        this.$baseConfirm("确定要删除该规格吗", null, async () => {
          this.inputSpecs[index].list.splice(subIndex, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          if (this.inputSpecs[index].list.length === 0) {
            this.inputSpecs.splice(index, 1);
          }
          // 刷新数据
          this.localSkuList = this.freshSku();
          this.refresh();
          subItem.hideTag = true;
        });
      },
      submitSpec(data) {
        const target = this.inputSpecs.find((item) => item.name === data.name);
        if (target) {
          const index = this.inputSpecs.indexOf(target);
          this.inputSpecs[index].list.push(data);
        } else {
          this.inputSpecs.push({
            name: data.spec,
            list: [data],
            tempValue: undefined,
            btnLoading: false,
          });
        }
        // 刷新数据
        this.localSkuList = this.freshSku();
        this.refresh();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .error-input {
    border: 1px solid red;
  }
  .spec-type-box {
    margin-top: 20px;
    .ope-container {
      padding-bottom: 20px;
      border-bottom: #ddd dashed 1px;
      .spec-list {
        padding-bottom: 20px;
        .item-title {
          margin: 0.5em 0;
          font-size: 16px;
        }
      }
    }
    .show-container {
      padding-top: 10px;
    }
  }
</style>
