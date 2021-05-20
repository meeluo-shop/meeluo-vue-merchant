<template>
  <div>
    <el-dialog
      title="选择微信用户"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="720px"
      @close="close"
    >
      <vab-query-form>
        <vab-query-form-right-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item>
              <el-select
                v-model="queryForm.grade_id"
                style="width: 180px"
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
                style="width: 180px"
                clearable
                placeholder="请输入微信昵称"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model.trim="queryForm.phone"
                style="width: 180px"
                clearable
                placeholder="请输入手机号码"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryData"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-right-panel>
      </vab-query-form>

      <div style="max-height: 400px; overflow: scroll">
        <el-table
          v-loading="listLoading"
          :data="userList"
          :element-loading-text="elementLoadingText"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="multipleChoice"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column v-if="!multipleChoice" label="" width="28">
            <template slot-scope="{ row }">
              <el-radio-group v-model="selectedUser" class="select-radio-box">
                <el-radio :label="row"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="微信头像" width="80">
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
          <el-table-column label="性别" prop="wechat_user.gender" width="70">
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
          <el-table-column label="手机号" prop="phone" width="120">
            <template slot-scope="{ row }">
              <span v-if="row.phone">{{ row.phone }}</span>
              <el-tag v-else type="info" effect="plain">未绑定</el-tag>
            </template>
          </el-table-column>
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
          <!-- <el-table-column
            prop="wechat_user.created_at"
            label="注册时间"
            :formatter="formatTime"
          ></el-table-column> -->
          <el-table-column prop="balance" label="用户余额">
            <template slot-scope="{ row }">
              <span style="color: red">¥ {{ row.balance }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :current-page="queryForm.page_index"
        :page-size="queryForm.page_size"
        :total="total"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import { getList } from "@/api/user";
  import { getList as getGradeList } from "@/api/grade";

  export default {
    name: "SelectUser",
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
    props: {
      multipleChoice: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        multipleSelection: [],
        selectedUser: null,
        dialogFormVisible: false,
        imageList: [],
        userList: [],
        gradeList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          wechat_name: undefined,
          phone: undefined,
          grade_id: undefined,
        },
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      async show() {
        this.queryForm = this.$options.data().queryForm;
        this.dialogFormVisible = true;
        this.selectedUser = null;
        await this.fetchData();
      },
      close() {
        this.dialogFormVisible = false;
      },
      async save() {
        if (!this.multipleChoice && this.selectedUser) {
          this.$emit("select", this.selectedUser);
        }
        if (this.multipleChoice && this.multipleSelection) {
          this.$emit("select", this.multipleSelection);
        }
        this.close();
      },
      formatTime(row, column, cellValue) {
        return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss");
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
        this.userList = userData.rows;
        this.total = userData.count;
        const imageList = [];
        this.userList.forEach((item) => {
          item.wechat_user &&
            imageList.push(item.wechat_user.avatar || this.avatar);
        });
        this.imageList = imageList;
        this.listLoading = false;
      },
    },
  };
</script>

<style>
  .select-radio-box .el-radio__label {
    display: none;
  }
</style>
