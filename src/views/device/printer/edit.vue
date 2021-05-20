<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="打印机名称" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入打印机名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="打印机品牌" prop="brand">
        <el-select
          v-model="form.brand"
          :disabled="type === 2"
          style="width: 100%"
          placeholder="请选择打印机品牌"
        >
          <el-option label="易联云" :value="10"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="打印机编号" prop="key">
        <el-input
          v-model.trim="form.key"
          :disabled="type === 2"
          placeholder="请输入打印机编号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="打印机密钥" prop="secret">
        <el-input
          v-model.trim="form.secret"
          :disabled="type === 2"
          placeholder="请输入打印机密钥"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="流量卡号码" prop="phone">
        <el-input
          v-model.trim="form.phone"
          :disabled="type === 2"
          placeholder="请输入打印机流量卡号"
          autocomplete="off"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="打印份数" prop="print_count">
        <el-input
          v-model.trim="form.print_count"
          placeholder="请输入打印份数"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="is_active">
        <el-radio-group v-model="form.is_active">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { createPrinter, updatePrinter } from "@/api/device";

  export default {
    name: "DevicePrinterManagementEdit",
    data() {
      return {
        form: {
          name: "",
          key: "",
          secret: "",
          brand: 10,
          phone: undefined,
          print_count: 2,
          is_active: 1,
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入打印机名称" },
          ],
          brand: [
            { required: true, trigger: "blur", message: "请选择打印机品牌" },
          ],
          key: [
            { required: true, trigger: "blur", message: "请输入打印机编号" },
          ],
          secret: [
            { required: true, trigger: "blur", message: "请输入打印机密钥" },
          ],
          print_count: [
            { required: true, trigger: "blur", message: "请输入打印份数" },
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
          this.title = "添加打印机";
          this.type = 1;
        } else {
          this.title = "编辑打印机";
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
        if (!this.form.phone) {
          this.form.phone = undefined;
        }
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.type === 1) {
              await createPrinter(this.form);
              this.$baseMessage("创建成功", "success");
            } else if (this.type === 2) {
              await updatePrinter(this.form.id, this.form);
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
