<template>
  <el-dialog
    title="用户充值"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item v-if="userInfo" label="用户头像">
        <el-image :src="userInfo.avatar || avatar" />
      </el-form-item>
      <el-form-item v-if="userInfo" label="用户昵称">
        {{ userInfo.nickname }}
      </el-form-item>
      <el-form-item v-if="userInfo" label="当前余额">
        {{ userInfo.balance }}
      </el-form-item>
      <el-form-item label="充值方式" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">增加</el-radio>
          <el-radio :label="2">减少</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="变更金额" prop="money">
        <el-input-number
          v-model.trim="form.money"
          :min="0"
          placeholder="请输入变更金额"
          autocomplete="off"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="管理员备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          autocomplete="off"
          rows="2"
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
  import { getList } from "@/api/staff";
  import { doUserRecharge } from "@/api/user";

  export default {
    name: "ExtractClerk",
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        userInfo: null,
        form: {
          type: 1,
          money: 0,
          remark: null,
          scene: 30,
        },
        rules: {
          type: [
            { required: true, trigger: "blur", message: "请选择充值方式" },
          ],
          money: [
            { required: true, trigger: "blur", message: "请输入变更金额" },
          ],
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      async show(row) {
        this.userInfo = row;
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
            await doUserRecharge({
              user_id: this.userInfo.id,
              ...this.form,
            });
            this.$baseMessage("订单已完成", "success");
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
