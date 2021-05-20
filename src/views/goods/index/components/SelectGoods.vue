<template>
  <div>
    <el-dialog
      :title="`选择${moduleName}`"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="720px"
      @close="close"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form :inline="true" :model="queryForm" @submit.native.prevent>
            <el-form-item v-if="!type">
              <el-select
                v-model="queryForm.type"
                placeholder="请选择类型"
                style="margin: 0 5px 10px 8px; width: 128px"
                @change="changeType"
              >
                <el-option label="全部" :value="undefined"></el-option>
                <el-option label="商品" :value="10"></el-option>
                <el-option label="菜品" :value="20"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-cascader
                v-model="categoryIds"
                :placeholder="`请选择${moduleName}分类`"
                :options="categoryList"
                :props="{ checkStrictly: true }"
                clearable
                @change="queryData"
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model.trim="queryForm.name"
                clearable
                :placeholder="`请输入${moduleName}名称`"
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
          :data="goodsList"
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
              <el-radio-group v-model="selectedGoods" class="select-radio-box">
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
          <el-table-column :label="`${moduleName}名称`">
            <template slot-scope="{ row }">
              {{ row.name }}
            </template>
          </el-table-column>

          <el-table-column
            :label="`${moduleName}分类`"
            prop="category.name"
            width="120"
          >
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
          <el-table-column
            v-if="!type"
            label="商品类型"
            prop="type"
            width="120"
          >
            <template slot-scope="{ row }">
              <el-tag :type="row.type === 20 ? 'primary' : 'success'">
                {{ row.type === 20 ? "菜品" : "商品" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="商品最低价格（不同规格）"
            prop="price"
            width="120"
          >
            <template slot-scope="{ row }">{{ row.skus[0].price }}元</template>
          </el-table-column>
          <!-- <el-table-column
            prop="created_at"
            label="发布时间"
            :formatter="formatTime"
          ></el-table-column> -->
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
  import { getList, getCategoryList } from "@/api/goods";

  export default {
    name: "SelectGoods",
    props: {
      multipleChoice: {
        type: Boolean,
        default: false,
      },
      ids: {
        type: Array,
        default: function () {
          return null;
        },
      },
      type: {
        type: Number,
        default: undefined,
      },
    },
    data() {
      return {
        multipleSelection: [],
        selectedGoods: null,
        dialogFormVisible: false,
        imageList: [],
        goodsList: [],
        moduleName: "商品",
        categoryIds: [],
        categoryList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
        queryForm: {
          page_index: 1,
          page_size: 20,
          // is_active: 1,
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
      changeType(val) {
        this.moduleName = val === 20 ? "菜品" : "商品";
        this.queryData();
      },
      cancel() {
        this.$emit("cancel");
      },
      async show(row) {
        const merchant = this.$store.getters["passport/merchant"];
        if (merchant.type === 10) {
          this.type = 10;
        }
        this.moduleName = this.type === 20 ? "菜品" : "商品";
        this.queryForm = this.$options.data().queryForm;
        this.queryForm.type = this.type;
        await this.fetchData();
        this.dialogFormVisible = true;
        this.categoryIds = [];
        this.selectedGoods = null;
      },
      close() {
        this.dialogFormVisible = false;
      },
      save() {
        if (!this.multipleChoice && this.selectedGoods) {
          this.$emit("select", this.selectedGoods);
        }
        if (this.multipleChoice && this.multipleSelection) {
          this.$emit("select", this.multipleSelection);
        }
        this.close();
      },
      async getCategorys() {
        const { data } = await getCategoryList({
          type: this.queryForm.type,
          page_size: 500,
        });
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
        const [goodsData, categoryData] = await Promise.all([
          getList(this.queryForm, this.ids),
          this.getCategorys(),
        ]);
        this.categoryList = categoryData;
        this.goodsList = goodsData.data.rows;
        this.total = goodsData.data.count;
        const imageList = [];
        this.goodsList.forEach((item) => {
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
