<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="员工姓名" prop="nickname">
        <el-input
          v-model.trim="form.nickname"
          maxlength="50"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model.trim="form.phone"
          maxlength="11"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input
          v-model.trim="form.email"
          maxlength="50"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工工号" prop="staff_no">
        <el-input
          v-model.trim="form.staff_no"
          maxlength="50"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否允许登陆">
        <el-tooltip
          :content="form.is_active ? '允许' : '不允许'"
          :enterable="false"
          placement="top"
        >
          <el-switch v-model="form.is_active"></el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="form.password"
          maxlength="50"
          autocomplete="off"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doCreate, doUpdate } from "@/api/staff";
  import { isPhone, isEmail } from "@/utils/validate";

  export default {
    name: "StoreStaffEdit",
    data() {
      const checkPhone = (rule, value, callback) => {
        callback(isPhone(value) ? undefined : new Error("请输入正确的手机号"));
      };
      const checkEmail = (rule, value, callback) => {
        callback(
          isEmail(value) ? undefined : new Error("请输入正确的电子邮箱")
        );
      };
      return {
        form: {
          nickname: "",
          password: "",
          staff_no: "",
          phone: "",
          email: "",
          is_active: true,
        },
        rules: {
          nickname: [
            { required: true, trigger: "blur", message: "请输入员工姓名" },
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入密码" },
          ],
          phone: [
            {
              required: true,
              validator: checkPhone,
              trigger: "blur",
              message: "请输入手机号",
            },
          ],
          email: [
            {
              required: true,
              validator: checkEmail,
              trigger: "blur",
            },
          ],
        },
        title: "",
        isUpdate: false,
        dialogFormVisible: false,
      };
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.isUpdate = false;
          this.title = "添加员工";
        } else {
          this.isUpdate = true;
          this.title = "编辑员工";
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
            if (this.isUpdate) {
              await doUpdate(this.form.id, this.form);
            } else {
              await doCreate(this.form);
            }
            this.$baseMessage("保存成功", "success");
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
