<template>
  <div class="edit-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="98px">
        <el-form-item label="餐桌名称" prop="name">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入餐桌名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="容纳人数" prop="people">
          <el-input-number
            v-model.trim="form.people"
            style="width: 180px"
            :min="1"
            :max="1000"
          ></el-input-number>
          （单位：人）
        </el-form-item>
        <el-form-item label="最低消费" prop="min_consume_fee">
          <el-input-number
            v-model.trim="form.min_consume_fee"
            style="width: 180px"
            :min="0"
          ></el-input-number>
          （单位：元）
        </el-form-item>
        <el-form-item label="餐具调料费" prop="ware_fee">
          <el-input-number
            v-model.trim="form.ware_fee"
            style="width: 180px"
            :min="0"
          ></el-input-number>
          （单位：元/人）
        </el-form-item>
        <el-form-item label="餐桌排序" prop="order">
          <el-input-number
            v-model.trim="form.order"
            style="width: 180px"
            :min="0"
            :max="100000000"
          ></el-input-number>
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
  import { createTable, updateTable } from "@/api/table";
  export default {
    name: "TableEdit",
    data() {
      return {
        form: {
          name: "",
          order: 0,
          people: 0,
          min_consume_fee: 0,
          ware_fee: 0,
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入餐桌名称" },
          ],
          order: [
            { required: true, trigger: "blur", message: "请输入餐桌顺序" },
          ],
          people: [
            { required: true, trigger: "blur", message: "请输入容纳人数" },
          ],
          min_consume_fee: [
            { required: true, trigger: "blur", message: "请输入最低消费金额" },
          ],
          ware_fee: [
            { required: true, trigger: "blur", message: "请输入餐具费" },
          ],
        },
        title: "",
        dialogFormVisible: false,
        type: 1,
      };
    },
    methods: {
      async showEdit(row) {
        if (!row) {
          this.title = "添加";
          this.type = 1;
        } else {
          this.title = "编辑";
          this.type = 2;
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.type === 1) {
              await createTable(this.form);
              this.$baseMessage("新增餐桌成功", "success");
            } else if (this.type === 2) {
              await updateTable(this.form.id, this.form);
              this.$baseMessage("修改餐桌成功", "success");
            }
            this.$emit("fetchData");
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
