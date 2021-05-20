<template>
  <div>
    <el-dialog
      v-if="!showPreview"
      title="选择游戏"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="720px"
      @close="close"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item>
              <el-cascader
                v-model="categoryIds"
                placeholder="请选择游戏分类"
                :options="categoryList"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model.trim="queryForm.name"
                clearable
                placeholder="请输入游戏名称"
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
        </vab-query-form-left-panel>
      </vab-query-form>
      <div style="max-height: 400px; overflow: scroll">
        <el-table
          v-loading="listLoading"
          :data="gameList"
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
              <el-radio-group v-model="selectedGame" class="select-radio-box">
                <el-radio :label="row"></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="缩略图" width="80">
            <template slot-scope="{ row }">
              <el-image
                v-if="row.thumbnail"
                :preview-src-list="imageList"
                :src="row.thumbnail.url"
              ></el-image>
              <el-tag v-else type="info">无</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="游戏名称">
            <template slot-scope="{ row }">
              <div style="display: flex; align-items: center">
                <span style="padding-right: 4px">
                  {{ row.merchant_game.name || row.name }}
                </span>
                <img
                  v-if="row.activity_game"
                  style="width: 14px; height: 14px"
                  src="@/assets/game/gift-icon.svg"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="游戏分类" prop="category.name" width="120">
            <template slot-scope="{ row }">
              <el-tooltip
                :content="row.category.name"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag>{{ row.category.name }}</el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="游戏类型">
            <template slot-scope="{ row }">
              <el-tooltip
                :content="row.is_winning ? '赢奖游戏' : '免费游戏'"
                class="item"
                effect="dark"
                placement="top-start"
              >
                <el-tag :type="row.is_winning ? 'warning' : 'info'">
                  {{ row.is_winning ? "赢奖游戏" : "免费游戏" }}
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="发布时间"
            :formatter="formatTime"
          ></el-table-column>

          <el-table-column label="操作" width="90">
            <template v-slot="scope">
              <el-button type="primary" @click="preview(scope.row)">
                预览
              </el-button>
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
    <preview v-show="showPreview" ref="preview" @cancel="cancel"></preview>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import { getGameCategoryList, getGameList, checkActivity } from "@/api/game";
  import Preview from "../../list/components/Preview";

  export default {
    name: "SelectGame",
    components: { Preview },
    props: {
      checkActivity: {
        type: Boolean,
        default: false,
      },
      multipleChoice: {
        type: Boolean,
        default: false,
      },
      isWinning: {
        type: Number,
        default: undefined,
      },
    },
    data() {
      return {
        multipleSelection: [],
        selectedGame: null,
        showPreview: false,
        dialogFormVisible: false,
        imageList: [],
        gameList: [],
        categoryIds: [],
        categoryList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          is_active: 1,
          name: undefined,
          category_id: undefined,
        },
      };
    },
    watch: {
      categoryIds(ids) {
        if (ids && ids.length) {
          this.queryForm.category_id = ids[ids.length - 1];
        }
      },
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      preview(row) {
        const user = this.$store.getters["passport/user"];
        const merchant = this.$store.getters["passport/merchant"];
        this.$refs["preview"].show(
          row.id,
          `${row.game_url}#?gameId=${row.id}&merchantId=${merchant.id}&userId=${user.id}`
        );
        this.showPreview = true;
        this.$emit("showPreview");
      },
      cancel() {
        this.showPreview = false;
        this.$emit("cancel");
      },
      async show(row) {
        this.queryForm = this.$options.data().queryForm;
        await this.fetchData();
        this.dialogFormVisible = true;
        this.categoryIds = [];
        this.selectedGame = null;
      },
      close() {
        this.dialogFormVisible = false;
      },
      async save() {
        if (!this.multipleChoice && this.selectedGame) {
          if (this.checkActivity) {
            await checkActivity(this.selectedGame.id);
          }
          this.$emit("select", this.selectedGame);
        }
        if (this.multipleChoice && this.multipleSelection) {
          this.$emit("select", this.multipleSelection);
        }
        this.close();
      },
      async getCategoryList() {
        const { data } = await getGameCategoryList({ page_size: 500 });
        const list = data.rows.map((item) => ({
          label: item.name,
          value: item.id,
          id: item.id,
          superior_id: item.superior_id,
        }));
        return this.conversion(list);
      },
      conversion(data) {
        const root = [];
        for (const item of data) {
          if (!item.superior_id) {
            root.push(item);
          }
          for (const item2 of data) {
            if (item2.superior_id === item.id) {
              if (!item.children) {
                item.children = [];
              }
              item.children.push(item2);
            }
          }
        }
        return root;
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
        const [gameData, categoryData] = await Promise.all([
          getGameList({
            ...this.queryForm,
            is_winning: this.isWinning,
          }),
          this.getCategoryList(),
        ]);
        this.categoryList = categoryData;
        this.gameList = gameData.data.rows;
        this.total = gameData.data.count;
        const imageList = [];
        this.gameList.forEach((item) => {
          item.thumbnail && imageList.push(item.thumbnail.url);
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
