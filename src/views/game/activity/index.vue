<template>
  <div class="game-activity-container">
    <div v-if="showList" class="user-grade-container">
      <vab-query-form>
        <vab-query-form-left-panel :span="4">
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="selectGameHandle"
          >
            添加游戏活动
          </el-button>
        </vab-query-form-left-panel>
      </vab-query-form>
      <el-table
        v-loading="listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
      >
        <el-table-column label="缩略图">
          <template slot-scope="{ row }">
            <el-image
              v-if="row.admin_game.thumbnail"
              :preview-src-list="imageList"
              :src="row.admin_game.thumbnail.url"
            ></el-image>
            <el-tag v-else type="info">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="游戏名称">
          <template slot-scope="{ row }">
            {{ row.admin_game.merchant_game.name || row.admin_game.name }}
          </template>
        </el-table-column>
        <el-table-column label="游戏分类">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.admin_game.category.name"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag>{{ row.admin_game.category.name }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="挑战价格">
          <template slot-scope="{ row }">{{ row.play_price }}元</template>
        </el-table-column>
        <el-table-column label="免费试玩次数">
          <template slot-scope="{ row }">{{ row.free_num }}次</template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.admin_game.merchant_game.is_active ? '是' : '否'"
              :enterable="false"
              placement="top"
            >
              <el-switch
                v-model="row.admin_game.merchant_game.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="gameActive(row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template v-slot="scope">
            <el-button plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="showPreview(scope.row)">
              预览
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">
              删除
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
    </div>
    <preview
      v-show="isShowPreview"
      ref="preview"
      @cancel="cancelPreview"
    ></preview>
    <div class="goods-edit-container">
      <edit
        v-show="showEditDialog"
        ref="edit"
        @cancel="cancelEdit"
        @fetchData="fetchData"
      ></edit>
    </div>
    <select-game
      ref="selectGame"
      :check-activity="true"
      :is-winning="1"
      @cancel="cancelSelect"
      @showPreview="showSelectPreview"
      @select="selectedGame"
    ></select-game>
  </div>
</template>

<script>
  import {
    deleteActivity,
    getActivityList,
    doGameActive,
    getGameCategoryList,
  } from "@/api/game";
  import Edit from "./components/ActivityEdit";
  import SelectGame from "./components/SelectGame";
  import Preview from "../list/components/Preview";

  export default {
    name: "MerchantGameActivity",
    components: { Preview, Edit, SelectGame },
    data() {
      return {
        isShowPreview: false,
        showEditDialog: false,
        showList: true,
        list: null,
        imageList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      gameActive(row) {
        doGameActive({
          id: row.admin_game.id,
          is_active: row.admin_game.merchant_game.is_active ? 1 : 0,
        });
      },
      selectedGame(data) {
        this.handleCreate(data);
      },
      cancelSelect() {
        this.showList = true;
      },
      showSelectPreview() {
        this.showList = false;
      },
      selectGameHandle() {
        this.$refs["selectGame"].show();
      },
      handleCreate(game) {
        this.showList = false;
        this.showEditDialog = true;
        this.$refs["edit"].showCreate(game);
      },
      handleEdit(row) {
        this.showList = false;
        this.showEditDialog = true;
        this.$refs["edit"].showEdit(row);
      },
      showPreview() {
        this.showList = false;
        this.isShowPreview = true;
      },
      cancelPreview() {
        this.showList = true;
        this.isShowPreview = false;
      },
      cancelEdit() {
        this.showList = true;
        this.showEditDialog = false;
      },
      handleDelete(row) {
        this.$baseConfirm("你确定要删除当前项吗", null, async () => {
          await deleteActivity(row.id);
          this.$baseMessage("删除成功", "success");
          this.fetchData();
        });
      },
      handleSizeChange(val) {
        this.queryForm.page_size = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.page_index = val;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const categoryListResp = await getGameCategoryList({ page_size: 500 });
        const { data } = await getActivityList(this.queryForm);
        this.list = data.rows;
        this.total = data.count;
        this.listLoading = false;
        const imageList = [];
        this.list.forEach((item) => {
          const category = categoryListResp.data.rows.find(
            (val) => val.id === item.admin_game.category_id
          );
          item.admin_game.merchant_game.is_active = !!item.admin_game
            .merchant_game.is_active;
          item.admin_game.category = category;
          item.admin_game.thumbnail &&
            imageList.push(item.admin_game.thumbnail.url);
        });
        this.imageList = imageList;
      },
    },
  };
</script>
