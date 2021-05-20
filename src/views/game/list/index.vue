<template>
  <div class="store-staff-container">
    <div v-if="showList" class="game-list-container">
      <vab-query-form>
        <vab-query-form-right-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item>
              <el-select v-model="queryForm.is_active" placeholder="是否启用">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
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
              <el-select v-model="queryForm.is_winning" placeholder="游戏类型">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="赢奖游戏" :value="1"></el-option>
                <el-option label="免费游戏" :value="0"></el-option>
              </el-select>
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
        </vab-query-form-right-panel>
      </vab-query-form>

      <el-table
        v-loading="listLoading"
        :data="gameList"
        :element-loading-text="elementLoadingText"
      >
        <el-table-column
          label="游戏ID"
          prop="id"
          width="160px"
        ></el-table-column>
        <el-table-column label="缩略图">
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
            {{ row.merchant_game.name || row.name }}
          </template>
        </el-table-column>

        <el-table-column label="游戏分类" prop="category.name">
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
              <el-tag :type="row.is_winning | winningFilter">
                {{ row.is_winning ? "赢奖游戏" : "免费游戏" }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="挑战人数"
          prop="merchant_game.play_people_count"
        ></el-table-column>
        <el-table-column
          label="挑战次数"
          prop="merchant_game.play_count"
        ></el-table-column>
        <el-table-column
          label="收藏总数"
          prop="merchant_game.collection_count"
        ></el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="{ row }">
            <el-tooltip
              :content="row.merchant_game.is_active ? '是' : '否'"
              :enterable="false"
              placement="top"
            >
              <el-switch
                v-model="row.merchant_game.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="gameActive(row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template v-slot="scope">
            <el-button plain @click="showDetail(scope.row)">编辑</el-button>
            <el-button type="primary" @click="preview(scope.row)">
              预览
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
    <div class="goods-detail-container">
      <detail
        v-show="showEdit"
        ref="detail"
        @fetchData="fetchData"
        @cancel="cancel"
      ></detail>
      <preview v-show="showPreview" ref="preview" @cancel="cancel"></preview>
    </div>
  </div>
</template>

<script>
  import { getGameList, getGameCategoryList, doGameActive } from "@/api/game";
  import dayjs from "dayjs";
  import Detail from "./components/GameDetail";
  import Preview from "./components/Preview";

  export default {
    name: "GameList",
    components: { Preview, Detail },
    filters: {
      winningFilter(status) {
        return !!status ? "warning" : "info";
      },
    },
    data() {
      return {
        showPreview: false,
        showEdit: false,
        showList: true,
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
          is_active: undefined,
          name: undefined,
          category_id: undefined,
          is_winning: undefined,
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
    created() {
      this.fetchData();
    },
    methods: {
      preview(row) {
        const user = this.$store.getters["passport/user"];
        const merchant = this.$store.getters["passport/merchant"];
        this.$refs["preview"].show(
          row.id,
          `${row.game_url}#?gameId=${row.id}&merchantId=${merchant.id}&userId=${user.id}`
        );
        this.showList = false;
        this.showPreview = true;
      },
      showDetail(row) {
        this.$refs["detail"].show(row.id);
        this.showList = false;
        this.showEdit = true;
      },
      cancel() {
        this.showList = true;
        this.showPreview = false;
        this.showEdit = false;
      },
      gameActive(row) {
        doGameActive({
          id: row.id,
          is_active: row.merchant_game.is_active ? 1 : 0,
        });
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
          getGameList(this.queryForm),
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
