<template>
  <div v-if="isShow" class="spec-container">
    <el-form
      ref="form"
      :model="form"
      :label-position="labelPosition"
      label-width="70px"
      :rules="rules"
    >
      <el-form-item label="规格名" prop="name">
        <el-input v-model="form.name" placeholder="请输入规格名称"></el-input>
      </el-form-item>
      <el-form-item label="规格值" prop="value">
        <el-input v-model="form.value" placeholder="请输入规格值"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="onSubmit">
          立即创建
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addSpec } from "@/api/goods";

  export default {
    name: "SpecAdd",
    props: {
      labelPosition: {
        type: String,
        default: "left",
      },
    },
    data() {
      return {
        isLoading: false,
        isShow: false,
        form: {
          name: "",
          value: "",
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入规格名称" },
          ],
          value: [{ required: true, trigger: "blur", message: "请输入规格值" }],
        },
      };
    },
    methods: {
      show() {
        this.isShow = true;
      },
      cancel() {
        this.$refs["form"].resetFields();
        this.$emit("cancel");
        this.form = this.$options.data().form;
        this.isShow = false;
      },
      onSubmit() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            this.isLoading = true;
            try {
              const { code, data, msg } = await addSpec(this.form);
              if (code === 0) {
                const result = Object.assign(data, {
                  spec: this.form.name,
                  spec_value: this.form.value,
                });
                this.$emit("on-submit", result);
                this.$message.success("添加成功！");
              } else {
                this.$message.error(msg);
              }
              this.isLoading = false;
              this.cancel();
            } catch (error) {
              console.log(error);
              this.isLoading = false;
            }
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .spec-container {
    width: 100%;
    max-width: 400px;
  }
</style>
