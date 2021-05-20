<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="420px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="套餐名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="例：冲100元送50元"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="充值金额" prop="recharge_amount">
        <el-input
          v-model="form.recharge_amount"
          placeholder="请输入需要充值的金额"
          type="number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="赠送金额" prop="donation_amount">
        <el-input
          v-model="form.donation_amount"
          placeholder="请输入充值后赠送的金额"
          type="number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="套餐顺序" prop="order">
        <el-input-number
          v-model="form.order"
          type="number"
          :min="0"
          :max="1000"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, doCreate } from "@/api/recharge";

  export default {
    name: "PlanEdit",
    data() {
      return {
        form: {
          name: "",
          recharge_amount: "",
          donation_amount: "",
          order: 0,
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入套餐名称" },
          ],
          recharge_amount: [
            { required: true, trigger: "blur", message: "请输入充值金额" },
          ],
          donation_amount: [
            { required: true, trigger: "blur", message: "请输入赠送金额" },
          ],
          order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        },
        title: "",
        dialogFormVisible: false,
        type: 1, // 1 添加 2 修改
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加充值套餐";
          this.type = 1;
        } else {
          this.title = "编辑充值套餐";
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
              await doCreate(this.form);
              this.$baseMessage("创建成功", "success");
            } else if (this.type === 2) {
              await doEdit(this.form.id, this.form);
              this.$baseMessage("修改成功", "success");
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
