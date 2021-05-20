<template>
  <div class="edit-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="84px">
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入分类名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类排序" prop="order">
          <el-input-number
            v-model.trim="form.order"
            :min="0"
            :max="100000000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="分类缩略图" prop="image_id">
          <vab-image-input v-model="image"></vab-image-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="superior_id">
          <el-cascader
            v-model="checkedKeys"
            :options="options"
            :clearable="true"
            :props="{ checkStrictly: true }"
            @change="handleChange"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { createCategory, doEditCategory } from "@/api/goods";
  import VabImageInput from "@/extra/Upload/ImageInput";
  export default {
    name: "CategoryEdit",
    components: { VabImageInput },
    props: {
      list: {
        type: Array,
        default: function () {},
      },
      goodsType: {
        type: Number,
        default: 10,
      },
    },
    data() {
      return {
        image: null,
        form: {
          name: "",
          order: 0,
          image_id: null,
          superior_id: undefined, // 默认无折扣
        },
        checkedKeys: [],
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入分类名称" },
          ],
          order: [
            { required: true, trigger: "blur", message: "请输入分类顺序" },
          ],
        },
        title: "",
        dialogFormVisible: false,
        type: 1,
        options: [],
      };
    },
    watch: {
      image(image) {
        if (image) {
          this.form.image_id = image.id;
        } else {
          this.form.image_id = null;
        }
      },
      list(newVal) {
        this.options = this.conversion(newVal);
      },
    },
    methods: {
      async showEdit(row) {
        if (!row) {
          this.title = "添加";
          this.type = 1;
          this.image = null;
        } else {
          this.title = "编辑";
          this.type = 2;
          this.form = Object.assign({}, row);
          this.image = this.form.image;
          this.checkedKeys = this.form.superior_id
            ? this.getCheckedKeys(this.options, this.form.superior_id)
            : [];
        }
        this.options = this.conversion(this.list);
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
        this.clearData();
      },
      handleChange(data) {
        this.form.superior_id = this.$baseLodash.last(data);
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            let data = {
              name: this.form.name,
              order: this.form.order,
              image_id: this.form.image_id,
              type: this.goodsType,
            };
            if (this.form.superior_id) {
              data.superior_id = this.form.superior_id;
            }
            if (this.type === 1) {
              await createCategory(data);
              this.$baseMessage("新增分类成功", "success");
              this.clearData();
            } else if (this.type === 2) {
              await doEditCategory(this.form.id, data);
              this.$baseMessage("修改分类成功", "success");
              this.clearData();
            }
            this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
      conversion(data, isDisable = false) {
        let root = [];
        for (const item of data) {
          let disabled = isDisable;
          if (this.form.id === item.id) {
            disabled = true;
          }
          let target = {
            value: item.id,
            label: item.name,
            disabled,
          };
          if (item.children) {
            target = Object.assign(target, { children: [] });
            target.children = this.conversion(item.children, disabled);
          }
          root.push(target);
        }
        return root;
      },
      getCheckedKeys(data, target) {
        let result = [];
        for (const item of data) {
          if (item.value === target) {
            result.push(item.value);
          } else {
            if (
              item.children &&
              item.children.find((_item) => _item.value === target)
            ) {
              result = [
                item.value,
                ...this.getCheckedKeys(item.children, target),
              ];
            }
          }
        }
        return result;
      },
      clearData() {
        this.imageUrl = "";
        this.checkedKeys = [];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .upload-box {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    &:hover {
      border-color: #409eff;
    }
  }
</style>
