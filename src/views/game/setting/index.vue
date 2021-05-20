<template>
  <div class="wechat-container">
    <el-row>
      <el-col :span="24">
        <part-header>
          <span slot="title">游戏奖品设置</span>
        </part-header>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="padding-top: 10px">
      <el-col :lg="18">
        <el-form
          ref="form"
          v-loading="listLoading"
          :label-position="labelPosition"
          :model="form"
          :rules="rules"
          label-width="180px"
        >
          <el-form-item label="奖品有效期" prop="effective_time">
            <el-input-number
              v-model="form.effective_time"
              style="width: 260px"
              :min="0"
              size="large"
              placeholder="请输入奖品有效期（天）"
            ></el-input-number>
            天
            <div class="remark">
              用户获奖之后，领奖时间若超出有效期，则无法兑奖。设为0则永不过期
            </div>
          </el-form-item>
          <el-form-item label="每日获奖上限" prop="max_winning_count">
            <el-input-number
              v-model="form.max_winning_count"
              :min="0"
              style="width: 260px"
              size="large"
              placeholder="请输入每日获奖上限（次）"
            ></el-input-number>
            次
            <div class="remark">
              用户参与赢奖活动，每天最高可获得奖品的次数，设置0次则不做限制
            </div>
          </el-form-item>
          <el-form-item required label="已发货订单">
            <el-input-number
              v-model="form.delivered_auto_sure_day"
              style="width: 260px"
              size="large"
            ></el-input-number>
            天
            <div class="remark">
              如果在期间未确认收货，系统自动完成收货，设置0天不自动收货
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getPrizeSetting, setPrizeSetting } from "@/api/game";

  export default {
    name: "GamePrizeSetting",
    data() {
      return {
        labelPosition: "right",
        listLoading: true,
        form: {},
        rules: {
          max_winning_count: [
            {
              required: true,
              trigger: "blur",
              message: "请输入每日获奖上限",
            },
          ],
          effective_time: [
            {
              required: true,
              trigger: "blur",
              message: "请输入奖品有效期",
            },
          ],
          delivered_auto_sure_day: [
            {
              required: true,
              trigger: "blur",
              message: "请输入订单自动收货天数",
            },
          ],
        },
      };
    },
    mounted() {
      const that = this;
      window.onresize = () =>
        (() => {
          const width = document.body.clientWidth;
          if (width < 1200) {
            that.labelPosition = "top";
          } else {
            that.labelPosition = "right";
          }
        })();
      window.onresize();
    },
    async created() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        const { data } = await getPrizeSetting();
        this.form = Object.assign({}, data);
        this.listLoading = false;
      },
      async onSubmit() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        try {
          await setPrizeSetting(this.form);
          this.$baseMessage("保存成功", "success");
          loading.close();
          this.fetchData();
        } catch (err) {
          loading.close();
        }
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
