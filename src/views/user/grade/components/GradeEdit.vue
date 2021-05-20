<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="等级名称" prop="name">
        <el-tooltip
          class="item"
          content="例如：大众会员、白银会员、黄金会员、钻石会员"
          placement="top"
        >
          <el-input
            v-model.trim="form.name"
            placeholder="请输入等级名称"
            autocomplete="off"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="会员级别" prop="weight">
        <el-tooltip class="item" content="最小0，最大100" placement="top">
          <el-input-number
            v-model.trim="form.weight"
            type="number"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="升级条件" prop="upgrade">
        <el-tooltip
          class="item"
          content="用户充值金额满n元后，自动升级"
          placement="top"
        >
          <el-input
            v-model.trim="form.upgrade"
            type="number"
            placeholder="请输入金额"
            autocomplete="off"
          >
            <template slot="prepend">充值金额满</template>
            <template slot="append">元</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="等级权益" prop="equity">
        <el-tooltip
          class="item"
          content="折扣率范围0-100，95代表9.5折，0代表没有折扣"
          placement="top"
        >
          <el-input
            v-model.trim="form.equity"
            type="number"
            max="100"
            maxlength="3"
            placeholder="请输入折扣率"
            autocomplete="off"
          >
            <template slot="prepend">折扣率</template>
            <template slot="append">折</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="是否默认" prop="is_default">
        <el-radio-group v-model="form.is_default">
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
  import { create, doEdit } from "@/api/grade";

  export default {
    name: "GradeManagementEdit",
    data() {
      return {
        form: {
          name: "",
          weight: 0,
          upgrade: undefined,
          equity: 0, // 默认无折扣
          is_default: 0, // 是否为默认等级（只能有一个），1是，0否，默认0
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入等级名称" },
          ],
          weight: [
            { required: true, trigger: "blur", message: "请选择会员级别" },
          ],
          upgrade: [
            { required: true, trigger: "blur", message: "请输入升级条件" },
          ],
          equity: [
            { required: true, trigger: "blur", message: "请输入等级权益" },
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
          this.title = "添加会员等级";
          this.type = 1;
        } else {
          this.title = "编辑会员等级";
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
              await create(this.form);
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
