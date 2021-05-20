<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分组顺序" prop="order">
        <el-input-number
          v-model="form.order"
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
  import { updateGroup, createGroup } from "@/api/resource";

  export default {
    name: "ImgGroupEdit",
    data() {
      return {
        form: {
          name: "",
          type: 10, // 默认是图片类型
          order: 0,
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入分组名称" },
          ],
          order: [{ required: true, trigger: "blur", message: "请输入排序" }],
        },
        title: "",
        dialogFormVisible: false,
        type: 1, // 1 添加 2 修改
      };
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = "添加分组";
          this.type = 1;
        } else {
          this.title = "编辑分组";
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
              await createGroup(this.form);
              this.$baseMessage("添加分组成功", "success");
            } else if (this.type === 2) {
              await updateGroup(this.form.id, this.form);
              this.$baseMessage("更新分组成功", "success");
            }
            this.$emit("initOption");
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
