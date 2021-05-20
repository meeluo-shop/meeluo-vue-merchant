<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="580px"
    @close="close"
  >
    <el-form
      ref="form"
      :label-position="labelPosition"
      :model="form"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="优惠券名称" prop="name">
        <el-tooltip
          class="item"
          :content="form.type === 10 ? '例如：满100减10' : '例如：8.8折券'"
          placement="top"
        >
          <el-input
            v-model.trim="form.name"
            placeholder="请输入优惠券名称"
            autocomplete="off"
          ></el-input>
        </el-tooltip>
        <div class="remark">
          {{ form.type === 10 ? "例如：满100减10" : "例如：8.8折券" }}
        </div>
      </el-form-item>
      <el-form-item required label="优惠券颜色" prop="color">
        <el-radio-group v-model="form.color">
          <el-radio :label="10">红</el-radio>
          <el-radio :label="20">蓝</el-radio>
          <el-radio :label="30">黄</el-radio>
          <el-radio :label="40">绿</el-radio>
          <el-radio :label="50">紫</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="优惠券类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="10">满减券</el-radio>
          <el-radio :label="20">折扣券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.type === 10"
        label="减免金额"
        prop="reduce_price"
      >
        <el-tooltip class="item" content="请输入减免金额" placement="top">
          <el-input-number
            v-model.trim="form.reduce_price"
            :min="0"
            placeholder="请输入减免金额"
            autocomplete="off"
          ></el-input-number>
        </el-tooltip>
        元
      </el-form-item>
      <el-form-item v-if="form.type === 20" label="折扣率" prop="discount">
        <el-tooltip class="item" content="请输入折扣率" placement="top">
          <el-input-number
            v-model.trim="form.discount"
            :min="0"
            :max="10"
            placeholder="请输入折扣率"
            autocomplete="off"
          ></el-input-number>
        </el-tooltip>
        折
        <div class="remark">折扣率范围0-10，9.5代表9.5折，0代表不折扣</div>
      </el-form-item>
      <el-form-item label="最低消费金额" prop="min_price">
        <el-tooltip class="item" content="请输入最低消费金额" placement="top">
          <el-input-number
            v-model.trim="form.min_price"
            :min="0"
            placeholder="请输入最低消费金额"
            autocomplete="off"
          ></el-input-number>
        </el-tooltip>
        元
      </el-form-item>
      <el-form-item required label="有效期类型" prop="expire_type">
        <el-radio-group v-model="form.expire_type">
          <el-radio :label="10">领取后生效</el-radio>
          <el-radio :label="20">指定时间段</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.expire_type === 10"
        label="有效天数"
        prop="expire_day"
      >
        <el-tooltip class="item" content="请输入有效天数" placement="top">
          <el-input-number
            v-model.trim="form.expire_day"
            :min="0"
            :max="100000"
            placeholder="请输入有效天数"
            autocomplete="off"
          ></el-input-number>
        </el-tooltip>
        天
      </el-form-item>
      <el-form-item
        v-if="form.expire_type === 20"
        label="有效期开始时间"
        prop="start_time"
      >
        <el-date-picker
          v-model="form.start_time"
          type="date"
          placeholder="选择开始日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        v-if="form.expire_type === 20"
        label="有效期结束时间"
        prop="end_time"
      >
        <el-date-picker
          v-model="form.end_time"
          type="date"
          placeholder="选择结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券顺序" prop="order">
        <el-input-number
          v-model.trim="form.order"
          :min="0"
          :max="100000000"
          placeholder="请输入优惠券顺序"
          autocomplete="off"
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
  import { doUpdate, doCreate } from "@/api/coupon";

  export default {
    name: "CouponEdit",
    data() {
      return {
        labelPosition: "right",
        form: {
          name: "",
          color: 10,
          type: 10,
          reduce_price: 0,
          discount: 0,
          min_price: 0,
          expire_type: 10,
          start_time: "",
          end_time: "",
          order: 0,
          expire_day: 0,
        },
        rules: {
          name: [
            { required: true, trigger: "blur", message: "请输入收货人姓名" },
          ],
          reduce_price: [
            { required: true, trigger: "blur", message: "减免金额" },
          ],
          discount: [
            { required: true, trigger: "blur", message: "请输入折扣率" },
          ],
          expire_day: [
            { required: true, trigger: "blur", message: "请输入有效天数" },
          ],
          min_price: [
            { required: true, trigger: "blur", message: "请输入最低消费金额" },
          ],
          start_time: [
            {
              required: true,
              trigger: "blur",
              message: "请输入有效期开始时间",
            },
          ],
          end_time: [
            {
              required: true,
              trigger: "blur",
              message: "请输入有效期结束时间",
            },
          ],
        },
        title: "",
        dialogFormVisible: false,
        type: 1,
      };
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1000) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
    },
    methods: {
      async showEdit(row) {
        if (!row) {
          this.title = "添加优惠券";
          this.type = 1;
        } else {
          this.title = "编辑优惠券";
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

<style lang="scss" scoped>
  .remark {
    color: #838fa1;
    font-size: 13px;
  }
</style>
