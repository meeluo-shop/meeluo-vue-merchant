<template>
  <div class="store-staff-container">
    <vab-query-form>
      <vab-query-form-left-panel style="width: 50%">
        <el-button
          icon="el-icon-plus"
          :disabled="!user.is_native"
          type="primary"
          @click="handleEdit"
        >
          添加
        </el-button>
        <el-button
          icon="el-icon-delete"
          :disabled="!user.is_native"
          type="danger"
          @click="handleDelete"
        >
          批量删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel style="width: 50%">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.searchText"
              clearable
              placeholder="员工姓名、手机号、邮箱"
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
      @selection-change="setSelectRows"
    >
      <el-table-column
        :selectable="(row) => !row.is_native && user.is_native"
        type="selection"
      ></el-table-column>
      <el-table-column label="微信头像">
        <template slot-scope="{ row }">
          <el-image
            v-if="row.wechat_user"
            :src="row.wechat_user.avatar || avatar"
          ></el-image>
          <el-tag v-else type="info">无</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称">
        <template slot-scope="{ row }">
          <span v-if="row.wechat_user">{{ row.wechat_user.nickname }}</span>
          <el-tag v-else type="info">未绑定</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" prop="nickname"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="电子邮箱" prop="email"></el-table-column>
      <el-table-column
        label="员工工号"
        prop="staff_no"
        :formatter="(row, column, val) => val || '--'"
      ></el-table-column>
      <el-table-column label="系统管理员" show-overflow-toolti>
        <template slot-scope="{ row }">
          <el-tooltip
            :content="row.is_native ? '是' : '否'"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.is_native | statusFilter">
              {{ row.is_native ? "是" : "否" }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="是否启用">
        <template slot-scope="{ row }">
          <el-tooltip
            :content="row.is_active ? '启用' : '禁用'"
            :enterable="false"
            placement="top"
          >
            <el-switch
              v-model="row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="row.is_native || !user.is_native"
              @change="staffActive(row)"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template v-slot="scope">
          <el-button
            type="primary"
            :disabled="!user.is_native"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            :disabled="scope.row.is_native || !user.is_native"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
          <el-button
            :disabled="!user.is_native"
            :type="scope.row.openid ? 'warning' : 'success'"
            @click="bindWechatUser(scope.row)"
          >
            {{ scope.row.openid ? "切换微信用户" : "绑定微信用户" }}
          </el-button>
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
    <edit ref="edit" @fetchData="fetchData"></edit>
    <select-user ref="selectUser" @select="selectUser"></select-user>
  </div>
</template>

<script>
  import { doDelete, getList, setActive, setWechatUser } from "@/api/staff";
  import Edit from "./components/StaffEdit";
  import SelectUser from "../../user/index/components/SelectUser";

  export default {
    name: "StoreStaff",
    components: { Edit, SelectUser },
    filters: {
      statusFilter(status) {
        return !!status ? "success" : "info";
      },
    },
    data() {
      return {
        avatar: require("@/assets/default_avatar.svg"),
        user: this.$store.getters["passport/user"],
        list: [],
        listLoading: true,
        currentStaff: null,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          searchText: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      bindWechatUser(row) {
        this.currentStaff = row;
        this.$refs["selectUser"].show();
      },
      async selectUser(user) {
        await setWechatUser({
          id: this.currentStaff.id,
          openid: user.openid,
        });
        await this.fetchData();
      },
      staffActive(row) {
        setActive({
          id: row.id,
          is_active: row.is_active ? 1 : 0,
        });
      },
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs["edit"].showEdit(row);
        } else {
          this.$refs["edit"].showEdit();
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            await doDelete([row.id]);
            this.$baseMessage("删除成功", "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id);
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await doDelete(ids);
              this.$baseMessage("删除成功", "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
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
      async fetchData() {
        this.listLoading = true;
        const { count, rows } = await getList(this.queryForm);
        this.list = rows;
        this.total = count;
        this.listLoading = false;
      },
    },
  };
</script>
