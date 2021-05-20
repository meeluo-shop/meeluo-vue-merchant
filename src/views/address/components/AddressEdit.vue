<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="收货人名称" prop="name">
        <el-tooltip class="item" content="请输入收货人名称" placement="top">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入收货人名称"
            autocomplete="off"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-tooltip class="item" content="请输入联系电话" placement="top">
          <el-input
            v-model.trim="form.phone"
            placeholder="请输入联系电话"
            autocomplete="off"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-tooltip class="item" content="请输入详细地址" placement="top">
          <el-input
            v-model.trim="form.detail"
            placeholder="请输入详细地址"
            autocomplete="off"
          ></el-input>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doUpdate, doCreate } from "@/api/address";

  export default {
    name: "AddressEdit",
    data() {
      return {
        form: {
          name: "",
          phone: "",
          detail: "",
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入收货人姓名" },
          ],
          phone: [
            { required: true, trigger: "blur", message: "请输入联系电话" },
          ],
          detail: [
            { required: true, trigger: "blur", message: "请输入详细地址" },
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
          this.title = "添加退货地址";
          this.type = 1;
        } else {
          this.title = "编辑退货地址";
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
              await doUpdate(this.form.id, this.form);
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
