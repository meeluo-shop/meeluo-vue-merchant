<template>
  <div class="store-staff-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-select
              v-model="queryForm.grade_id"
              placeholder="请选择会员等级"
            >
              <el-option key="1" label="全部" :value="null"></el-option>
              <el-option
                v-for="item in gradeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model.trim="queryForm.wechat_name"
              clearable
              placeholder="请输入微信昵称"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.phone"
              clearable
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <el-form label-position="left" inline class="user-table-expand">
            <el-form-item label="微信昵称">
              <span>{{ row.wechat_user.nickname }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <el-tooltip
                :content="getGender(row.wechat_user.gender)"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag :type="row.wechat_user.gender | genderFilter">
                  {{ getGender(row.wechat_user.gender) }}
                </el-tag>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="会员等级">
              <el-tooltip
                :content="row.grade ? row.grade.name : '无'"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag :type="row.grade | gradeFilter" effect="plain">
                  {{ row.grade ? row.grade.name : "无" }}
                </el-tag>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="手机号">
              <span v-if="row.phone">{{ row.phone }}</span>
              <el-tag v-else effect="plain">未绑定</el-tag>
            </el-form-item>
            <el-form-item label="国家">
              <el-tooltip
                :content="row.wechat_user.country"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag type="default">
                  {{ row.wechat_user.country || "--" }}
                </el-tag>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="省份">
              <el-tooltip
                :content="row.wechat_user.province"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag type="success">
                  {{ row.wechat_user.province || "--" }}
                </el-tag>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="城市">
              <el-tooltip
                :content="row.wechat_user.city"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag type="warning">
                  {{ row.wechat_user.city || "--" }}
                </el-tag>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="登陆次数">
              <span>{{ row.login_count }}</span>
            </el-form-item>
            <el-form-item label="当前余额">
              <span>{{ row.balance }} 元</span>
            </el-form-item>
            <el-form-item label="当前积分">
              <span>{{ row.point }}</span>
            </el-form-item>
            <el-form-item label="充值总额">
              <span>{{ row.total_recharge }} 元</span>
            </el-form-item>
            <el-form-item label="实际到账金额">
              <span>{{ row.real_total_recharge }} 元</span>
            </el-form-item>
            <el-form-item label="消费总额">
              <span>{{ row.total_consumption }} 元</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ formatTime(null, null, row.first_login_time) }}</span>
            </el-form-item>
            <el-form-item label="上次登陆时间">
              <span>{{ formatTime(null, null, row.last_login_time) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="微信头像">
        <template slot-scope="{ row }">
          <el-image
            :preview-src-list="imageList"
            :src="row.wechat_user.avatar || avatar"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="微信昵称"
        prop="wechat_user.nickname"
      ></el-table-column>
      <el-table-column label="性别" prop="wechat_user.gender">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="getGender(row.wechat_user.gender)"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.wechat_user.gender | genderFilter">
              {{ getGender(row.wechat_user.gender) }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="会员等级"
        prop="grade.name"
        :filters="gradeList"
        :filter-method="filterTag"
        :filter-multiple="false"
        filter-placement="bottom-end"
      > -->
      <el-table-column label="会员等级" prop="grade.name">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="row.grade ? row.grade.name : '无'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.grade | gradeFilter" effect="plain">
              {{ row.grade ? row.grade.name : "无" }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="手机号" prop="phone" width="120">
        <template slot-scope="{ row }">
          <span v-if="row.phone">{{ row.phone }}</span>
          <el-tag v-else type="info" effect="plain">未绑定</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否关注" prop="wechat_user.subscribe">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="!!row.wechat_user.subscribe ? '是' : '否'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="!!row.wechat_user.subscribe ? 'success' : 'info'">
              {{ !!row.wechat_user.subscribe ? "是" : "否" }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <el-table-column label="用户余额" prop="balance">
        <template slot-scope="{ row }">
          <span style="color: red">¥ {{ row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户积分" prop="point"></el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="row.is_active ? '是' : '否'"
            :enterable="false"
            placement="top"
          >
            <el-switch
              v-model="row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userActive(row)"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="first_login_time"
        label="注册时间"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-dropdown
            placement="bottom"
            trigger="click"
            @command="((row) => (val) => handleCommand(val, row))(row)"
          >
            <el-button icon="el-icon-arrow-down" circle></el-button>
            <el-dropdown-menu
              :key="row.id"
              slot="dropdown"
              class="user-table-dropdown"
            >
              <el-dropdown-item command="update">修改用户</el-dropdown-item>
              <el-dropdown-item command="recharge">用户充值</el-dropdown-item>
              <el-dropdown-item command="order">商城订单</el-dropdown-item>
              <el-dropdown-item v-if="merchant.type === 20" command="menuOrder">
                点餐订单
              </el-dropdown-item>
              <el-dropdown-item command="gameOrder">游戏订单</el-dropdown-item>
              <el-dropdown-item command="balance">余额明细</el-dropdown-item>
              <el-dropdown-item command="winning">获奖记录</el-dropdown-item>
              <el-dropdown-item command="invite">邀请记录</el-dropdown-item>
              <el-dropdown-item command="coupon">优惠券记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="queryForm.page_index"
      :layout="layout"
      :page-size="queryForm.page_size"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <recharge ref="userRecharge" @fetchData="fetchData"></recharge>
    <update-user ref="updateUser" @fetchData="fetchData"></update-user>
  </div>
</template>

<script>
  import { getList, doUserActive } from "@/api/user";
  import { getList as getGradeList } from "@/api/grade";
  import dayjs from "dayjs";
  import UpdateUser from "./components/UpdateUser";
  import Recharge from "./components/Recharge";

  export default {
    name: "UserIndex",
    components: { UpdateUser, Recharge },
    filters: {
      gradeFilter(grade) {
        if (!grade) {
          return "info";
        }
        if (grade.weight % 5 === 0) {
          return "warning";
        }
        if (grade.weight % 4 === 0) {
          return "danger";
        }
        if (grade.weight % 3 === 0) {
          return "success";
        }
        if (grade.weight % 2 === 0) {
          return "default";
        }
        return "info";
      },
      genderFilter(gender) {
        switch (gender) {
          case 1:
            return "default";
          case 2:
            return "danger";
          default:
            return "info";
        }
      },
    },
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        gradeList: [],
        merchant: this.$store.getters["passport/merchant"],
        list: [],
        selectedGrade: null,
        imageList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          wechat_name: "",
          phone: "",
          grade_id: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleCommand(val, row) {
        switch (val) {
          case "update":
            this.$refs["updateUser"].show(row);
            return;
          case "recharge":
            this.$refs["userRecharge"].show(row);
            return;
          case "order":
            window.open(`/index.html#/mallorder/allList?user_id=${row.id}`);
            return;
          case "menuOrder":
            window.open(`/index.html#/menuorder/allList?user_id=${row.id}`);
            return;
          case "gameOrder":
            window.open(`/index.html#/game/activity/order?user_id=${row.id}`);
            return;
          case "balance":
            window.open(
              `/index.html#/transaction/balanceLog?user_id=${row.id}`
            );
            return;
          case "winning":
            window.open(`/index.html#/game/activity/winning?user_id=${row.id}`);
            return;
          case "invite":
            window.open(`/index.html#/game/activity/invite?user_id=${row.id}`);
            return;
          case "coupon":
            window.open(`/index.html#/coupon/receive?user_id=${row.id}`);
            return;
        }
      },
      async userActive(row) {
        await doUserActive({ id: row.id, is_active: row.is_active ? 1 : 0 });
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      getGender(val) {
        switch (val) {
          case 1:
            return "男";
          case 2:
            return "女";
          default:
            return "未知";
        }
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      queryData() {
        this.queryForm.page_index = 1;
        this.fetchData();
      },
      filterTag(value, row) {
        return value === row.grade.id;
      },
      async fetchData() {
        this.listLoading = true;
        const [userData, gradeData] = await Promise.all([
          getList(this.queryForm),
          getGradeList({ page_size: 500 }),
        ]);
        this.gradeList = gradeData.data.rows.map((item) => ({
          text: item.name,
          value: item.id,
        }));
        const { count, rows } = userData;
        this.list = rows;
        this.total = count;
        const imageList = [];
        rows.forEach((item) => {
          item.is_active = !!item.is_active;
          imageList.push(item.wechat_user.avatar);
        });
        this.imageList = imageList;
        this.listLoading = false;
      },
    },
  };
</script>

<style lang="scss">
  .user-table-expand {
    font-size: 0;
  }
  .user-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .user-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .user-table-dropdown .el-dropdown-menu__item {
    line-height: 36px;
  }
</style>
