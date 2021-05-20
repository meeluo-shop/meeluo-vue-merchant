<template>
  <el-dialog
    title="发放商品"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="480px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item v-if="orderInfo" label="商品图片">
        <el-image :src="orderInfo.thumbnail_url" />
      </el-form-item>
      <el-form-item v-if="orderInfo" label="商品名称">
        {{ orderInfo.name }}
      </el-form-item>
      <el-form-item v-if="orderInfo" label="发放人员" prop="extractClerkId">
        <el-select
          v-model="form.extractClerkId"
          :disabled="preview"
          placeholder="选择发放人员"
        >
          <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          ></el-option>
        </el-select>
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
  import { pickUpGoods } from "@/api/orderlogistics";

  export default {
    name: "ExtractClerk",
    data() {
      return {
        preview: false,
        orderInfo: null,
        staffList: [],
        form: {
          extractClerkId: null,
        },
        rules: {
          extractClerkId: [
            { required: true, trigger: "blur", message: "请选择商品发放人员" },
          ],
        },
        dialogFormVisible: false,
      };
    },
    methods: {
      async showEdit(row) {
        this.orderInfo = row;
        if (row.extract_clerk_id) {
          this.preview = true;
          this.form.extractClerkId = row.extract_clerk_id;
        }
        this.dialogFormVisible = true;
        const data = await getList({ page_index: 1, page_size: 100 });
        this.staffList = data ? data.rows : [];
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
      },
      save() {
        if (this.preview) {
          this.close();
          return;
        }
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            this.$baseConfirm("你确定要发放该商品吗", null, async () => {
              await pickUpGoods({
                staff_id: this.form.extractClerkId,
                order_id: this.orderInfo.order_id,
                order_goods_id: this.orderInfo.id,
              });
              this.$baseMessage("订单已完成", "success");
              this.$emit("fetchData", this.orderInfo.order_id);
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
