<template>
  <el-dialog
    title="订单价格修改"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item required label="订单金额">
        <el-input-number v-model="form.price" size="large"></el-input-number>
        <div class="remark">最终付款价 = 订单金额 + 运费金额</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { updateOrderPrice } from "@/api/menuorders";

  export default {
    name: "UpdateMenuOrderPrice",
    data() {
      return {
        form: {
          order_id: null,
          price: 0,
        },
        rules: {
          price: [
            { required: true, trigger: "blur", message: "请输入订单金额" },
          ],
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      async showEdit(row) {
        this.form.order_id = row.id;
        this.form.price = row.update_price || row.order_price;
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
            this.$baseConfirm("你确定要修改该订单价格吗", null, async () => {
              await updateOrderPrice(this.form);
              this.$baseMessage("订单修改完成", "success");
              this.$emit("fetchData", this.form.order_id);
              this.close();
            });
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style scoped>
  .remark {
    color: #838fa1;
    font-size: 13px;
    margin-top: 4px;
  }
</style>
