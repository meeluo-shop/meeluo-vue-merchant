<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="420px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="会员等级" prop="grade_id">
        <el-select
          v-model="form.grade_id"
          style="width: 100%"
          placeholder="请选择会员等级"
        >
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model.trim="form.phone"
          type="number"
          maxlength="11"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="is_active">
        <el-radio-group v-model="form.is_active">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
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
  import { doUserUpdate } from "@/api/user";
  import { getList as getGradeList } from "@/api/grade";
  export default {
    name: "UpdateUser",
    data() {
      return {
        userId: null,
        gradeList: [],
        form: {
          grade_id: null,
          is_active: 1,
          phone: null,
        },
        rules: {
          grade_id: [
            { required: true, trigger: "blur", message: "请选择会员等级" },
          ],
          is_active: [
            { required: true, trigger: "blur", message: "请选择是否禁用" },
          ],
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      async show(row) {
        const gradeData = await getGradeList({ page_size: 500 });
        this.gradeList = gradeData.data.rows.map((item) => ({
          text: item.name,
          value: item.id,
        }));
        this.userId = row.id;
        this.form.grade_id = row.grade_id;
        this.form.is_active = row.is_active ? 1 : 0;
        this.form.phone = row.phone;
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
            await doUserUpdate(this.userId, { ...this.form });
            this.$baseMessage("修改成功", "success");
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
